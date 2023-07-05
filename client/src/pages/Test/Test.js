import React from "react";
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

  const handleTest = async () => {
    console.log(TokenService.getuserInfo()._id);
    const userId = user._id;
    const userBalance = user.balance;
    const testCost=10;
    if (user.Balance<testCost){alert("not enough balance");
  history("/home");}
  else{
    const response = await axios
      .put(`/api/users/${testCost}/${userId}`)
      .then((response) => {
        // Handle the response if the update is successful
        console.log('User updated:', response.data);
        dispatch(updateBalance(userId, response.data.balance));
      })
      .catch((error) => {
        // Handle errors if the update fails
      });
  
    const { data } = await axios.get(
      `http://localhost:5000/api/questions/${state._id}`
    );
    state.questions = data.answer;
    state.parts = data.array;
  
    history("/toeic", { state: state });}
  };
  

  return (
    <>
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
