import firebaseApp, {db} from "../initFirebase";
import {collection, getDocs} from 'firebase/firestore';
import { Link } from "react-router-dom";
import {useState} from "react";
import GetQuestions from "../components/GetQuestions";
import InitQuestionsPart2 from "../components/InitQuestionsPart2";
import InitQuestionsPartA from "../components/InitQuestionsPartA";
import React from "react";
import "../App.css";
import InitMessagesPartA from "../components/InitMessagesPartA";
import { AppHeader } from "./AppHeader";


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

      {/* SEED DB */}
      <InitQuestionsPartA/>
      <InitQuestionsPart2/>
      <InitMessagesPartA/>
    </>
  );
}
