"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [courseRedirect, setCourseRedirect] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the course_redirect from localStorage safely
    const storedRedirect = localStorage.getItem("course_redirect");
    if (storedRedirect) {
      setCourseRedirect(storedRedirect);
    }

    // Extract the token from the URL hash
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
      }
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after the countdown ends
    const redirect = setTimeout(() => {
      if (storedRedirect) {
        router.replace(`/courses/${storedRedirect}/classroom`);
      }
    }, 3000);

    // Cleanup intervals and timeouts
    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 pb-4 px-6 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h1 className="text-2xl font-bold mb-2">Permission Granted</h1>
          <p className="text-gray-600 mb-4">
            You have successfully granted permission.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
