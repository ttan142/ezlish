import React, { useEffect, useState } from "react";
import axios from "axios";
import TokenService from "../../utils/tokenService";
import {Result,Pagination} from "../../components/Result"

import "./Profile.css";

import { Link,useNavigate } from "react-router-dom";
import {getAscending,getDescending} from "../../utils/dateService"

function Profile() {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [increase,setIncrease]=useState(false);
  const [resultItem, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

 
  
  

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://ezlish.onrender.com/api/results/".concat(
          TokenService.getuserInfo()._id
        ),
        {
          params: { limit: "all" },
        }
      )
      .then(
        (response) => {

          //response.data.result
        
          // giam dan
        // 
          
          
          response.data.result = getDescending(response.data.result);
          setItem(response.data.result);

          setLoading(false);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

 
 const handleColor= (e)=>{
    console.log(e.target.value);
 }
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = resultItem.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber); //handleClick
  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Result
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
                    Result
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {resultItem.length === 0 ? (
        <div className="cardss">
          <h1 style={{ color: "red" }}>
          You have not done any test
        </h1>
        </div>
        ) : (
          <>
        <div className="cardss">
          <div id="sort-bar">
            <select
              name="sort"
              onClick={(e) => {
                if (e.target.value === "inc") {
                  const s = getAscending(resultItem);
                  setItem(s);
                } else {
                  const s = getDescending(resultItem);
                  setItem(s);
                }
              }}
            >
              <option value="dec">Newest</option>
              <option value="inc">Oldest</option>
            </select>
          </div>
          <Result
            resultItem={currentPosts}
            loading={loading}
            status={increase}
          />

          <Pagination
            resultsPerPage={postsPerPage}
            totalResults={resultItem.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        </>
        )}
    </>
  );
}

export default Profile;
