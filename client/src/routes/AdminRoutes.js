import React from "react";
import { Route, Routes } from "react-router-dom";



const Admin = React.lazy(() => import("../pages/Admin/AdminPage"));

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default  AdminRoutes;
