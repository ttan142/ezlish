import Google from "../../img/google.png";
import Facebook from "../../img/facebook.png";
import Github from "../../img/github.png";
import "./Login.css"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userAction';
import {  Button, Row, Col } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { Loader, Message} from "../../components/shared";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;


  
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
      console.log("Success")
      if (userInfo.isAdmin) {
        history("/admin"); // Redirect to admin page if the user is an admin
      } else if(userInfo.isStaff) {
        history("/staff"); // Redirect to home page for regular users
      }
      else {history("/home")}
    }
  }, [history,userInfo]);
 


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };  

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
  <section >

              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}
              <div className="card text-black" style={{ borderRadius: "25px" }}>
  <div className="card-body p-md-5 mt-5">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid"
          alt="Sample image"
        />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" className="btn btn-primary btn-floating mx-1" onClick={facebook}>
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1" onClick={google}>
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1" onClick={github}>
              <i className="fab fa-github"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>
          
          <form onSubmit={submitHandler}>
          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form3Example3"
              className="form-control form-control-lg"
              placeholder="Enter a valid email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="form3Example3">
              Email address
            </label>
          </div>

          {/* Password input */}
          <div className="form-outline mb-3">
            <input
              type="password"
              id="form3Example4"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="form3Example4">
              Password
            </label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {/* Checkbox */}
            <div className="form-check mb-0">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
                id="form2Example3"
              />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">
              Forgot password?
            </a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button onClick={submitHandler}
              type="button"
              className="btn btn-primary btn-lg"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
            >
              Login
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Don't have an account? <a href="#!" className="link-danger"><Link to="/register">
                    Register
                  </Link></a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
  </div>
</section>
  );
};

export default Login;
