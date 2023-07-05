import React from "react";
import { Route, Routes } from "react-router-dom";



const Course = React.lazy(() => import("../pages/Course/Course"));
const CourseDetails = React.lazy(() => import("../pages/Course/CourseDetails"));

function CourseRoutes() {
  return (
    <Routes>
      <Route path="/courses" element={<Course />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
    </Routes>
  );
}

export default  CourseRoutes;
