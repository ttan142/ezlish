import Navbar from "./components/Navbar";
import "./app.css";

import { BrowserRouter } from "react-router-dom";
import React,{ useEffect } from "react";
import Footer from "./components/Footer"

import { useSelector,useDispatch } from 'react-redux';
import TokenService from "./utils/tokenService";
import * as types from './constant/User/userConstants'

import AuthRoutes from "./routes/AuthRoutes";
import TestRoutes from "./routes/TestRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
import ResultRoutes from "./routes/ResultRoutes";
import CourseRoutes from "./routes/CourseRoutes";
import TipsRoutes from "./routes/TipsRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import StaffRoutes from "./routes/StaffRoutes";



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const App = () => {
  

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 
  useEffect(()=>{
    if(TokenService.getuserInfo()){
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: TokenService.getuserInfo(),
    })
   
  }
  },[dispatch])
  useEffect(() => {
    const getUser = () => {
      fetch("https://ezlish.onrender.com/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {

          dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: resObject.user,
          })
          
          TokenService.setuserInfo(resObject.user);
          console.log(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  },[dispatch]);



  return (
    <BrowserRouter>
      <Navbar user={userInfo} />
      <React.Suspense fallback={loading}>
        <AuthRoutes />
        <CourseRoutes />
        <TestRoutes />
        <ProfileRoutes />
        <ResultRoutes />
        <TipsRoutes />
        <AdminRoutes />
        <StaffRoutes />
        
        <Footer />
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;

