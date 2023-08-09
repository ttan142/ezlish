/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import CardItem from "../../components/CardItem/CardItem";

import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = ({ user }) => {
  const [resultItem, setItem] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    console.log(user);
    if (user)
      axios
        .get(
          "https://ezlish-server.onrender.com/api/results/".concat(user._id),
          {
            params: { limit: 4 },
          }
        )
        .then(
          (response) => {
            //  response.data.result = getDate(response.data.result);
            setItem(response.data.result);
            console.log(response);
            console.log(response.data.result);
          },
          (error) => {
            console.log(error);
          }
        );
  }, [user]);

  const handleClick = () => {
    console.log("hello");
    history("/profile");
  };
  const userBalance = localStorage.getItem("userBalance");
  return (
    <div className="body1">
      <section className="home">
        <h1 className="info">Welcome {user && user.name} to EZLISH</h1>
        <h1 className="info">
          Your current balance is {user.balance}$ in EZLISH
        </h1>
      </section>

      <section>
        <div className="result">
          <h1 className="info">Test Results</h1>

          <div className="cards  px-4">
            {resultItem[0] ? (
              resultItem.map((item) => (
                <>
                  <CardItem
                    date={item.finishDate}
                    time={item.time}
                    result={item.correct}
                    score={item.score}
                    name={
                      item.testResult[0] && item.testResult[0].name
                        ? item.testResult[0].name + " Test "
                        : "Unknown Test"
                    }
                    id={item._id}
                  />
                </>
              ))
            ) : (
              <>
                <h1 style={{ color: "red" }}>You have not done any test</h1>
              </>
            )}
          </div>

          <a id="detail" onClick={handleClick}>
            See more &gt;&gt;&gt;
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
