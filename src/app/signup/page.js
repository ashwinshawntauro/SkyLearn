"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  getFirestore,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
} from "@/lib/firebase/auth";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

export default function Page() {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [department, setDept] = useState(null);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const { isLogged } = AuthContext();

  useEffect(() => {
    if (isLogged) {
      router.replace("/");
    }
  }, [isLogged, router]);

  const storeData = async (name, email, role, userId, department) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          email: email,
          name: name,
          role: role,
          department: department
        })
      })
      if (response) {
        router.replace("/");
      }
    } catch (error) {
      setError(error.message);
      console.error('Registration error:', error);
    }
  };

  // const setCookie = async (token) => {
  //   const res = await fetch("/api/cookie", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   });
  //   if (!res.ok) {
  //     throw new Error("Failed to set cookie");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 6000);
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      // let token = await getIdToken(user);
      const userId = user.uid
      // router.replace("/");
      storeData(name, email, role, userId, department);
      // setCookie(token);
      console.log("user registered: ", userId)
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    }

  };

  const handleGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 6000);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        // setCookie(token);
        storeData(user.displayName, user.email, role, user.uid);
        // router.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`${errorCode} ${errorMessage}`);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Tabs value={role} onValueChange={setRole} className="space-y-6">
            <TabsList className="flex space-x-2">
              <TabsTrigger value="student" className="w-full">Student</TabsTrigger>
              <TabsTrigger value="teacher" className="w-full">Tutor</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <span className="flex items-center justify-center">
                <button onClick={handleGoogle} className="flex items-center border hover:bg-primary-light border-blue-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800">
                  <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd" />
                  </svg>

                  <span className="px-2">Continue with Google</span>
                </button>
              </span>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500">{error}</p>}

                <h6 className="flex justify-center font-semibold my-2">OR</h6>
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="name"
                      name="name"
                      type="string"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center py-2 px-4 bg-primary text-white rounded disabled:opacity-50"
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <span className="loader" />
                    ) : (
                      "Register as Student"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="teacher">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500">{error}</p>}
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Tutor Name
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="name"
                      name="name"
                      type="string"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Department
                  </Label>
                  <div className="mt-2">
                    <Select onValueChange={setDept} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="mechanical">Mechanical</SelectItem>
                          <SelectItem value="civil">Civil</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center py-2 px-4 bg-primary text-white rounded disabled:opacity-50"
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <span className="loader" />
                    ) : (
                      "Register as Tutor"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
