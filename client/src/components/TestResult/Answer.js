import React,{useEffect,useState} from 'react'
import axios from 'axios';
import "./Answer.css"
function Answer({resultId}) {
    const [keyAnswer,setKey]= useState([])
    const [userAnswer, setUserAns] = useState([]);
    const [correct, setCorrect] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/results/answer/".concat(resultId))
        .then(
          (response) => {
            console.log(response.data.keyAnswer);
            setKey(response.data.keyAnswer);
            console.log(response.data.result[0].answer);
            setUserAns(response.data.result[0].answer);
            console.log(response.data.result[0].correct);
            setCorrect(response.data.result[0].correct);
          },
          (error) => {
            console.log(error);
          }
        );
    }, []);
  return (
    <div className="content">
      
        <h1>Your Answer</h1>
        <div className="answer">
          {userAnswer &&
            userAnswer.map((ans, index) => (
              <>
              <div className="answer-item">
                <h1 id="light">{index + 1}</h1>
                {ans ? <span>{ans}</span> : <span>You skip this question</span>}
                {correct[index] === 0 && (
                  <i id="wrong" class="fa fa-times" aria-hidden="true"></i>
                )}

                {correct[index] === -1 && (
                  <i class="fa fa-minus-circle" aria-hidden="true"></i>
                )}

                {correct[index] === 1 && (
                  <i id="correct" class="fa fa-check" aria-hidden="true"></i>
                )}
                {<p>Correct  Answer : {keyAnswer[index]}</p>}
                </div>
              </>
            ))}
        </div>
      </div>
  
  );
}

export default Answer