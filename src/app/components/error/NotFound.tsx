import React from "react";
import { useHistory } from "react-router-dom";
import explosionImg from "../../../assets/explosion.png"


const NotFound = () => {
  const history = useHistory();

  return (
    <div className="notfound_page p-5 text-warning d-flex flex-column justify-content-center align-items-center">
      <h2>Oups! Not found page!!</h2>
      <img className="w-25 my-5" src={explosionImg} alt="explosion"/>
      <button className="btn btn-primary btn-lg" onClick={() => history.push("/")}>
        Go back
      </button>
    </div>
  );
};

export default NotFound