import React from 'react'
import { Route, Routes } from "react-router-dom";


const DetailResult = React.lazy(() => import("../pages/TestResult/Detail/DetailResult"));
const  TestResult = React.lazy(() => import("../pages/TestResult/TestResult"));
function ResultRoutes() {
  return (
    <Routes>
      <Route path="/result/:resultId" element={<TestResult />} />
      <Route path="/result/details/:resultId" element={<DetailResult />} />
    </Routes>
  );
}

export default ResultRoutes