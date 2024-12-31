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
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";

import {
  db,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "@/lib/firebase/auth";

export default function Page({ params }) {
  const videoRef = useRef();
  const { toast } = useToast();
  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  let stopTime = null;
  let dur = null;
  const room = params.courseId;
  const liveId = room.split("L")[1];
  const { userId, userName } = AuthContext();

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
      await addDoc(collection(db, "chatMessages", room, "messages"), {
        message: input,
        timestamp: new Date(),
        userId: userId,
        username: userName,
      });
      setInput("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const initConnection = async () => {
    if (!room) {
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: "Sorry! Class is missing in the URL",
      })
      return;
    }
    try {
      const newPeer = createPeerConnection();
      setPeer(newPeer);
      await setupPeerConnection(newPeer, room);
      setStartTime(new Date().getTime());
      try {
        const response = await fetch("/api/Livestreams/createStudentLive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: userId,
            courseId: room,
            liveId: liveId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit duration");
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error("Error submitting duration:", error);
      }
    } catch (error) {
      console.error("Initialization error:", error);
      toast({
        variant: "failure",
        title: "SkyLearn",
        description: `Failed to connect to the broadcast: ${error.message}`,
      })
    }
  };

  const disconnectFromBroadcast = async () => {
    stopTime = new Date().getTime();
    dur = (stopTime - startTime) / 1000;
    setDuration(dur);
    try {
      const response = await fetch("/api/Livestreams/updateStudentLive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liveId: liveId,
          duration: dur,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit duration");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error submitting duration:", error);
    }
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (peer) {
      peer.close();
      setPeer(null);
    }
    toast({
      variant: "failure",
      title: "SkyLearn",
      description: "Disconnected from broadcast!",
    })
  };

  // Create a new WebRTC PeerConnection
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
        console.log("ICE Candidate:", event.candidate);
      }
    };

    newPeer.ontrack = (event) => {
      if (event.streams && event.streams.length > 0) {
        videoRef.current.srcObject = event.streams[0];
        videoRef.current
          .play()
          .catch((err) => console.error("Error playing video:", err));
      }
    };

    newPeer.onconnectionstatechange = () => {
      console.log("Connection State:", newPeer.connectionState);
      if (["disconnected", "failed"].includes(newPeer.connectionState)) {
        disconnectFromBroadcast();
      }
    };

    return newPeer;
  };

  // Set up WebRTC peer connection
  const setupPeerConnection = async (peer, roomName) => {
    try {
      const offer = await peer.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peer.setLocalDescription(offer);

      const response = await fetch("http://35.208.76.68/consumer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdp: peer.localDescription,
          room: roomName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from signaling server:", data);
        const remoteDescription = new RTCSessionDescription(data.sdp);
        await peer.setRemoteDescription(remoteDescription);
        console.log("Remote description set successfully.");
      } else {
        console.error("Failed to fetch from Next.js API route");
        toast({
          variant: "failure",
          title: "SkyLearn",
          description: "Sorry! No class found",
        })
      }
    } catch (error) {
      console.error("Setup error:", error);
      throw error;
    }
  };

  return (
    <div className="grid">
      <Navbar />
      <div className="flex flex-col justify-center p-2">
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
                      href={`/courses/${room}`}
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
              playsInline
              controls
              ref={videoRef}
              autoPlay
              className="w-full p-3"
            />
            <div className="flex-col pb-2 ml-2">
              <Button id="video" className="px-7 mx-2" onClick={initConnection}>
                Join Class
              </Button>
              <Button
                id="video"
                className="bg-red-500 hover:bg-red-400"
                onClick={disconnectFromBroadcast}
              >
                Leave Class
              </Button>
            </div>
          </div>
          <div className="grid">
            {/* Your other components */}
            <div className="flex flex-col justify-center p-2">
              {/* Middle Card */}
              <div className="grid stream-grid p-2 ">
                <div className="max-h-[520px] h-[520px]">
                  <Card className="w-[350px] h-full flex flex-col rounded-sm">
                    <CardHeader>
                      <CardTitle className="text-primary">Live Chat</CardTitle>
                      <CardDescription>
                        Engage with your peers in real-time.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto max-h-[400px]">
                      {messages.length === 0 ? (
                        <div className="text-center text-gray-500">
                          No messages yet. Be the first to chat!
                        </div>
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
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <div className="grid w-full gap-2">
                        <Textarea
                          placeholder="Type your message here."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                        <Button onClick={handleSendMessage}>
                          Send message
                        </Button>
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
          <div className="w-full p-5 bg-gray-100 h-[80px] rounded-md">
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
