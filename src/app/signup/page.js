"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState ,useEffect} from "react";
import { auth, createUserWithEmailAndPassword } from "@/lib/firebase/auth"; 
import {useRouter} from 'next/navigation';
import { AuthContext } from "@/providers/AuthProvider";

export default function Page() {  
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null); 
  const router = useRouter()

  const {isLogged} = AuthContext();
  useEffect(()=>{
    if(isLogged){
      router.push('/profile');
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      console.log("User registered:", email);
      router.push('/mycourses')
    } catch (error) {
      setError(error.message); 
      console.error("Registration error:", error);
    }
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
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

            <div>
              <Label
                htmlFor="email" // Use htmlFor instead of for
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email" // Use autoComplete instead of autocomplete
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
                  htmlFor="password" // Use htmlFor instead of for
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
                  autoComplete="current-password" // Use autoComplete instead of autocomplete
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
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
            <a href="#" className="font-semibold leading-6 text-primary px-1">
               Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
