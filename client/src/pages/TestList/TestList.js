import React from "react";
import avatar from '../../img/avatar.png'
import "./TestList.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestTable, SearchBar } from "../../components/TestList";

import TokenService from "../../utils/tokenService";
import { useEffect } from "react";
function TestList() {
  //serachBar
  const handleImageError = (e) => {
    e.target.src = avatar;
  };
  const [test, setTest] = useState([]); // pass the data getfrom API
  const [filterText, setFilterText] = useState("");
  const history = useNavigate();
  //handle user input
  const handleFilterText = (e) => {};
  // take all Test
   useEffect(()=>{
    if(!TokenService.getuserInfo()){
      alert("Login first");
    }
   },[TokenService.getuserInfo()]);
  //filter test by button
   if(!TokenService.getuserInfo()){
    history("/login");
   }
  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Tests
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="text-white" to={`/`}>
                      Home
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Tests
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
        <div className="container">
          <SearchBar
            setTest={setTest}
            tests={test}
            filterText={filterText}
            onTextChange={handleFilterText}
          ></SearchBar>

          <div className="user" id="card">
            <img
              src={
                (TokenService.getuserInfo() && TokenService.getuserInfo().photos) || avatar} onError={handleImageError}
              
                className="avatar"
            />
            <p className="user-name">
              {TokenService.getuserInfo() && TokenService.getuserInfo().name}
            </p>
            <hr></hr>
            <Link to="/profile" id="profile">
              View Result
            </Link>
          </div>
        </div>
        <div className="search-result">
          <div className="blog-card">
            <div className="blog-wrap">
              <TestTable tests={test}></TestTable>
            </div>
          </div>
        </div>
    
    </>
  );
}

export default TestList;
