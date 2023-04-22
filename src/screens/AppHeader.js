import React from "react";
import "../App.css";
import {Link} from "react-router-dom";
import firebaseApp from "../initFirebase";

export function AppHeader() {
  const handleSignOutClick = async () => {
    await firebaseApp.auth().signOut();
  };

  return (
    <header className="appHeader">
      <Link to={"/"}>
        <button className="headerButton">
          <img src={require('../Pictures/fonctionnement.png')}/>
          <p className="appName">Fitness Check</p>
        </button>
      </Link>
      <div className="headerFlex">
        <Link to={"/profile"}>
          <button className="headerButton">
            <img src={require('../Pictures/profile-user.png')}/>
            <p>Profil</p>
          </button>
        </Link>
        <Link to={"information"}>
          <button className="headerButton">
            <img src={require('../Pictures/information.png')}/>
            <p>Info</p>
          </button>
        </Link>
        <button onClick={handleSignOutClick} className="headerButton">
          <img src={require('../Pictures/logout.png')}/>
          <p>Déconnexion</p>
        </button>
      </div>
    </header>
  );
}