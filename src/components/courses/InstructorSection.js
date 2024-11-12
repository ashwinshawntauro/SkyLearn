import React from 'react';

function InstructorSection() {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Meet Your Instructor</h2>
      </div>

      <div className="space-y-8">
        <div className="border-b pb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="ml-4">
              <p className="font-bold">VTU e-Learning</p>
              <p className="text-gray-500 text-sm">0.0 Rating | 0 Students | 1 Courses</p>
            </div>
          </div>
          <span className="text-sm mt-2">About instructor VTU e-Learning.</span>
        </div>

        <div className="border-b pb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="ml-4">
              <p className="font-bold">KALE S. R.</p>
              <p className="text-gray-500 text-sm">0.0 Rating | 0 Students | 59 Courses</p>
            </div>
          </div>
          <span className="text-sm mt-2">
            Prof. Sunil S. Kale has been with the Department of Mechanical Engineering since 1983. He has developed and taught multiple courses and has research interests in various fields.
          </span>
        </div>
      </div>
    </section>
  );
}

export default InstructorSection;