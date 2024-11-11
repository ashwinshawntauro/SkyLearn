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
        <h2 className="text-4xl font-bold text-primary">&#8377;{course.course_price}</h2> {/* @follow-up Rupee */}
        <ul className="list-none my-4 space-y-2 text-sm">
          <li>Course Duration: <span className="font-medium">8h 56m 9s</span></li>
          <li>Course Level: <span className="font-medium">{course.difficulty}</span></li>
          <li>Students Enrolled: <span className="font-medium">54</span></li>
          <li>Language: <span className="font-medium">English</span></li>
        </ul>
        <button className="w-full flex justify-center bg-blue-600 font-bold text-white p-2 rounded-lg group hover:bg-blue-500">
          <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z" clip-rule="evenodd" />
          </svg>
          Enroll in this Course
        </button>
        <button className="w-full  flex justify-center mt-2 border border-gray-300 p-2 rounded-lg hover:bg-gray-100">
          <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z" />
          </svg>
          Add to Wishlist
        </button>
        <button className="w-full flex justify-center mt-2 border border-gray-300 p-2 rounded-lg hover:bg-gray-100">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
          </svg>
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
