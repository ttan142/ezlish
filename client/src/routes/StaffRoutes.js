import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const ManageQuestions = React.lazy(() => import("../pages/Staff/ManageQuestions/manageQuestions"));
const ManageTests = React.lazy(() => import("../pages/Staff/ManageTests/manageTest"));
const ManageFlashcards = React.lazy(() => import("../pages/Staff/ManageFlashcards/manageFlashcards"));
const StaffPage = React.lazy(() => import("../pages/Staff/StaffPage"));

function StaffRoutes() {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/manageQuestions" element={<ManageQuestions />} />
        <Route path="/staff/manageTests" element={<ManageTests />} />
        <Route path="/staff/manageFlashcards" element={<ManageFlashcards />} />
      </Routes>
    </Suspense>
  );
}

export default StaffRoutes;
