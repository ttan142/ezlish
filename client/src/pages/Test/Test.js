import React, { useState, useEffect } from 'react';
import "./Test.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TokenService from "../../utils/tokenService";
import { updateBalance } from '../../actions/userAction';
import CommentCard from "../../components/comment/CommentCard";

function Test() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userLogin.userInfo);
  const state = location.state; /*   test data  table     */
  console.log(state.audio)
  const history = useNavigate();
  const [showToast, setShowToast] = useState(false);

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

  const handleTest = async () => {
    console.log(TokenService.getuserInfo()._id);
    const userId = user._id;
    const userBalance = user.balance;
    const testCost=10;
    if (userBalance < testCost) {
      console.log('Not enough balance. Toast: Not enough balance.');
      // Add additional code or show a toast message here if desired
      setShowToast(true);
      return; // Stop execution if the balance is insufficient
    }
    const response = await axios
      .put(`https://ezlish-server.onrender.com/api/users/${testCost}/${userId}`)
      .then((response) => {
        // Handle the response if the update is successful
        console.log('User updated:', response.data);
        dispatch(updateBalance(userId, response.data.balance));
      })
      .catch((error) => {
        // Handle errors if the update fails
      });
  
    const { data } = await axios.get(
      `https://ezlish-server.onrender.com/api/questions/${state._id}`
    );
    state.questions = data.answer;
    state.parts = data.array;
  
    history("/toeic", { state: state });
  };
  

  return (
    <>{showToast && (
      <div
        className="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay="2000"
        style={{ position: 'absolute', top: '12vh', right: 0, zIndex: 1 }}
      >
        <div className="toast-header">
          <strong className="mr-auto">Not enough balance!</strong>
          
        </div>
        <div className="toast-body" style={{backgroundColor: '#e6e6e6'}}>
          Unfortunaly your current balance is {user.balance}$ and it is not enough to take this test. <br></br>Please check your balance.
        </div>
      </div>
    )}
      <section>
        <div className="test">
          <div className="test-info">
            <h1>
              {state.name} Test {state.test}
            </h1>
            <div class="btn-group">
              <button id="group">Test Info</button>
              <button id="group">Transcript</button>
            </div>
            <p>
              Time: {state.time} minutes | {state.part} parts |{" "}
              {state.numberQuestion} questions
            </p>
            <div></div>

            <div class="alert alert-warning" role="alert" id="alert">
              Are you ready to do full test? You should spend {state.time} minutes doing this test.<br></br>
              Please notice each time you take a test your balance will be reduce by 10.
            </div>

            <button
              type="button"
              class="btn btn-primary"
              id="button-start"
              onClick={handleTest}
            >
              Take Test
            </button>
          </div>

          <CommentCard id={state._id} />
        </div>
      </section>
    </>
  );
}
// comment card   testId
export default Test;
