import React from 'react';

function Header({ course }) {
  return (
    <header className="bg-primary text-white py-8 px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{course.course_name}</h1>
        <span className="mb-4 text-lg">{course.course_description}</span>
      </div>
    </header>
  );
}

export default Header;
