import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
function DetailResult() {
   const { resultId } = useParams();
   const [answer,setAnswer]= useState([])
   const [yourA,setYourA]=useState([])
    const [correct, setCorrect] = useState([]);
   const [loading,setLoading]=useState(true);
   console.log(resultId);
  useEffect(() => {
    setLoading(true);
     axios
       .get(`http://localhost:5000/api/results/answer/details/${resultId}`
    
       )
       .then(
         (response) => {
           console.log(response)
           setCorrect(response.data.result[0].correct);
           setAnswer(response.data.answer);
           setYourA(response.data.result[0].answer);
            // setCorrect(response.data[0].correct);
         },
         (error) => {
           console.log(error);
         }
       );
       setLoading(false);
  }, []);

     if (loading) {
       return (
        
           <h2>Loading..</h2>
         
       );
     }
    

  
  return (
    <section>
      {answer &&
        answer.map((item) =>
          item.map((ques) => (
            <>
              {ques.types === "group" ? (
                <>
                  <div id="question-wrapper">
                    Part {ques.part}
                    <p>{ques.content}</p>
                    <p>
                      <img src={ques.upload} alt="img" />
                    </p>
                    {ques.questions.map((q) => (
                      <>
                        <div id={"section".concat(q.question)}>
                          <p>
                            <span id="light">{q.question}</span>{" "}
                            {q.content && <em>{q.content}</em>}
                            <p>
                              {" "}
                              Your choice:{" "}
                              {correct[q.question] === -1 ? (
                                <span>You skip this question</span>
                              ) : (
                                <span>{yourA[q.question]}</span>
                              )}
                              {correct[q.question] === 0 && (
                                <i
                                  id="wrong"
                                  class="fa fa-times"
                                  aria-hidden="true"
                                ></i>
                              )}
                              {correct[q.question] === -1 && (
                                <i
                                  class="fa fa-minus-circle"
                                  aria-hidden="true"
                                ></i>
                              )}
                              {correct[q.question] === 1 && (
                                <i
                                  id="correct"
                                  class="fa fa-check"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </p>
                            <p> {q.answer}</p>
                            <p>Explain : {q.explain}</p>
                          </p>

                          {q.option.map((op) => (
                            <>
                              <input
                                type="radio"
                                id={op.concat(ques.upload).concat(q.question)}
                                value={op} //option
                                name={q.question}
                                disabled="true"
                              />
                              <span>
                                <label
                                  htmlFor={op
                                    .concat(ques.upload)
                                    .concat(q.question)}
                                >
                                  {" "}
                                  {op}{" "}
                                </label>
                              </span>
                              <br></br>
                            </>
                          ))}
                        </div>
                      </>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div id="question-wrapper">
                    <div id={"section".concat(ques.question)}>
                      {ques.upload && <img src={ques.upload} alt="img" />}
                      <br></br>
                      <span id="light">{ques.question}</span>{" "}
                      <p>
                        {" "}
                        Your choice:{" "}
                        {correct[ques.question] === -1 ? (
                          <span>You skip this question</span>
                        ) : (
                          <span>{yourA[ques.question]}</span>
                        )}
                        {correct[ques.question] === 0 && (
                          <i
                            id="wrong"
                            class="fa fa-times"
                            aria-hidden="true"
                          ></i>
                        )}
                        {correct[ques.question] === -1 && (
                          <i class="fa fa-minus-circle" aria-hidden="true"></i>
                        )}
                        {correct[ques.question] === 1 && (
                          <i
                            id="correct"
                            class="fa fa-check"
                            aria-hidden="true"
                          ></i>
                        )}
                      </p>
                      <p>Correct: {ques.answer}</p>
                      <em>{ques.content}</em>
                      <p>Explain : {ques.explain}</p>
                      Part {ques.part}
                      <br></br>
                      <p>
                        {Array.from(ques.options).map((opt) => (
                          <>
                            <input
                              className="selection"
                              type="radio"
                              id={opt.concat(ques.upload).concat(ques.question)}
                              //option
                              name={ques.question}
                              value={opt}
                              disabled="true"
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
              )}
            </>
          ))
        )}
    </section>
  );
}

export default DetailResult