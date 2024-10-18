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
// import Janus from 'janus-gateway'; 
// import adapter from "webrtc-adapter"

export default function Page() {
  const myVideoRef = useRef();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const [janus, setJanus] = useState(null);
  // const [videoroom, setVideoroom] = useState(null);
  // const [streaming, setStreaming] = useState(false);

  // useEffect(() => {
  //   Janus.init({ debug: "all", callback: () => {
  //     const janusInstance = new Janus({
  //       server: "http://<your_instance_ip>:8088/janus",
  //       success: () => {
  //         // Attach to the video room plugin
  //         janusInstance.attach({
  //           plugin: "janus.plugin.videoroom",
  //           success: (pluginHandle) => {
  //             setVideoroom(pluginHandle);
  //             joinRoom();
  //           },
  //           onmessage: (msg, jsep) => {
  //             console.log("Message from Janus:", msg);
  //             if (jsep) {
  //               videoroom.handleRemoteJsep({ jsep: jsep });
  //             }
  //           },
  //           onicecandidate: (candidate) => {
  //             console.log("ICE Candidate:", candidate);
  //           },
  //           onlocalstream: (stream) => {
  //             if (myVideoRef.current) {
  //               myVideoRef.current.srcObject = stream;
  //             }
  //           },
  //           onremotestream: (stream) => {
  //           },
  //         });
  //         setJanus(janusInstance);
  //       },
  //       error: (error) => {
  //         console.error("Janus error:", error);
  //       },
  //     });
  //   }});

  //   return () => {
  //     if (janus) {
  //       janus.destroy();
  //     }
  //   };
  // }, []);

  // const joinRoom = () => {
  //   const room = 1234; // Your room number
  //   const register = { "request": "join", "room": room, "ptype": "publisher", "display": "Your Name" };
  //   videoroom.send({ message: register });
  // };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, input]);
      setInput("");
    } else {
      alert("Message cannot be empty!");
    }
  };

  return (
    <div className="flex flex-col justify-center p-12">
      <h4 className="text-center">Live Streaming</h4>
      <div className="grid stream-grid p-2">
        <video
          className="w-full h-full p-3 rounded-md" // Ensure rounded corners
          playsInline
          ref={myVideoRef}
          autoPlay
          muted
        />
        <div className="mt-4">
          <Card className="w-[350px] h-[645px] flex flex-col">
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
      <Tabs defaultValue="agenda" className="w-full p-2 bg-gray-50">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="announcement">Announcement</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="doubt">Raise a Doubt</TabsTrigger>
        </TabsList>
        <TabsContent value="announcement">
          No Announcements from tutor yet!
        </TabsContent>
        <TabsContent value="agenda">
          Live stream agenda will be displayed here.
        </TabsContent>
        <TabsContent value="notes">
          Take down notes
        </TabsContent>
        <TabsContent value="doubt">
          Ask a question from tutor
        </TabsContent>
      </Tabs>
    </div>
  );
}
