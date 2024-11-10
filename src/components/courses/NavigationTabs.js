import React from 'react';

function NavigationTabs() {
  return (
    <nav className="bg-gray-200 p-4">
      <ul className="flex space-x-6 text-gray-600">
        <li className="cursor-pointer hover:text-indigo-600">Overview</li>
        <li className="cursor-pointer hover:text-indigo-600">Curriculum</li>
        <li className="cursor-pointer hover:text-indigo-600">Discussion</li>
        <li className="cursor-pointer hover:text-indigo-600">Review</li>
        <li className="cursor-pointer hover:text-indigo-600">Instructors</li>
      </ul>
    </nav>
  );
}

export default NavigationTabs;