import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userInfo.isStaff ) {
      if(!userInfo.isAdmin){
      navigate("/");}
      }
  }, [userInfo, navigate]);
  return (
    <section className="vh-90 mt-5 mb-5 pt-4">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-80">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-white" style={{ borderRadius: '25px', backgroundColor: '#02b4b8' }}>
              <div className="card-body p-md-4">
                <div className="py-3 row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 ">
                    <h1 className="text-center pt-5">Welcome to the <br></br>Staff Page</h1>
                    <div className="d-flex justify-content-center mx-4 mt-6 pt-5">
                      <Link to="/staff/manageQuestions">
                        <button className="btn btn-primary btn-lg me-3">Manage Questions</button>
                      </Link>
                      <Link to="/staff/manageTests">
                        <button className="btn btn-primary btn-lg me-3">Manage Tests</button>
                      </Link>
                      <Link to="/staff/manageFlashcards">
                        <button className="btn btn-primary btn-lg me-3">Manage Flahscard</button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://atpsoftware.vn/wp-content/uploads/2020/02/staff.png"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
