import firebaseApp from "../initFirebase";
import { Link } from "react-router-dom";
import React from "react";
import "../App.css";


export default function Home() {
  // Sign out
  const handleSignOutClick = async () => {
    await firebaseApp.auth().signOut();
  };

  return (
    <>
        <header className="AppHeader">
            <div className="HeadIconsPosition">
                <img className="headerIcons" src={require('../Pictures/fonctionnement.png')}/>
                <h1>Fitness Check</h1>
            </div>
            <div className="HeadIconsPosition">
                <img className="headerIcons" src={require('../Pictures/information.png')}/>
                <img className="headerIcons" src={require('../Pictures/deconnexion.png')}/>
                <h1>Logout</h1>
            </div>
        </header>
        <div className="ContainDoOrConsultQuizz">
            <div className="DoOrConsultQuizz">
                <Link to="/questionnaire">
                    <img className="headerIcons" src={require('../Pictures/ideas.png')}/>
                    <p className="buttonTitle">Faire le quizz</p>
                </Link>
            </div>
            <div className="DoOrConsultQuizz">
                <img className="headerIcons" src={require('../Pictures/research.png')}/>
                <p className="buttonTitle">Voir mes résultats</p>
            </div>
        </div>

        <button onClick={handleSignOutClick}>Sign Out</button>
    </>
  );
}
