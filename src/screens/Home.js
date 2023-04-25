import { Link } from "react-router-dom";
import InitQuestionsPartB from "../components/Admin/InitQuestionsPartB";
import InitQuestionsPartA from "../components/Admin/InitQuestionsPartA";
import React from "react";
import "../App.css";
import InitMessagesPartA from "../components/Admin/InitMessagesPartA";


export default function Home() {
  return (
    <>
      <div className="cards">
        <div className="card">
          <img className="headerIcons" src={require('../Pictures/ideas.png')}/>
          <Link to="/questionnaire">
            <button className="primary-button">Faire le quiz</button>
          </Link>
        </div>
        <div className="card">
          <img className="headerIcons" src={require('../Pictures/research.png')}/>
          <button className="primary-button">Voir mes résultats</button>
        </div>
      </div>

      
    </>
  );
}
