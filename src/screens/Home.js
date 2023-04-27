import { Link } from "react-router-dom";

import React, {useEffect, useState} from "react";
import "../App.css";
import {auth} from "../initFirebase";



export default function Home() {
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    // Set time of day greeting
    const now = new Date();
    const hours = now.getHours();
    let greeting;
    if (hours >= 0 && hours < 18) {
      greeting = "Bonjour";
    } else {
      greeting = "Bonsoir";
    }

    // Get user's name if logged in
    const user = auth.currentUser;
    if (user) {
      const firstName = user.displayName.split(" ")[0];
      greeting += ` ${firstName}`;
    }

    setTimeOfDay(greeting);
  }, []);

  return (
    <>
      <h1>{timeOfDay} !</h1>
      <div className="cards">
        <div className="card">
          <img className="headerIcons" src={require('../Pictures/ideas.png')} alt="Quiz icon"/>
          <Link to="/questionnaire">
            <button className="primary-button">Faire le quiz</button>
          </Link>
        </div>
        <div className="card">
          <img className="headerIcons" src={require('../Pictures/research.png')} alt="Result icon"/>
          <Link to="/resultats">
            <button className="primary-button">Voir mes résultats</button>
          </Link>
        </div>
        <div className="card">
          <img className="headerIcons" src={require('../Pictures/calculatrice.png')} alt="calculator icon"/>
          <Link to="/calculateur-imc">
            <button className="primary-button">Calculer mon IMC</button>
          </Link>
        </div>
      </div>
    </>
  );
}
