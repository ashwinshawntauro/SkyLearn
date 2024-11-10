function CourseDetails({ course }) {
  return (
    <div>
      <h2>{course.course_name}</h2>
      <p>{course.course_description}</p>
    </div>
  );
}

export default CourseDetails;
