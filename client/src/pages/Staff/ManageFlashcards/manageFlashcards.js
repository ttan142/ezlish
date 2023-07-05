
import React, { useState, useEffect, useRef } from 'react';
// import FlashcardList from '../../../components/Flashcard/FlashcardList';
// import '../../FlashCard/Flashcard.css'
import axios from 'axios'
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function FlashCards() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState([])
  const [question, setQuestion] = useState([])
  const [answer, setAnswer] = useState([])
  const categoryEl = useRef()
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
      .get('http://localhost:5000/api/flashcard/category')
      .then(res => {
        setCategories(res.data)
      })
  }, [])

  
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    .get('http://localhost:5000/api/flashcard'.concat("/").concat(categoryEl.current.value), {
      params: {
        
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.map((questionItem, index) => {
          
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: decodeString(questionItem.answer)
          }
        }))
    })
  }
  //const cates = [... new Set(categories.map(category => category.category))]
  //console.log(cates)
  
  function onSubmit(e) {
    //e.preventDefault()
    const userObject = {
        category,
        question,
        answer
    };
    axios.post('http://localhost:5000/api/flashcard/add', userObject)
        .then((res) => {
          alert("Create flashcard successfully");
            console.log(res)
        }).catch((error) => {
            console.log(error)
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
                    <Link className="text-white" to={`/staff`}>
                      Staff
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Manage Flashcards
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      
      
      <div className="container h-100 my-4">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-lg-12 col-xl-11">
      <div className="card text-black" style={{ borderRadius: "25px" }}>
        <div className="card-body p-md-4">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <form onSubmit={onSubmit}>
              <h1>Create New Flahscard</h1>
                <div className="form-group mb-3">
                  <label htmlFor="category">Add Flashcard Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="question">Add Flashcard Question</label>
                  <input
                    type="text"
                    className="form-control"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="answer">Add Flashcard Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Create Flashcard</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
  
          }
          
  export default FlashCards;





