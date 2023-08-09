import React from 'react'
import { Route, Routes } from "react-router-dom";


const ToeicTest = React.lazy(() => import("../pages/TestingScreen/Testing"));
const TestList = React.lazy(() => import("../pages/TestList/TestList"));
const Test = React.lazy(() => import("../pages/Test/Test"));

function TestRoutes() {
  return (
    <Routes>
      <Route path="/testlist" element={<TestList />} />
      <Route path="/test/:testId" element={<Test />} />
      <Route path="/testing" element={<ToeicTest />} />
    </Routes>
  );
}

export default TestRoutes