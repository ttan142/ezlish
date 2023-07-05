import React from 'react'
import { Route, Routes } from "react-router-dom";


const FlashCards = React.lazy(() => import("../pages/FlashCard/FlashCards"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
function ProfileRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/flashcard" element={<FlashCards/>} />
    </Routes>
  );
}

export default ProfileRoutes