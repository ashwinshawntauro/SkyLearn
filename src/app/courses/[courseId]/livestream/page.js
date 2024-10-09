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
import Navbar from "@/components/ui/navbar";

export default function Page() {
  const myVideoRef = useRef();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
      });
  }, []);

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, input]);
      setInput("");
    }
  };

  return (
    <div>
        <Navbar></Navbar>
      <div className="grid custom-grid justify-center p-12">
        <video
          className="w-full h-full p-5 rounded round-5" // Full width of the grid
          playsInline
          ref={myVideoRef}
          autoPlay
          muted
        />
        <div className="mt-4">
          <Card className="w-[350px] h-[650px] flex flex-col">
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
      <Tabs defaultValue="agenda" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="">Notes</TabsTrigger>
          <TabsTrigger value="">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="agenda">
            Live stream agenda will be displayed here.
        </TabsContent>
        <TabsContent value="notes">
            Notes related to this will be displayed here.
        </TabsContent>
        <TabsContent value="">
            Notes related to this will be displayed here.
        </TabsContent>
        <TabsContent value="">
            Notes related to this will be displayed here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
