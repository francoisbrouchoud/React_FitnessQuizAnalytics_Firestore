import React from "react";
import {Link} from "react-router-dom";

/**
 * Component that displays a 404 error page when the user tries to access a page that does not exist
 * It displays a message and a button to return to the home page
 * @returns {JSX.Element}
 * @constructor
 */
export default function NotFound() {

  return (
    <div className="error404">
      <div className="card card-title">
        <h1>Erreur 404</h1>
      </div>
      <div className="card info-card">
        <p>La page que vous recherchez n'existe pas</p>
        <img src={require('../assets/images/error404.png')}/>
          <Link to="/">
              <button className="secondary-button">Retourner à la page d'accueil</button>
          </Link>
      </div>
    </div>
  );
}