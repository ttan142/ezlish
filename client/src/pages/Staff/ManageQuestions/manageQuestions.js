import React, {useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateQuestionForm1 = () => {
    const [showToast, setShowToast] = useState(false);
  const [testNames, setTestNames] = useState([]);
  const [answer, setAnswer] = useState("");
  const [content, setContent] = useState("");
  const [explain, setExplain] = useState("");
  const [options, setOptions] = useState([]);
  const [part, setPart] = useState(0);
  const [question, setQuestion] = useState(0);
  const [upload, setUpload] = useState("");
  const [types, setTypes] = useState("normal");
  const [testID, setTestID] = useState(""); // Add the test state
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userInfo.isStaff ) {
      if(!userInfo.isAdmin){
      navigate("/");}
      }
  }, [userInfo, navigate]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/test')
      .then(res => {
        const testNames1 = res.data.map((test) => ({
          value: test._id,
          label: test.name,
        }));
        setTestNames(testNames1)
      })
  }, [])
  

  const handleTestChange = (event) => {
    setTestID(event.target.value);
    console.log(testID);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the question object
    const newQuestion = {
      answer,
      content,
      explain,
      options,
      part,
      question,
      upload,
      types,
      test: testID,
    };
    console.log(newQuestion);
    // try {
    //   const res1 = await axios.put("/api/test/test/626cd179b024a4e8b813721dv");
    //   console.log(res1.data);
    // } catch (error) {
    //   console.error(error);
    //   console.log(error);
    // }
    try {
      
      // Send a POST request to the server to create the question
      const res = await axios.post("/api/questions", newQuestion);
      
      console.log(res.data); // Log the response from the server
      setShowToast(true);
      // Reset the form fields
      setAnswer("");
      setContent("");
      setExplain("");
      setOptions([]);
      setPart(0);
      setQuestion(0);
      setUpload("");
      setTypes("normal");
      
      window.location.reload();
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container h-100 my-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-4">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                    <h1>Create New Question</h1>
                      <div className="form-group mb-4">
                        <label htmlFor="test" className="form-label">Select Test:</label>
                        <select id="test" className="form-control" value={testID} onChange={handleTestChange}>
                          <option value="">Select a test</option>
                          {testNames.map((testName) => (
                            <option value={testName.value} key={testName.value}>
                              {testName.label}
                            </option>
                          ))}
                        </select>
        </div>
        <div className="mb-3">
          <label htmlFor="answer" className="form-label">
            Answer
          </label>
          <input
            type="text"
            className="form-control"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            type="text"
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="explain" className="form-label">
            Explain
          </label>
          <input
            type="text"
            className="form-control"
            id="explain"
            value={explain}
            onChange={(e) => setExplain(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="options" className="form-label">
            Options
          </label>
          <textarea
            className="form-control"
            id="options"
            value={options.join("\n")}
            onChange={(e) => setOptions(e.target.value.split("\n"))}
            rows={4}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="part" className="form-label">
            Part
          </label>
          <input
            type="number"
            className="form-control"
            id="part"
            value={part}
            onChange={(e) => setPart(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="question" className="form-label">
            Question
          </label>
          <input
            type="number"
            className="form-control"
            id="question"
            value={question}
            onChange={(e) => setQuestion(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="upload" className="form-label">
            Upload
          </label>
          <input
            type="text"
            className="form-control"
            id="upload"
            value={upload}
            onChange={(e) => setUpload(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="types" className="form-label">
            Types
          </label>
          <input
            type="text"
            className="form-control"
            id="types"
            value={types}
            onChange={(e) => setTypes(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Question
        </button>
        </form>
         {/* Toast notification */}
      {showToast && (
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1 }}
        >
          <div className="toast-header">
            <strong className="mr-auto">Question Created </strong>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body" style={{backgroundColor: '#e6e6e6'}}>
            Question created successfully!
          </div>
        </div>
      )}
                  </div>
                  {/* Image */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CreateQuestionForm1;
