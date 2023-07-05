import React from "react";
import "./CardBlog.css";
import { Link } from "react-router-dom";
import TokenService from "../../utils/tokenService";
function CardBlog(props) {
  const handleClick = () => {
    if (!TokenService.getuserInfo()) {
      alert("You need to Login");
    }
  };
  return (
    <>
      
      <div class="col-lg-3 col-sm-6  fadeInUp rounded-pill" data-wow-delay="0.1s" id="blog">
      <div class="rounded">
      <div class="card border-info mb-3 rounded"
      > <div class="service-item text-center pt-3 ">
          
          <div class="p-4">
            <h5 class="mb-3">
              {props.name} TEST {props.test}
            </h5>
            <p>
              <span>{props.time} minutes </span> <br></br>
              <span>
                {props.part} parts | {props.numberQuestion} questions{" "}
              </span>
              {TokenService.getuserInfo() ? (
                <Link to={`/test/${props._id}`} state={props}>
                  <button onClick={handleClick}>Take Test</button>
                </Link>
              ) : (
                <Link to={`/login`} state={props}>
                  <button onClick={handleClick}>Take Test</button>
                </Link>
              )}
            </p>
          </div>
          </div>
        </div></div>
      </div>
    </>
  );
}

export default CardBlog;
