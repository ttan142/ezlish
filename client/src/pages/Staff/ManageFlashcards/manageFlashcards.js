import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const ManageFlashcards = () => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcardNames, setFlashcardNames] = useState([]);
  const [testID1, setTestID1] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flashcardsPerPage, setFlashcardsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    category: "",
    question: "",
    answer: "",
  });

  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.isStaff && !userInfo.isAdmin) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    axios
      .get("https://ezlish-server.onrender.com/api/flashcard/category")
      .then((res) => {
        const categories = res.data;
        const flashcardCategories = categories.map((category) => ({
          value: category,
          label: category,
        }));
        setFlashcardNames(flashcardCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleFlashcardChange = async (event) => {
    const selectedTestID = event.target.value;
    setTestID1(selectedTestID);

    try {
      const response = await axios.get(
        `https://ezlish-server.onrender.com/api/flashcard/${selectedTestID}`
      );
      const flahscardData = response.data;
      console.log(flahscardData);
      console.log(response.data);
      setFlashcards(flahscardData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(
        `https://ezlish-server.onrender.com/api/flashcard/${testID1}`
      );
      console.log(testID1);
      console.log(response);
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleColumnSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastFlashcard = currentPage * flashcardsPerPage;
  const indexOfFirstFlashcard = indexOfLastFlashcard - flashcardsPerPage;

  const sortedFlashcards = [...flashcards].sort((a, b) => {
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

  const currentFlashcards = sortedFlashcards.slice(
    indexOfFirstFlashcard,
    indexOfLastFlashcard
  );

  const totalPages = Math.ceil(sortedFlashcards.length / flashcardsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleFlashcardClick = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setUpdatedInfo({
      category: flashcard.category,
      question: flashcard.question,
      answer: flashcard.answer,
    });
  };

  const handleInputChange = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const updateFlashcard = (e) => {
    e.preventDefault();
    if (!selectedFlashcard) {
      return;
    }

    axios
      .put(
        `https://ezlish-server.onrender.com/api/flashcard/${selectedFlashcard._id}`,
        updatedInfo
      )
      .then((response) => {
        console.log("Flashcard updated:", response.data);
        fetchFlashcards();
        setSelectedFlashcard(null);
      })
      .catch((error) => {
        console.error("Error updating flashcard:", error);
      });
  };

  const deleteFlashcard = (e) => {
    e.preventDefault();
    if (!selectedFlashcard) {
      return;
    }

    axios
      .delete(
        `https://ezlish-server.onrender.com/api/flashcard/${selectedFlashcard._id}`
      )
      .then((response) => {
        console.log("Flashcard deleted:", response.data);
        fetchFlashcards();
        setSelectedFlashcard(null);
      })
      .catch((error) => {
        console.error("Error deleting flashcard:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFlashcard = {
      category,
      question,
      answer,
    };

    try {
      console.log(newFlashcard);
      setShowToast(true);
      const res = await axios.post(
        "https://ezlish-server.onrender.com/api/flashcard/add",
        newFlashcard
      );

      console.log(res.data);
      fetchFlashcards();
      setUpdatedInfo({
        category: "",
        question: "",
        answer: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {showForm && (
        <div className="container h-100 my-4">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-4">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <h1>Create Flashcard</h1>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">
                            Category
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="question" className="form-label">
                            Question
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                          />
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
                          data-delay="2000"
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            zIndex: 1,
                          }}
                        >
                          <div className="toast-header">
                            <strong className="mr-auto">
                              Flashcard {question} form {category} Created
                            </strong>
                          </div>
                          <div
                            className="toast-body"
                            style={{ backgroundColor: "#e6e6e6" }}
                          >
                            Flashcard created successfully!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {!showForm && (
        <div className=" justify-content-center align-items-center text-center h-100 mt-3 mb-3 pb-3 pt-3">
          <button
            className="btn btn-outline-primary w-25"
            onClick={() => {
              setShowForm1(false);
              setShowForm(true);
            }}
          >
            Create Flashcard
          </button>
        </div>
      )}
      {showForm1 && (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card" style={{ borderRadius: "25px" }}>
                  <div className="card-body">
                    <div className="form-group mb-4">
                      <label htmlFor="category" className="form-label">
                        Select Category:
                      </label>
                      <select
                        id="category"
                        className="form-control"
                        value={testID1}
                        onChange={handleFlashcardChange}
                      >
                        <option value="">All flashcards</option>
                        {flashcardNames.map((category) => (
                          <option value={category.value} key={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h4 className="card-title">Flashcards table</h4>
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
                              onClick={() => handleColumnSort("id")}
                            >
                              #
                            </th>
                            <th
                              onClick={() => handleColumnSort("Question")}
                              style={{ width: "25vw" }}
                              className={
                                sortConfig.key === "question"
                                  ? `sorted-${sortConfig.direction}`
                                  : ""
                              }
                            >
                              Question
                            </th>
                            <th
                              onClick={() => handleColumnSort("answer")}
                              className={
                                sortConfig.key === "answer"
                                  ? `sorted-${sortConfig.direction}`
                                  : ""
                              }
                            >
                              Answer
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentFlashcards.map((Flashcard, index) => (
                            <tr
                              key={index + 1 + indexOfFirstFlashcard}
                              className={
                                selectedFlashcard &&
                                selectedFlashcard._id === Flashcard._id
                                  ? "selected"
                                  : ""
                              }
                              onClick={() => handleFlashcardClick(Flashcard)}
                            >
                              <td className="text-center">
                                {index + 1 + indexOfFirstFlashcard}
                              </td>
                              <td>{Flashcard.question}</td>
                              <td>{Flashcard.answer}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {selectedFlashcard && (
                        <div>
                          <h4>Edit Flashcard</h4>
                          <form>
                            <div className="form-group">
                              <label htmlFor="name">Category:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="category"
                                name="category"
                                value={updatedInfo.category}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="tag">Question:</label>
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
                              <label htmlFor="part">Answer:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="answer"
                                name="answer"
                                value={updatedInfo.answer}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="pt-4 d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                              <button
                                className="btn btn-outline-primary"
                                onClick={updateFlashcard}
                              >
                                Update Flashcard
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={deleteFlashcard}
                              >
                                Delete Flashcard
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="form-group mb-0">
                        <span>Flashcards per page: </span>
                        <select
                          value={flashcardsPerPage}
                          onChange={(e) => {
                            setCurrentPage(1);
                            setSortConfig({ key: " ", direction: " " });
                            setFlashcardsPerPage(parseInt(e.target.value));
                          }}
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                        </select>
                      </div>
                      <div className="page-range">
                        {indexOfFirstFlashcard + 1}-
                        {Math.min(
                          indexOfLastFlashcard,
                          sortedFlashcards.length
                        )}{" "}
                        of {sortedFlashcards.length}
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
            Edit Flashcards
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageFlashcards;
