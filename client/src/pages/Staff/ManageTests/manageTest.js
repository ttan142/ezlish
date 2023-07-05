import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateTestForm = () => {
  const [name, setName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [tag, setTag] = useState('');
  const [part, setPart] = useState(0);
  const [time, setTime] = useState(0);
  const [numberQuestion, setNumberQuestion] = useState(0);
  const [audio, setAudio] = useState('');
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userInfo.isStaff ) {
      if(!userInfo.isAdmin){
      navigate("/");}
      }
  }, [userInfo, navigate]);



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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the test object
    const newTest = {
      name,
      
      tag,
      part,
      time,
      numberQuestion,
      audio,
    };

    try {
      // Send a POST request to the server to create the test
      console.log(newTest);
      setShowToast(true);
      const res = await axios.post('/api/test', newTest);
     
      console.log(res.data); // Log the response from the server
      
      // Reset the form fields
      setName('');
      
      setTag('');
      setPart(0);
      setTime(0);
      setNumberQuestion(0);
      setAudio('');
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    {showForm ? (<div className="container h-100 my-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-4">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
      <h1>Create Test</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="number"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numberQuestion" className="form-label">
            Number of Questions
          </label>
          <input
            type="number"
            className="form-control"
            id="numberQuestion"
            value={numberQuestion}
            onChange={(e) => setNumberQuestion(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="audio" className="form-label">
            Audio
          </label>
          <input
            type="text"
            className="form-control"
            id="audio"
            value={audio}
            onChange={(e) => setAudio(e.target.value)}
          />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
  
    <button type="submit" className="btn btn-primary btn-floating mr-3">
      Create
    </button>
    
  
    <button className="btn btn-primary btn-floating mx-4" onClick={() => setShowForm(false)}>
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
          style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
        >
          <div className="toast-header">
            <strong className="mr-auto">Test {name} Created</strong>
            
          </div>
          <div className="toast-body" style={{backgroundColor: '#e6e6e6'}}>
            Test created successfully!
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>) : (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Create Test
        </button>
      )}
      </div>
  );
};

export default CreateTestForm;
