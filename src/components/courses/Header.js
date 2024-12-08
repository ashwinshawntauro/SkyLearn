import React from 'react';

function Header({ course }) {
  return (
    <header className="bg-primary text-white py-8 px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{course.course_name}</h1>
        <span className="mb-4 text-lg">{course.course_description}</span>

        {/* Course info section */}
        <div className="flex justify-center items-center space-x-8 mb-6">
          <span className="font-light text-sm">54 Students Enrolled</span>
          <div className="flex items-center text">
            <div className="text-yellow-500 mr-2">★★★★★</div>
            <span>(0 Ratings)</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
