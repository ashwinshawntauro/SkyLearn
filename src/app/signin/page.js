"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const { isLogged } = AuthContext();

  useEffect(() => {
    if (isLogged) {
      router.push("/");
    }
  }, [isLogged, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 6000);
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      router.replace("/");
    } catch (error) {
      setError(error.message);
      console.error("Sign-in error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
    signInWithPopup(auth, provider)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setError(`${error.code} ${error.message}`);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="pb-12 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md p-4">
        <div className="text-center">
          <h2 className="mt-10 text-2xl font-bold text-gray-900">
            ACCOUNT SIGN-IN
          </h2>
        </div>
        <div className="mt-10 mx-auto w-full max-w-xs sm:max-w-sm">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center border border-blue-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-100"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <h6 className="text-center font-semibold my-2">OR</h6>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
                className="w-full mt-2"
              />
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-4 mt-2 bg-primary text-white rounded disabled:opacity-50"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <span className="loader" />
              ) : (
                "Sign In"
              )}
            </Button>
            <span className="flex justify-center">Not yet Registered? <Link href={"/signup"} className="px-2 text-blue-500 font-semibold">Signup</Link></span>
          <span className="flex justify-center">Forgot Password? <Link href={"/forgot-password"} className="px-2 text-blue-500 font-semibold"> Click Here</Link></span></form>
        </div>
      </div>
    </div>
  );
}
