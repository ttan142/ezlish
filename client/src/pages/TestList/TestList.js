import React from "react";
import avatar from "../../img/avatar.png";

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
  useEffect(() => {
    if (!TokenService.getuserInfo()) {
      alert("Login first");
    }
  }, [TokenService.getuserInfo()]);
  //filter test by button
  if (!TokenService.getuserInfo()) {
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
        <div className="row">
          <div className="col-6 col-sm-9">
            <SearchBar
              setTest={setTest}
              tests={test}
              filterText={filterText}
              onTextChange={handleFilterText}
            />
          </div>
          <div className="col-6 col-sm-3">
            <div className="user m-2 pt-2 border rounded text-center" id="card">
              <img
                src={
                  (TokenService.getuserInfo() &&
                    TokenService.getuserInfo().photos) ||
                  avatar
                }
                onError={handleImageError}
                className="w-25 img-thumbnail rounded-circle user-avatar" // Updated class name
                alt="User Avatar"
              />
              <p className="m-0 p-0 user-name text-center justify-center">
                {TokenService.getuserInfo() && TokenService.getuserInfo().name}
              </p>
              <hr className="mb-3" />
              <Link
                to="/profile"
                className="mb-3 btn btn-secondary btn-sm"
                id="profile"
                style={{ backgroundColor: "#1eb2a6", color: "white" }}
              >
                View Result
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="search-result">
        <div className="blog-card">
          <div className="blog-wrap">
            <TestTable tests={test} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TestList;
