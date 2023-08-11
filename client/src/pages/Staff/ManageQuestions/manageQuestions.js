import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
const CreateQuestionForm1 = () => {
  const [showForm, setShowForm] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
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
  const [testID, setTestID] = useState("");
  const [testID1, setTestID1] = useState(""); // Add the test state
  const [testsEdit, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectedTest, setSelectedTest] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [questionsPerPage, setQuestionsPerPage] = useState(10);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    answer: "",
    content: "",
    explain: "",
    options: [],
    part: "",
    question: "",
    upload: "",
  });
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();

  //edit test
  const handleTestChange1 = async (event) => {
    const selectedTestID = event.target.value;
    setTestID1(selectedTestID);
    console.log(selectedTestID);
    console.log(testNames);

    try {
      const response = await axios.get(
        `https://ezlish-server.onrender.com/api/questions/${selectedTestID}`
      );
      const questionData = response.data.answer.flat();
      console.log(questionData);
      console.log(response.data);
      setQuestions(questionData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://ezlish-server.onrender.com/api/questions/${testID1}`
      );
      const questionData = response.data.answer.flat();
      console.log(questionData);
      console.log(response.data);
      setQuestions(questionData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleColumnSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortConfig.key && sortConfig.direction) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const currentQuestions = sortedQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setUpdatedInfo({
      content: question.content,
      answer: question.answer,
      options: question.options,
      explain: question.explain,
      part: question.part,
      question: question.question,
      upload: question.upload,
    });
  };

  const handleInputChange = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const updateQuestion = () => {
    const questionId = selectedQuestion._id;

    if (!questionId) {
      // No question selected, handle the error
      return;
    }

    axios
      .put(
        `https://ezlish-server.onrender.com/api/questions/${questionId}`,
        updatedInfo
      )
      .then((response) => {
        // Handle the response if the update is successful
        console.log("Question updated:", response.data);
        fetchQuestions(); // Refetch the question data to reflect the changes
        setSelectedQuestion(null); // Clear the selected question
      })
      .catch((error) => {
        // Handle errors if the update fails
      });
  };

  const deleteQuestion = () => {
    const questionId = selectedQuestion._id;

    if (!questionId) {
      // No question selected, handle the error
      return;
    }

    axios
      .delete(`https://ezlish-server.onrender.com/api/questions/${questionId}`)
      .then((response) => {
        // Handle the response if the delete is successful
        console.log("Question deleted:", response.data);
        fetchQuestions(); // Refetch the question data to reflect the changes
        setSelectedQuestion(null); // Clear the selected question
      })
      .catch((error) => {
        // Handle errors if the delete fails
      });
  };

  //edit question

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showToast]);

  useEffect(() => {
    if (!userInfo.isStaff) {
      if (!userInfo.isAdmin) {
        navigate("/");
      }
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    axios.get("https://ezlish-server.onrender.com/api/test").then((res) => {
      const testNames1 = res.data.map((test) => ({
        value: test._id,
        label: test.name,
      }));
      setTestNames(testNames1);
    });
  }, []);

  const handleTestChange = (event) => {
    setTestID(event.target.value);
    console.log(testID);
    console.log(testNames);
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

    try {
      // Send a POST request to the server to create the question
      const res = await axios.post(
        "https://ezlish-server.onrender.com/api/questions",
        newQuestion
      );

      console.log(res.data); // Log the response from the server
      setShowToast(true);
      fetchQuestions();
      // Reset the form fields
      setAnswer("");
      setContent("");
      setExplain("");
      setOptions([]);
      setPart(0);
      setQuestion(0);
      setUpload("");
      setTypes("normal");

      //window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container h-100 my-4">
      {showForm && (
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-4">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <h1>Create New Question</h1>
                      <div className="form-group mb-4">
                        <label htmlFor="test" className="form-label">
                          Select Test:
                        </label>
                        <select
                          id="test"
                          className="form-control"
                          value={testID}
                          onChange={handleTestChange}
                        >
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
                          onChange={(e) =>
                            setOptions(e.target.value.split("\n"))
                          }
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
                      <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                        <button
                          type="submit"
                          className="btn btn-outline-primary btn-floating mr-3"
                        >
                          Create
                        </button>

                        <button
                          className="btn btn-outline-primary btn-floating mx-4"
                          onClick={() => setShowForm(false)}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                    {/* Toast notification */}
                    {showToast && (
                      <div
                        className="toast show"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        style={{
                          position: "fixed",
                          top: "14vh",
                          right: "20px",
                          zIndex: 1,
                        }}
                      >
                        <div className="toast-header">
                          <strong className="mr-auto">Question Created </strong>
                        </div>
                        <div
                          className="toast-body"
                          style={{ backgroundColor: "#e6e6e6" }}
                        >
                          Question created for test successfully!
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
      )}
      {!showForm && (
        <div className=" justify-content-center align-items-center text-center h-100 mt-3 mb-3 pb-3 ">
          <button
            className="btn btn-outline-primary w-25"
            onClick={() => {
              setShowForm(true);
              setShowForm1(false);
            }}
          >
            Create question
          </button>
        </div>
      )}
      {showForm1 && (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card" style={{ borderRadius: "25px" }}>
                  <div className="card-body">
                    <div className="form-group mb-4">
                      <label htmlFor="test" className="form-label">
                        Select Test:
                      </label>
                      <select
                        id="test"
                        className="form-control"
                        value={testID1}
                        onChange={handleTestChange1}
                      >
                        <option value="">Select a test</option>
                        {testNames.map((testName) => (
                          <option value={testName.value} key={testName.value}>
                            {testName.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h4 className="card-title">Questions List</h4>
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        style={{ tableLayout: "fixed" }}
                      >
                        <thead>
                          <tr>
                            <th
                              className="text-center"
                              style={{ width: "5vw" }}
                              onClick={() => handleColumnSort("question")}
                            >
                              #
                            </th>
                            <th
                              onClick={() => handleColumnSort("content")}
                              style={{ width: "35vw" }}
                              className={
                                sortConfig.key === "content"
                                  ? `sorted-${sortConfig.direction}`
                                  : ""
                              }
                            >
                              Content
                            </th>
                            <th
                              onClick={() => handleColumnSort("answer")}
                              style={{ width: "6vw", textAlign: "center" }}
                              className={
                                sortConfig.key === "answer"
                                  ? `sorted-${sortConfig.direction}`
                                  : ""
                              }
                            >
                              Answer
                            </th>
                            <th
                              onClick={() => handleColumnSort("part")}
                              style={{ width: "5vw", textAlign: "center" }}
                              className={
                                sortConfig.key === "part"
                                  ? `sorted-${sortConfig.direction}`
                                  : ""
                              }
                            >
                              Part
                            </th>
                            <th
                              onClick={() => handleColumnSort("options")}
                              style={{ width: "15vw" }}
                              className={
                                sortConfig.key === "options"
                                  ? `sorted-${sortConfig.direction}`
                                  : ""
                              }
                            >
                              Options
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentQuestions.map((question, index) => (
                            <tr
                              key={index + 1 + indexOfFirstQuestion}
                              className={
                                selectedQuestion &&
                                selectedQuestion._id === question._id
                                  ? "selected"
                                  : ""
                              }
                              onClick={() => handleQuestionClick(question)}
                            >
                              <td className="text-center">
                                {question.question}
                              </td>
                              <td>{question.content}</td>
                              <td className="text-center">{question.answer}</td>
                              <td className="text-center">{question.part}</td>
                              <td>{question.options.join("\r\n")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {selectedQuestion && (
                      <div>
                        <h4>Edit Question</h4>
                        <form>
                          <div className="form-group">
                            <label htmlFor="answer">Answer:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="answer"
                              name="answer"
                              value={updatedInfo.answer}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="content"
                              name="content"
                              value={updatedInfo.content}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="explain">Explain:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="explain"
                              name="explain"
                              value={updatedInfo.explain}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="options">Options:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="options"
                              name="options"
                              value={updatedInfo.options.join(", ")}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="part">Part:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="part"
                              name="part"
                              value={updatedInfo.part}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="question">#question:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="question"
                              name="question"
                              value={updatedInfo.question}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="upload">Upload:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="upload"
                              name="upload"
                              value={updatedInfo.upload}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="pt-4">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={updateQuestion}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={deleteQuestion}
                            >
                              Delete
                            </button>
                            <button
                          className="btn btn-outline-primary"
                          onClick={() => setSelectedQuestion(null)}
                        >
                          Close
                        </button>
                          </div>
                        </form>
                      </div>
                    )}
                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="form-group mb-0">
                        <span>Rows per page: </span>
                        <select
                          value={questionsPerPage}
                          onChange={(e) => {
                            setCurrentPage(1);
                            setSortConfig({ key: " ", direction: " " });
                            setQuestionsPerPage(parseInt(e.target.value));
                          }}
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                        </select>
                      </div>
                      <div className="page-range">
                        {indexOfFirstQuestion + 1}-
                        {Math.min(indexOfLastQuestion, sortedQuestions.length)}{" "}
                        of {sortedQuestions.length}
                      </div>
                      <div className="page-buttons">
                        <button
                          className="btn btn-lg"
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                        >
                          <MdNavigateBefore />
                        </button>
                        <button
                          className="btn btn-lg"
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                        >
                          <MdNavigateNext />
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => setShowForm1(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {!showForm1 && (
        <div className=" justify-content-center align-items-center text-center h-100 mt-3 mb-3 pb-3 ">
          <button
            className="btn btn-outline-primary w-25"
            onClick={() => {
              setShowForm1(true);
              setShowForm(false);
            }}
          >
            Edit Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateQuestionForm1;
