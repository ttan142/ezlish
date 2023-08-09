import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "../../components/Flashcard/FlashcardList";
import "./Flashcard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Flashcard from "../../components/Flashcard/Flashcard";

function FlashCards() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const categoryEl = useRef();

  useEffect(() => {
    axios
      .get("https://ezlish-server.onrender.com/api/flashcard/category")
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .post("https://ezlish-server.onrender.com/api/flashcard", {
        category: "bird",
        question: "Bird",
        answer: "chim",
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        "https://ezlish-server.onrender.com/api/flashcard"
          .concat("/")
          .concat(categoryEl.current.value),
        {
          params: {
            category: categoryEl.current.value,
          },
        }
      )
      .then((res) => {
        setFlashcards(
          res.data.map((questionItem, index) => {
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: decodeString(questionItem.answer),
            };
          })
        );
      });
  }

  function onSubmit(e) {
    //e.preventDefault()
    const userObject = {
      category,
      question,
      answer,
    };
    axios
      .post("https://ezlish-server.onrender.com/api/flashcard/add", userObject)
      .then((res) => {
        alert("Create flashcard successfully");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Flash Card
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
                    Flash Card
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="rowflashcards mb-4">
        <div className="col-lg-4 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="category" className="font-size-26" id="cat">
                Category
              </label>
              <select id="category" ref={categoryEl} className="form-control">
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary mt-3">
                Generate Flashcard
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-8">
          <div className="flashcard-container">
            <FlashcardList flashcards={flashcards} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FlashCards;
