"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return <div 
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'  // Make the container take full screen height
  }}
>
  <DotLottieReact 
    src="https://lottie.host/2dfe3f56-1676-472e-b1b8-bfa43b7faba8/ONbpoVclRb.lottie" 
    loop 
    autoplay
    style={{ width: '150px', height: '150px' }} // Adjust size here
  />
</div>

}
