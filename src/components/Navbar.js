import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AuthContext } from "@/providers/AuthProvider";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

function Navbar() {
  const { userName, isLogged, logout } = AuthContext();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/getSearchResults?search=${query}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (courseId) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div>
      <header className="flex items-center justify-between p-2 bg-zinc-100 max-h-[50px]">
        <Button
          className="text-black bg-white hover:text-white group"
          onClick={(e) => router.replace("/")}
        >
          <svg
            className="w-6 h-6 text-gray-800 group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
              clipRule="evenodd"
            />
          </svg>
          Home
        </Button>

        <div className="relative w-full mx-2">
          <Input
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border rounded-md w-full bg-white shadow"
          />
          {searchQuery && (
            <div className="absolute bg-white border rounded-md shadow-lg w-full z-10 mt-2">
              {isLoading ? (
                <p className="p-2 text-gray-500">Loading...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.course_id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(result.course_id)}
                  >
                    <p className="font-semibold">{result.course_name}</p>
                    <p className="text-sm text-gray-500">
                      {result.course_description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>

        {isLogged && (
          <div className="flex items-center space-x-4">
            <span className="inline-flex font-semibold text-sm items-center bg-white text-black p-1.5 px-2 rounded-lg shadow border border-gray-100 whitespace-nowrap">
              Points: 0
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <Avatar className="w-8 h-8 cursor-pointer">
                  {userName && (
                    <AvatarImage
                      className="rounded-full"
                      src={`https://ui-avatars.com/api/?name=${userName}&background=1e90ff&color=FFFFFF`}
                    />
                  )}
                  <AvatarFallback className="bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={(e) => router.replace("/profile")}>
                  <svg
                    className="w-12 h-12 text-white fill-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => router.replace("/mycourses")}>
                  <svg
                    className="w-12 h-12 text-white fill-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                    />
                  </svg>
                  My Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <svg
                    className="w-6 h-6 text-blue-500 fill-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                    />
                  </svg>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;
