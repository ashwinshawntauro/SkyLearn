import React from 'react';

function Header({ course }) {
  return (
    <header className="bg-blue-600 text-white py-8 px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{course.course_name}</h1>
        <p className="mb-4 text-lg">{course.course_description}</p>

        {/* Course info section */}
        <div className="flex justify-center items-center space-x-8 mb-6">
          <p className="font-light text-sm">54 Students Enrolled</p>
          <div className="flex items-center text">
            <div className="text-yellow-500 mr-2">★★★★★</div>
            <p>(0 Ratings)</p>
          </div>
        </div>
        {/* Buttons for Brochure Download and Enroll */}
        <div className="flex justify-center space-x-4">
          <button className="bg-black hover:bg-blue-400 text-white py-2 px-4 rounded-lg flex justify-center">
            <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
            </svg>
            <p className='px-1'>Download Brochure</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
