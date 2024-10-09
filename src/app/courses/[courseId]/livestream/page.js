"use client";
import { useEffect, useRef } from "react";

export default function Page() {
  const myVideoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio:true
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

  return (
    <div className="flex flex-col-2 justify-center items-center p-12">
      <video className="w-100" playsInline ref={myVideoRef} autoPlay muted />
    </div>
  );
}
