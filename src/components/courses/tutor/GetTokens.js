"use client"
import { useEffect, useState } from "react";

export default function Page({courseId,livestreamId}) {
    const [tokensRaised, setTokensRaised] = useState(null);
    useEffect(()=>{
        const getToken = async (courseId, livestreamId) => {
            try {
              const response = await fetch(`/api/Token/getToken?courseId=${courseId}&livestreamId=${livestreamId}`);
              const data = await response.json();
              response.ok ? setTokensRaised(data.count) : setTokensRaised(0);
            } catch (error) {
              console.error("Error getting token:", error);
              return 0;
            }
          };
        getToken(courseId,livestreamId)
    },[courseId,livestreamId])
    
    return (
        <div>
          {tokensRaised!== null?(<p className="text-gray-600 leading-none">Tokens Raised: {tokensRaised}</p>):(<p>Loading Tokens...</p>)}
        </div>
    );
}