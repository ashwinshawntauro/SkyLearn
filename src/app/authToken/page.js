"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
      }
    }
  }, []);

  return (
    <div>
      <p>Permission Granted Successfully.</p>
      <Button onClick={() => window.history.go(-2)}>Back to Page</Button>
    </div>
  );
}
