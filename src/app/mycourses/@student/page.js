"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/courses/Header";
import CourseDetails from "@/components/courses/CourseDetails";
import InstructorSection from "@/components/courses/InstructorSection";
import NavigationTabs from "@/components/courses/NavigationTabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
// Page.js
export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <Navbar />
            <div className="px-8 py-6">
                {/* Course Metrics Section */}
                <h2 className="text-2xl font-bold mb-4">My Courses</h2>
                <div className="flex space-x-24  text-gray-800 mb-8">
                    <div>
                        <p className="text-lg font-semibold">Course Enrolments</p>
                        <p className="text-gray-500">6 Active</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Course Completions</p>
                        <p className="text-gray-500">0 Completed Courses</p>
                    </div>
                   
                </div>

                {/* Filter and Search Section */}
                <div className="flex items-center space-x-4 mb-6">
                    <select className="border p-2 rounded bg-gray-100">
                        <option>All</option>
                        <option>Active</option>
                        <option>Completed</option>
                    </select>
                    <input type="text" placeholder="Search" className="border p-2 rounded w-1/2" />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Sort by course name</button>
                </div>

                {/* Course Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white border rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                            <img src="https://via.placeholder.com/300x150" alt="Course Thumbnail" className="w-full h-40 object-cover" />
                            <div className="absolute top-2 right-2">
                                <span className="bg-white p-1 rounded-full text-yellow-400">⭐</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold">Class and Conflict in World Cinema</h3>
                            <p className="text-gray-500">Test courses (Digi Ed)</p>
                            <div className="h-1 w-1/2 bg-green-400 rounded mt-2"></div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                            <img src="https://via.placeholder.com/300x150" alt="Course Thumbnail" className="w-full h-40 object-cover" />
                            <div className="absolute top-2 right-2">
                                <span className="bg-white p-1 rounded-full text-yellow-400">⭐</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold">Digital Literacy</h3>
                            <p className="text-gray-500">Test courses (Digi Ed)</p>
                            <div className="h-1 w-1/2 bg-green-400 rounded mt-2"></div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                            <img src="https://via.placeholder.com/300x150" alt="Course Thumbnail" className="w-full h-40 object-cover" />
                            <div className="absolute top-2 right-2">
                                <span className="bg-white p-1 rounded-full text-yellow-400">⭐</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold">Moving to Moodle 4.2</h3>
                            <p className="text-gray-500">Moodle 4.2 Training</p>
                            <div className="h-1 w-1/2 bg-green-400 rounded mt-2"></div>
                        </div>
                    </div>

                    {/* Add more cards as needed */}
                </div>
            </div>
        </div>
    );
}