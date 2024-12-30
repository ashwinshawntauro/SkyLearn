const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webrtc = require('wrtc');

const app = express();
let rooms = {};

// Configure CORS
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utility to log available rooms
function logAvailableRooms() {
    console.log('Available Rooms:', JSON.stringify(Object.keys(rooms).map(room => ({
        name: room,
        hasBroadcaster: !!rooms[room].broadcaster,
        consumerCount: rooms[room].consumers.length
    })), null, 2));
}

// Endpoint for consumers to join a room
app.post('/consumer', async (req, res) => {
    const { room, sdp } = req.body;

    if (!rooms[room] || !rooms[room].broadcaster) {
        return res.status(400).json({ error: 'Room not found or no broadcaster in this room' });
    }

    const peer = new webrtc.RTCPeerConnection({
        iceServers: [
            { urls: "stun:stun.stunprotocol.org" },
            { urls: "turn:35.208.76.68:3478", username: "test", credential: "test123" }
        ]
    });

    try {
        // Add broadcaster's tracks to the consumer peer
        const broadcasterPeer = rooms[room].broadcaster;

        if (broadcasterPeer.streams && broadcasterPeer.streams[0]) {
            const broadcasterStream = broadcasterPeer.streams[0];
            broadcasterStream.getTracks().forEach(track => {
                peer.addTrack(track, broadcasterStream);
            });
        } else {
            return res.status(500).json({ error: 'Broadcaster has no active stream' });
        }

        // Set remote description and create answer
        await peer.setRemoteDescription(new webrtc.RTCSessionDescription(sdp));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        res.json({ sdp: peer.localDescription });

        // Add the consumer to the room
        rooms[room].consumers.push(peer);
        logAvailableRooms();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for broadcasters to start streaming
app.post('/broadcast', async (req, res) => {
    const { room, sdp } = req.body;

    if (!rooms[room]) {
        rooms[room] = { broadcaster: null, consumers: [] };
    }

    const peer = new webrtc.RTCPeerConnection({
        iceServers: [
            { urls: "stun:stunprotocol.org" },
            { urls: "turn:35.208.76.68:3478", username: "test", credential: "test123" }
        ]
    });

    try {
        peer.ontrack = (e) => {
            peer.streams = peer.streams || [];
            peer.streams[0] = e.streams[0];

            // Notify consumers about the updated stream
            rooms[room].consumers.forEach(consumer => {
                consumer.getSenders().forEach(sender => {
                    if (sender.track) sender.replaceTrack(e.track);
                });
            });
        };

        await peer.setRemoteDescription(new webrtc.RTCSessionDescription(sdp));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        rooms[room].broadcaster = peer;
        res.json({ sdp: peer.localDescription });
        logAvailableRooms();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for broadcasters to switch stream
app.post('/switch-stream', async (req, res) => {
    const { room, sdp } = req.body;

    if (!rooms[room] || !rooms[room].broadcaster) {
        return res.status(404).json({ error: 'Room not found or no broadcaster in this room' });
    }

    const peer = rooms[room].broadcaster;

    try {
        // Update broadcaster's remote description with the new SDP
        await peer.setRemoteDescription(new webrtc.RTCSessionDescription(sdp));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        res.json({ sdp: peer.localDescription });
        logAvailableRooms();
    } catch (error) {
        res.status(500).json({ error: 'Failed to switch stream' });
    }
});

// Endpoint to stop a broadcast
app.post('/stop-broadcast', async (req, res) => {
    const { room } = req.body;

    if (!rooms[room]) {
        return res.status(404).json({ error: 'Room not found' });
    }

    try {
        if (rooms[room].broadcaster) {
            rooms[room].broadcaster.close();
        }

        rooms[room].consumers.forEach(consumer => consumer.close());
        delete rooms[room];
        res.json({ message: 'Broadcast stopped successfully' });
        logAvailableRooms();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Server setup
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://35.208.76.68:${PORT}`);
});

