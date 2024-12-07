"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/providers/AuthProvider";

export default function Page({ params }) {
    const videoRef = useRef(null);
    const [peer, setPeer] = useState(null);
    const [messages, setMessages] = useState([]);
    const [streamType, setStreamType] = useState('camera');
    const [localStream, setLocalStream] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const { userId } = AuthContext();
    let startTime = null;
    let stopTime = null;
    let duration = null;
    const [start, setStart] = useState(startTime)
    const [input, setInput] = useState('');
    const room = params.courseId;

    // Create WebRTC Peer Connection
    const createPeerConnection = () => {
        const newPeer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.stunprotocol.org' },
                {
                    urls: 'turn:35.208.76.68:3478',
                    username: 'test',
                    credential: 'test123',
                },
            ],
        });

        newPeer.onicecandidate = (event) => {
            if (event.candidate) {
                // console.log('ICE Candidate:', event.candidate);
                // Send ICE candidate to signaling server if needed
            }
        };

        newPeer.ontrack = (event) => {
            if (event.streams && event.streams.length > 0) {
                const stream = event.streams[0];
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play().catch((err) => console.error('Error playing video:', err));
                }
            }
        };

        return newPeer;
    };

    // Get Media Stream
    const getMediaStream = async (type) => {
        try {
            let stream;

            if (type === 'camera') {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1280, height: 720 },
                    audio: true
                });
            } else {
                stream = await navigator.mediaDevices.getDisplayMedia({
                    video: { displaySurface: 'monitor' },
                    audio: true
                });
            }

            return stream;
        } catch (error) {
            console.error('Error getting media stream:', error);
            alert('Failed to access media stream');
            return null;
        }
    };

    const startStreaming = async () => {
        startTime = new Date().getTime();
        setStart(startTime)
        try {
            const newPeer = createPeerConnection();
            setPeer(newPeer);

            const stream = await getMediaStream('camera');
            if (!stream) return;

            setLocalStream(stream);

            stream.getTracks().forEach(track => {
                newPeer.addTrack(track, stream);
            });

            const offer = await newPeer.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            });
            await newPeer.setLocalDescription(offer);

            const response = await fetch('http://35.208.76.68:5000/broadcast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room: room,
                    sdp: newPeer.localDescription,
                    streamType: 'camera'
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const remoteDescription = new RTCSessionDescription(data.sdp);
                await newPeer.setRemoteDescription(remoteDescription);

                setIsStreaming(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } else {
                throw new Error('Failed to start streaming');
            }
        } catch (error) {
            console.error('Streaming error:', error);
            alert('Failed to start streaming');
        }
    };

    // Switch Stream
    const switchStream = async () => {
        if (!peer) {
            alert("Start streaming first");
            return;
        }

        try {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }

            const newStreamType = streamType === "camera" ? "screen" : "camera";
            const newStream = await getMediaStream(newStreamType);
            if (!newStream) return;

            const videoTrack = newStream.getVideoTracks()[0];
            const sender = peer.getSenders().find((s) => s.track?.kind === "video");

            if (sender && videoTrack) {
                await sender.replaceTrack(videoTrack);
            } else {
                console.error("No video sender found or new video track is missing");
                return;
            }
            setLocalStream(newStream);
            setStreamType(newStreamType);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
        } catch (error) {
            console.error("Stream switching error:", error);
            alert("Failed to switch stream");
        }
    };

    // Stop Streaming
    const stopStreaming = async () => {
        stopTime = new Date().getTime();
        duration = (stopTime - start) / 1000
        try {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
                setLocalStream(null);
            }
            if (peer) {
                peer.close();
                setPeer(null);
            }
            const sendTime = await fetch('/api/setDuration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ duration: duration, status: 'ended', course_id: room, tutor_id: userId }),
            })
            const response = await fetch('http://35.208.76.68:5000/stop-broadcast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ room: room }),
            });

            if (response.ok) {
                setIsStreaming(false);
                if (videoRef.current) {
                    videoRef.current.srcObject = null;
                }
            }
        } catch (error) {
            console.error('Stop streaming error:', error);
        }
    };

    const handleSendMessage = () => {
        if (input.trim() !== "") {
            setMessages((prev) => [...prev, input]);
            setInput("");
        } else {
            alert("Message cannot be empty!");
        }
    };

    return (
        <div className="grid">
            <Navbar />
            <div className="flex flex-col justify-center p-2">
                {/* Middle Card */}
                <div className="grid stream-grid p-2">
                    <div>
                        <nav
                            className="flex px-5 mx-3 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
                            aria-label="Breadcrumb"
                        >
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a
                                        href="#"
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        <svg
                                            className="w-3 h-3 me-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <a
                                            href="#"
                                            className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2"
                                        >
                                            Courses
                                        </a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                                            {params.courseId}
                                        </span>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                                            livestream
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <video
                            className='w-full p-3'
                            playsInline
                            controls
                            ref={videoRef}
                            autoPlay
                        />
                    </div>

                    <div>
                        <Card className="w-[350px] h-full flex flex-col rounded-sm">
                            <CardHeader>
                                <CardTitle>Live Chat</CardTitle>
                                <CardDescription>
                                    Engage with your viewers in real-time.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto">
                                {messages.length === 0 ? (
                                    <div className="text-center text-gray-500">
                                        No messages yet. Be the first to chat!
                                    </div>
                                ) : (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className="p-2 mb-2 bg-gray-100 rounded text-sm"
                                        >
                                            {msg}
                                        </div>
                                    ))
                                )}
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <div className="grid w-full gap-2">
                                    <Textarea
                                        placeholder="Type your message here."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <Button onClick={handleSendMessage}>Send message</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div className="flex pb-2 ml-5 gap-2">
                    <Button
                        className=""
                        onClick={startStreaming}
                        disabled={isStreaming}
                    >
                        Start Class
                    </Button>
                    <Button
                        className=" bg-red-500 hover:bg-red-400"
                        onClick={stopStreaming}
                        disabled={!isStreaming}
                    >
                        Stop Class
                    </Button>
                    <Button
                        className=""
                        onClick={switchStream}
                        disabled={!isStreaming}
                    >
                        Switch to {streamType === 'camera' ? 'Screen' : 'Camera'}
                    </Button>
                    <Button
                        className="bg-purple-600 hover:bg-purple-950"
                        onClick={() => window.open("https://excalidraw.com/", "_blank")}
                    >
                        Open Whiteboard
                    </Button>

                </div>
                {/* Bottom Cards */}
                <div>
                    <div className="w-full p-5 bg-gray-100 h-[80px]">
                        <h1 className="text-xl text-left">
                            Fundamentals of Computer Science
                        </h1>
                    </div>
                    <Tabs
                        defaultValue="agenda"
                        className="w-full p-2 bg-gray-100 h-[200px]"
                    >
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="announcement">
                                Announcement{" "}
                                <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                                    1
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="agenda">Agenda</TabsTrigger>
                            <TabsTrigger value="notes">Notes</TabsTrigger>
                            <TabsTrigger value="doubt">Raise a Doubt</TabsTrigger>
                        </TabsList>
                        <TabsContent value="announcement" className="p-2">
                            No Announcements from tutor yet!
                        </TabsContent>
                        <TabsContent value="agenda" className="p-2">
                            Live stream agenda will be displayed here.
                        </TabsContent>
                        <TabsContent value="notes" className="p-2">
                            Take down notes
                        </TabsContent>
                        <TabsContent value="doubt" className="p-2">
                            Ask a question from tutor
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
