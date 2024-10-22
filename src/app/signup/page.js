"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useContext } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  auth,
  createUserWithEmailAndPassword,
  getFirestore,
  doc,
  setDoc,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
} from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

export default function Page() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [role, setRole] = useState("student");
  const router = useRouter();
  let token = null
  const db = getFirestore();
  const provider = new GoogleAuthProvider();
  const { isLogged } = AuthContext();
  
  useEffect(() => {
    if (isLogged) {
      router.push("/profile");
    }
  }, [isLogged, router]);

  const storeData = async (user) => {
    setDoc(doc(db, "users", user.uid), {
      name: user.displayName || name,
      email: user.email,
      role: role,
    });
  };

  const setCookie = async (token) =>{
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, 
      },
    });
    if (!res.ok) {
      throw new Error('Failed to set cookie');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const user = userCredential.user;
      let token = await getIdToken(user);
      setCookie(token);
      storeData(user);
      console.log("User registered:", email);
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    }
  };

  const handleGoogle = async (event) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setCookie(token);
        storeData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setError(errorCode + errorMessage);
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={handleGoogle}>Sign up with Google</Button> 
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </Label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-primary">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
              <div className="inline-flex mt-2">
                <Label htmlFor="regfor" className="mr-2 mt-2">
                  Register as:{" "}
                </Label>
                <RadioGroup
                  id="regfor"
                  className="m-2 flex"
                  value={role}
                  onValueChange={setRole}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tutor" id="tutor" />
                    <Label htmlFor="tutor">Tutor</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white"
              >
                Register
              </Button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <a href="/signin" className="font-semibold leading-6 px-1">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
