import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TestResult.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Answer from "../../components/TestResult/Answer";
import CommentCard from "../../components/comment/CommentCard";
function TestResult(props) {
  const location = useLocation();
  const { resultId } = location.state; //RESULTid
  const [data, setData] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://ezlish-server.onrender.com/api/results/test/".concat(resultId)
      )
      .then(
        (response) => {
          console.log(response);
          setData(response.data.result[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDetailResult = () => {
    history(`/result/details/${resultId}`);
  };

  return (
    <>
      <section id="test-result">
        <div className="content bg-white p-4 rounded border">
          <div className="head-content">
            <h1>
              {" "}
              Result: {data.testResult && data.testResult[0].name} Test{" "}
              {data.testResult && data.testResult[0].test}
            </h1>
          </div>
          <div className="result-content d-flex flex-row align-items-start justify-content-around">
            <div className="result-item mr-2 d-flex flex-wrap flex-column justify-content-center align-items-center">
              <p>
                <i class="fa fa-list-alt" aria-hidden="true"></i>Result :{" "}
                {data.result}
              </p>
              <p>
                {" "}
                <i id="correct" class="fa fa-check" aria-hidden="true"></i>
                Accuracy : {data.accuracy} %
              </p>
              <p>
                <i class="fas fa-clock"></i>Time : {data.time}
              </p>
            </div>
            <div className="result-item">
              <i id="correct" class="fa fa-check" aria-hidden="true"></i>
              <p>Correct</p>
              <p>{data.correct}</p>
            </div>
            <div className="result-item">
              <i id="wrong" class="fa fa-times" aria-hidden="true"></i>
              <p>Wrong </p>
              <p>{data.wrong}</p>
            </div>
            <div className="result-item">
              {" "}
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
              <p>Skip </p>
              <p>{data.skip}</p>
            </div>
            <div className="result-item">
              {" "}
              <i class="fas fa-flag-checkered"></i>
              <p>Score </p>
              <p>{data.score}</p>
            </div>
          </div>
          <div className="test-result">
            Key{" "}
            <span>
              <button onClick={handleDetailResult} className="result">
                View details
              </button>
            </span>
          </div>
        </div>

        <Answer resultId={resultId} />
        {/* Comment of that test */}
        {data.testResult && <CommentCard id={data.testResult[0]._id} />}
      </section>
    </>
  );
}

export default TestResult;
/*<div className="content">
          <Comments
            commentsUrl="http://localhost:3004/comments"
            currentUserId="1"
          />
         //can cai testid
          <CommentCard id={ data.testResult[0]._id} />
        </div>*/
