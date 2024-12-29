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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import {
  db,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "@/lib/firebase/auth";

export default function Page({ params }) {
  const videoRef = useRef(null);
  const { toast } = useToast();
  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [streamType, setStreamType] = useState("camera");
  const [localStream, setLocalStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const { userId, userName } = AuthContext();
  let startTime = null;
  let stopTime = null;
  let duration = null;
  const [start, setStart] = useState(startTime);
  const [input, setInput] = useState("");
  const room = params.courseId;
  const streamId = room.split("L")[1];
  const courseNo = room.split("L")[0];

  // Fetch chat messages in real-time
  useEffect(() => {
    const messagesRef = collection(db, "chatMessages", room, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesList = [];
      querySnapshot.forEach((doc) => {
        messagesList.push(doc.data());
      });
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSendMessage = async () => {
    if (input.trim() === "") {
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Message cannot be empty!",
      })
      return;
    }

    try {
      // Send message to Firebase
      await addDoc(collection(db, "chatMessages", room, "messages"), {
        message: input,
        timestamp: new Date(),
        userId: userId, // Replace with actual user ID
        username: userName, // Replace with actual username
      });
      setInput(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
  // Create WebRTC Peer Connection
  const createPeerConnection = () => {
    const newPeer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.stunprotocol.org" },
        {
          urls: "turn:35.208.76.68:3478",
          username: "test",
          credential: "test123",
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
          videoRef.current
            .play()
            .catch((err) => console.error("Error playing video:", err));
        }
      }
    };

    return newPeer;
  };

  // Get Media Stream
  const getMediaStream = async (type) => {
    try {
      let stream;

      if (type === "camera") {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });
      } else {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: { displaySurface: "monitor" },
          audio: true,
        });
      }

      return stream;
    } catch (error) {
      console.error("Error getting media stream:", error);
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Check your Camera and Microphone Permissions",
      })
      return null;
    }
  };

  const startStreaming = async () => {
    startTime = new Date().getTime();
    setStart(startTime);

    try {
      const newPeer = createPeerConnection();
      setPeer(newPeer);

      const stream = await getMediaStream("camera");
      if (!stream) return;

      setLocalStream(stream);

      stream.getTracks().forEach((track) => {
        newPeer.addTrack(track, stream);
      });

      const offer = await newPeer.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await newPeer.setLocalDescription(offer);

      const response = await fetch("http://35.208.76.68:5000/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: room,
          sdp: newPeer.localDescription,
          streamType: "camera",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const remoteDescription = new RTCSessionDescription(data.sdp);
        await newPeer.setRemoteDescription(remoteDescription);
        setIsStreaming(true);
        const sendLive = await fetch("/api/Livestreams/updateLiveStart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ livestreamId: streamId }),
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        throw new Error("Failed to start streaming");
      }
    } catch (error) {
      console.error("Streaming error:", error);
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: `Failed to start streaming, ${error}`,
      })
    }
  };

  // Switch Stream
  const switchStream = async () => {
    if (!peer) {
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Start streaming first",
      })
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
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Failed to switch stream",
      })
    }
  };

  // Stop Streaming
  const stopStreaming = async () => {
    stopTime = new Date().getTime();
    duration = (stopTime - start) / 1000;
    try {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        setLocalStream(null);
      }
      if (peer) {
        peer.close();
        setPeer(null);
      }
      const sendTime = await fetch("/api/Livestreams/setDurationTutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          streamId: streamId,
          duration: duration,
          status: "ended",
        }),
      });
      const response = await fetch("http://35.208.76.68:5000/stop-broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room: room }),
      });

      if (response.ok & sendTime.ok) {
        setIsStreaming(false);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    } catch (error) {
      console.error("Stop streaming error:", error);
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
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
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
                  </Link>
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
                    <Link
                      href={`/courses/${courseNo}`}
                      className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2"
                    >
                      Courses
                    </Link>
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
              className="w-full p-3"
              playsInline
              controls
              ref={videoRef}
              autoPlay
            />
         
         <div className="flex pb-2 ml-5 gap-2">
          <Button className="" onClick={startStreaming} disabled={isStreaming}>
            Start Class
          </Button>
          <Button
            className=" bg-red-500 hover:bg-red-400"
            onClick={stopStreaming}
            disabled={!isStreaming}
          >
            Stop Class
          </Button>
          <Button className="" onClick={switchStream} disabled={!isStreaming}>
            Switch to {streamType === "camera" ? "Screen" : "Camera"}
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-950"
            onClick={() => window.open("https://excalidraw.com/", "_blank")}
          >
            Open Whiteboard
          </Button>
        </div> 
        </div>

        <div className="grid">
      {/* Your other components */}
      <div className="flex flex-col justify-center p-2">
        {/* Middle Card */}
        <div className="grid stream-grid p-2">
        <div className="max-h-[520px] h-[520px]">
            <Card className="w-[350px] h-full flex flex-col rounded-sm">
              <CardHeader>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Engage with your viewers in real-time.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto max-h-[400px]">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500">No messages yet. Be the first to chat!</div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-3 mb-3 max-w-xs rounded-lg text-sm bg-gray-300 text-black`}
                    >
                      <Avatar className="w-8 h-8 cursor-pointer">
                        <AvatarImage
                          className="rounded-full"
                          src={`https://ui-avatars.com/api/?name=${msg.username}&background=1e90ff&color=FFFFFF`}
                          alt={msg.username}
                        />
                        <AvatarFallback className="bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="font-semibold">{msg.username}</div>
                        <div>{msg.message}</div>
                      </div>
                    </div>
                  ))
                )}
                {/* Empty div to act as scroll target */}
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
      </div>
      {/* Your other components */}
    </div>
        </div>
        
        {/* Bottom Cards */}
        {/* <div>
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
                </div> */}
      </div>
    </div>
  );
}
