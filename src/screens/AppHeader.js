import React, {useContext} from "react";
import "../App.css";
import {Link, useNavigate} from "react-router-dom";
import firebaseApp from "../initFirebase";
import {ThemeContext} from "../ThemeContext";

export default function AppHeader() {
  const navigate = useNavigate();
  const handleSignOutClick = async () => {
    await firebaseApp.auth().signOut();

    navigate("/");
  };
  const { toggleTheme } = useContext(ThemeContext);


  return (
    <header className="appHeader">
      <Link to={"/"}>
        <button className="headerButton">
          <img src={require('../assets/images/logo.png')}/>
          <p className="appName">Fitness Check</p>
        </button>
      </Link>
      <div className="headerFlex">
        <Link to={"/profile"}>
          <button className="headerButton">
            <img src={require('../assets/images/profile-user.png')}/>
            <p>Profil</p>
          </button>
        </Link>
        <Link to={"information"}>
          <button className="headerButton">
            <img src={require('../assets/images/information.png')}/>
            <p>Info</p>
          </button>
        </Link>
        <button onClick={toggleTheme} className="headerButton">
          <img src={require('../assets/images/mode.png')}/>
          <p>Thème</p>
        </button>
        <button onClick={handleSignOutClick} className="headerButton">
          <img src={require('../assets/images/logout.png')}/>
          <p>Déconnexion</p>
        </button>
      </div>
    </header>
  );
}