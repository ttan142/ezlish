import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Toeic.css";
import "./loading.css";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TokenService from "../../utils/tokenService";
import { Tabs, Tab } from "react-bootstrap";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Pagination } from "../../components/Result";
function ToeicTest() {

  const [imageError, setImageError] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleImageError = () => {
    setImageError(true);
  };
  
  // component rerender by the  time
  const location = useLocation();
  const state = useRef(location.state);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;
  /*   test data  table  time part question */
  const [value, setValue] = useState(0);
  /* navigate things */
  const history = useNavigate();
  //  time and minute countdown
  const [seconds, setSecond] = useState(0);
  const [minutes, setMinute] = useState(state.current.time);
  const keyAnswer = useRef([]);
  const lists = useRef([]);
  const [showBook, setShowBook] = useState(true);
  const calculatePageNumber = (questionIndex) => {
    console.log(questionIndex);
    console.log( Math.floor(questionIndex / questionsPerPage));
    console.log( Math.ceil(questionIndex / questionsPerPage));
    return Math.ceil(questionIndex / questionsPerPage);
  };

   const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = state.current.questions
    .flat()
    .slice(indexOfFirstQuestion, indexOfLastQuestion);
    const totalPages = Math.ceil(state.current.numberQuestion / questionsPerPage);
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBook(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    var number = 0;
    state.current.parts.forEach((value, index) => {
      if (index === 0) {
        lists.current.push(takeSpan(1, value.numberQuestion));
      } else {
        number =
          lists.current[index - 1][lists.current[index - 1].length - 1].props
            .children + value.numberQuestion;
        console.log(number);
        console.log(state.current.questions);
        console.log(state.current.questions.length);
        lists.current.push(takeSpan(number - value.numberQuestion + 1, number));
      }
    });

    console.log(state.current.parts);
    const sum = state.current.parts.reduce((total, part) => total + part.numberQuestion, 0);
    console.log(sum);
  }, [state]);

  // update time and minute
  useEffect(() => {
    const time = setTimeout(() => {
      if (minutes === 0 && seconds === 0) {
        clearTimeout(time);
        handleSubmit();
      }

      if (seconds === 0) {
        setSecond(59);
        setMinute(minutes - 1);
      } else setSecond(seconds - 1);
    }, 1000);
  }, [seconds, state]);
  
  
  // get answer key
  useEffect(() => {
    const sum = state.current.parts.reduce((total, part) => total + part.numberQuestion, 0);
    console.log(sum);
    console.log(state.current.questions.length);
    console.log(state.current);
    for (let i = 0; i < state.current.questions.length; i++) {
      const part = state.current.questions[i]; // this an array
      part.forEach((element) => {
        if (element.types === "normal") {
          keyAnswer.current.push(element.answer);
        } else {
          const ans = element.questions;
          ans.forEach((ele) => {
            keyAnswer.current.push(ele.answer);
          });
        }
      });
    }
  }, [state]);

  // update ui in question answer box
  useEffect(() => {
    if (value !== 0) {
      const s = "1".concat(value);
      var element = document.getElementById(s);

      element.className = "finish";
      console.log(s);
    }
  }, [value]);

  const handleExit = () => {
    history("/");
  };

  
  const handleSubmit = useCallback(() => {
    const userChoice = Object.values(selectedAnswers).map((answer) => answer[0]);
    
    const key = getKeyArray(userChoice, keyAnswer.current);
    console.log(userChoice);
    axios
      .post("https://ezlish-server.onrender.com/api/results/" + state.current._id, {
        user: TokenService.getuserInfo()._id,
        answer: userChoice,
        time: getFinishTime(minutes, seconds, state.current.time),
        correct: key,
      })
      .then(
        (response) => {
          console.log(response);
          history(`/result/${response.data.result._id}`, {
            state: { resultId: response.data.result._id },
          }); //pass resultId to result page
        },
        (error) => {
          console.log(error);
        }
      );
  },[minutes, seconds, state]);
  if(showBook){
    return (
      <div class="book">
        <div class="book__pg-shadow"></div>
        <div class="book__pg"></div>
        <div class="book__pg book__pg--2"></div>
        <div class="book__pg book__pg--3"></div>
        <div class="book__pg book__pg--4"></div>
        <div class="book__pg book__pg--5"></div>
      </div>
    )
   }


   function takeSpan(i, j) {
    const list = [];
    for (let s = i; s <= j; s++) {
      (() => {
        const text = "#section".concat(s);
        const id = "1".concat(s);
        list.push(
          <a
            className="not"
            id={id}
            href={text}
            value={s}
            onClick={() => paginate(calculatePageNumber(s))}
          >
            {s}
          </a>
        );
      })();
    }
    return list;
  }
  
  
  function getKeyArray(userChoice, answerKey) {
    const correct = [];
    for (let i = 0; i < answerKey.length; i++) {
      if (answerKey[i] === userChoice[i]) {
        correct.push(1);
      } else if (userChoice[i] === "") {
        correct.push(-1);
      } else correct.push(0);
    }
    return correct;
  }
  
  function getFinishTime(minutes, seconds, testTime) {
    if (seconds === 0) {
      return testTime - minutes + ":00";
    } else {
      return testTime - 1 - minutes + ":" + (60 - seconds);
    }
  }

  return (
    <section id="toeic-test">
      <div className="time-bar">
        <h1>
          {state.current.name} Test {state.current.test}
        </h1>
       
        <button className="btn btn-outline-primary" style={{ color: '#1eb2a6', borderColor: '#1eb2a6' }} onClick={handleExit}>Exit</button>
      </div>
   
      <div className="container1">
        <div className="question-context1">
        <div className="audio-context1">
         <div className="item1">
         <audio controls>
            <source
              src={state.current.audio}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
            
          </audio>
          </div>
          <div className="item2">
          <div className="page-buttons">
                    <button className="btn btn-lg" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <MdNavigateBefore />
                    </button>
                    <button className="btn btn-lg" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <MdNavigateNext />
                    </button>
                  </div>
                  </div>
</div>
          {currentQuestions.map((ques) => (
            <>
             
                    <div id="question-wrapper">
                      <div id={"section".concat(ques.question)}
                      >
                        {ques.upload && <img src={ques.upload} />}
                        <br></br>
                        <span id="light">{ques.question}</span>{" "}
                        
                        <em>{ques.content}</em>
                        
                        <br></br>
                        <p>
                          {Array.from(ques.options).map((opt) => (
                            <>
                              <input
                                className="selection"
                                type="radio"
                                id={opt
                                  .concat(ques.upload)
                                  .concat(ques.question)}
                                //option
                                name={ques.question}
                                value={opt}
                                checked={selectedAnswers[ques._id] === opt}
                                onClick={(e) => {
                                  setValue(e.target.name);
                                  setSelectedAnswers((prevSelectedAnswers) => ({
                                    ...prevSelectedAnswers,
                                    [ques._id]: e.target.value,
                                  }));
                                }}
                              />
                              <span>
                                <label
                                  htmlFor={opt
                                    .concat(ques.upload)
                                    .concat(ques.question)}
                                >
                                  {" "}
                                  {opt}{" "}
                                </label>
                              </span>
                              <br></br>
                            </>
                          ))}
                        </p>
                      </div>
                    </div>
              </>
            ))
                                  }
                                  <div className="page-buttons">
                    <button className="btn btn-lg" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <MdNavigateBefore />
                    </button>
                    <button className="btn btn-lg" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <MdNavigateNext />
                    </button>
                  </div>
        </div>

        <div className="question-bar">
          <div className="time">
            <h2>Time Remaining</h2>
            <h2>
              {minutes < 10 ? "0" + minutes : minutes} :{" "}
              {seconds < 10 ? "0" + seconds : seconds}
            </h2>

            {state.current.parts.map((part, index) => (
              <>
                <div className="part">
                  <h2>Part {part.part}</h2>
                  <div id="question-wrap" >{lists.current[index]}</div>
                </div>
              </>
            ))}
          </div>

          <button id="turn-in" type="submit" onClick={handleSubmit}>
            Submit{" "}
          </button>
        </div>
      </div>
    </section>
  );
}


export default ToeicTest;