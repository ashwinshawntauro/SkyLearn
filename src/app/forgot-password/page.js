"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendPasswordResetEmail, getAuth, auth } from "@/lib/firebase/auth";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react";

export default function Page() {
  const [emailAdd, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, emailAdd)
      .then(() => {
        setMessage("Reset email sent");
      })
      .catch((error) => {
        setMessage(`${error.code}:${error}`);
      });
  };

  return (
    <div className="w-full sm:w-full md:w-1/2 lg:w-2/3 flex justify-center flex-col items-center min-h-screen mx-auto my-10 sm:my-6 p-6 sm:p-4">
      <h1 className="text-xl sm:text-lg font-medium">Reset Password</h1>
      <span className="text-slate-500 text-sm sm:text-xs">Enter your email ID to reset the password</span>

      <form onSubmit={handleSubmit} className="my-8 sm:my-6">
        <div className="flex flex-col space-y-2 sm:space-y-3">
          {message && <Alert>
            <AlertTitle>Message</AlertTitle>
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>}

          <Label htmlFor="email">
            <p className="font-medium text-slate-700 py-1 sm:pb-0.5">Email Address</p>
          </Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            className="w-full py-3 sm:py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter email address"
            required
          />

          <Button
            type="submit"
            className={`w-full py-3 sm:py-2 text-sm font-medium text-white bg-primary hover:bg-blue rounded-lg hover:shadow`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 sm:w-4 sm:h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            <span>Reset Password</span>
          </Button>

          <p className="text-center text-sm">
            Not registered yet? <Link href="#" className="text-primary font-medium inline-flex space-x-1 items-center">
              <span>Register now</span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>

  );
}
