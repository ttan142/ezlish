import React from "react";
import "./CardItem.css";
import { useNavigate } from "react-router-dom";
function CardItem({ date, time, result, score, name, id }) {
  const history = useNavigate();

  const handleClick = () => {
    console.log(id);
    history(`/result/${id}`, { state: { resultId: id } });
  };
  return (
    <div className="card-item p-4">
      <h1>{name}</h1>
      <p className="carditem">
        <i class="far fa-calendar-alt"></i> Date: {date}
      </p>
      <p className="carditem">
        <i class="far fa-clock"></i> Time Finish: {time}
      </p>
      <p className="carditem">
        <i class="fa fa-list-alt"></i> Result:{result}
      </p>
      <p className="carditem">
        <i class="fas fa-flag-checkered"></i> Score:{score}
      </p>
      <button id="butt" onClick={handleClick}>
        View details
      </button>
    </div>
  );
}

export default CardItem;
