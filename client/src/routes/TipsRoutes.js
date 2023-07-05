import React from "react";
import { Route, Routes } from "react-router-dom";
import Single from "../pages/ToeicTips/singlepost/Single";




const ToeicTips = React.lazy(() => import("../pages/ToeicTips/ToeicTips"));
function TipsRoutes() {
  return (
    <Routes>
      <Route exact path="/toeictips" element={<ToeicTips />} />
      <Route path="/toeictips/:postsId" element={<Single />} />
    </Routes>
  );
}

export default  TipsRoutes;
