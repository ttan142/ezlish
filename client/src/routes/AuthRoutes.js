import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";


const Home = React.lazy(() => import("../pages/Home/Home"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const RegisterScreen = React.lazy(() =>
  import("../pages/Login/RegisterScreen")
);
const LandingPage = React.lazy(() => import("../pages/Landing/LandingPage"));


export default function AuthRoutes() {
     const userLogin = useSelector((state) => state.userLogin);
     const { userInfo } = userLogin;
    return (
      <Routes>
        <Route
          path="/"
          element={userInfo ? <Home user={userInfo} /> : <LandingPage />}
        ></Route>
        <Route path="/home" element={<Home user={userInfo} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterScreen />} />
       
      </Routes>
    );
};