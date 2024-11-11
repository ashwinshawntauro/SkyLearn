function CourseDetails({ course }) {
  return (
    <aside className="bg-white p-6 rounded-lg shadow-md">
    <div className="rounded overflow-hidden">
      <iframe
        className="w-full h-56 rounded"
        src="https://www.youtube.com/embed/video-id"
        title="Course Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      />
    </div>

    <div className="mt-6">
      <h2 className="text-4xl font-bold">${course.course_price}</h2>
      <ul className="list-none my-4 space-y-2 text-sm">
        <li>Course Duration: <span className="font-medium">8h 56m 9s</span></li>
        <li>Course Level: <span className="font-medium">{course.difficulty}</span></li>
        <li>Students Enrolled: <span className="font-medium">54</span></li>
        <li>Language: <span className="font-medium">English</span></li>
      </ul>
      <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500">
        Enroll in the Course
      </button>
      <button className="w-full mt-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
        Add to Wishlist
      </button>
      <button className="w-full mt-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
        Share Course
      </button>
    </div>

    <div className="mt-6">
      <h3 className="text-md font-semibold">This Course Includes:</h3>
      <ul className="list-disc ml-5 space-y-2 mt-2 text-sm">
        <li>8h 56m 9s Video Lectures</li>
        <li>Quizzes</li>
        <li>Assignments</li>
        <li>Downloadable Resources</li>
        <li>Full Lifetime Access</li>
        <li>Certificate of Completion</li>
      </ul>
    </div>
  </aside>
  );
}

export default CourseDetails;
