import React from 'react';

function Header({course}) {
  return (
    <header className="bg-indigo-600 text-white py-8 px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2">{course}</h1>
        <p className="mb-2">VTU e-Learning</p>
        <div className="flex justify-center space-x-4">
          <p className="font-light text-sm">54 Students Enrolled</p>
          <div className="flex items-center">
            <div className="text-yellow-500 mr-1">★★★★★</div>
            <p className="text-sm">(0 Ratings)</p>
          </div>
        </div>
        <button className="mt-4 bg-purple-500 hover:bg-purple-400 text-white py-2 px-4 rounded-lg">
          Download Brochure
        </button>
      </div>
    </header>
  );
}

export default Header;