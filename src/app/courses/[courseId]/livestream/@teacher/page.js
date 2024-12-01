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

export default function Page({ params }) {
    const videoRef = useRef(null);
    const [peer, setPeer] = useState(null);
    const [activeTab, setActiveTab] = useState('module1');
    const [messages, setMessages] = useState([]);
    const [streamType, setStreamType] = useState('camera');
    const [localStream, setLocalStream] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
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
                console.log('ICE Candidate:', event.candidate);
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
                    audio: false
                });
            }

            return stream;
        } catch (error) {
            console.error('Error getting media stream:', error);
            alert('Failed to access media stream');
            return null;
        }
    };

    // Start Streaming
    const startStreaming = async () => {
        try {
            // Create peer connection
            const newPeer = createPeerConnection();
            setPeer(newPeer);

            // Get initial stream (camera by default)
            const stream = await getMediaStream('camera');
            if (!stream) return;

            setLocalStream(stream);

            // Add tracks to peer connection
            stream.getTracks().forEach(track => {
                newPeer.addTrack(track, stream);
            });

            // Create and send offer
            const offer = await newPeer.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            });
            await newPeer.setLocalDescription(offer);

            // Send offer to signaling server
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

                // Update UI state
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
            // Stop the current stream
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }
    
            // Determine the new stream type and fetch the corresponding stream
            const newStreamType = streamType === "camera" ? "screen" : "camera";
            const newStream = await getMediaStream(newStreamType);
            if (!newStream) return;
    
            // Replace the video track in the peer connection
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
    
            // Update the local video element to reflect the new stream
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
        try {
            // Stop local stream tracks
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
                setLocalStream(null);
            }

            // Close peer connection
            if (peer) {
                peer.close();
                setPeer(null);
            }

            // Notify server
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

    // Message handling
    const handleSendMessage = () => {
        if (input.trim() !== "") {
            setMessages((prev) => [...prev, input]);
            setInput("");
        } else {
            alert("Message cannot be empty!");
        }
    };

    return (

        <div className="grid main-live-grid">
            {/* Left Panel */}
            <div>
                <button
                    data-drawer-target="default-sidebar"
                    data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>
                <div className="h-full nav-live-grid grid">
                    {/* Sidebar with vertical Tabs */}
                    <aside className="bg-gray-100 p-4 flex justify-between flex-col">
                        {/* Vertical Tab List */}
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={() => setActiveTab("module1")}
                                className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === "module1"
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-200 text-gray-700"
                                    }`}
                            >
                                1
                            </button>
                            <button
                                onClick={() => setActiveTab("module2")}
                                className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === "module2"
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-200 text-gray-700"
                                    }`}
                            >
                                2
                            </button>
                            <button
                                onClick={() => setActiveTab("module3")}
                                className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === "module3"
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-200 text-gray-700"
                                    }`}
                            >
                                3
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="square"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </div>
                    </aside>

                    {/* Module Contents */}
                    <div className="flex-grow p-6">
                        {activeTab === "module1" && (
                            <div>
                                <h3 className="text-lg text-center font-semibold mb-4">
                                    Module 1
                                </h3>
                                <hr className="mb-2"></hr>
                                <ul className="space-y-2 font-medium">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group"
                                        >
                                            <svg
                                                className="w-6 h-6 text-gray-800"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <span className="ms-3">Notes 1</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "module2" && (
                            <div>
                                <h3 className="text-lg text-center font-semibold mb-4">
                                    Module 2
                                </h3>
                                <hr></hr>
                                <ul className="space-y-2 font-medium">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <svg
                                                className="w-6 h-6 text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <span className="ms-3">Notes 1</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <svg
                                                className="w-6 h-6 text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <span className="ms-3">Notes 2</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "module3" && (
                            <div>
                                <h3 className="text-lg text-center font-semibold mb-4">
                                    Module 3
                                </h3>
                                <hr></hr>
                                <ul className="space-y-2 font-medium">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <svg
                                                className="w-6 h-6 text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <span className="ms-3">Notes 1</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Right Panel */}
            <div className="flex flex-col justify-center p-2">
                {/* Breadcrumb */}
                <nav
                    className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
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
                {/* Middle Card */}
                <div className="grid stream-grid p-2">
                    <video
                        className='w-full p-3'
                        playsInline
                        controls
                        ref={videoRef}
                        autoPlay
                    />
                    <div className="mt-4">
                        <Card className="w-[350px] h-[360px] flex flex-col">
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
                                            className="p-2 mb-2 bg-gray-100 rounded-md text-sm"
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
                <div className="flex-col pb-2 ml-2">
                    <Button
                        className="z-10 px-7 mx-2"
                        onClick={startStreaming}
                        disabled={isStreaming}
                    >
                        Start Class
                    </Button>
                    <Button
                        className="z-10 px-7 mx-2 bg-red-500 hover:bg-red-400"
                        onClick={stopStreaming}
                        disabled={!isStreaming}
                    >
                        Stop Class
                    </Button>
                    <Button
                        className="z-10 px-7 mx-2"
                        onClick={switchStream}
                        disabled={!isStreaming}
                    >
                        Switch to {streamType === 'camera' ? 'Screen' : 'Camera'}
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
