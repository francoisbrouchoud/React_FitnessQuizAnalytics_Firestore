import React from "react";

export default function NotFound() {

  return (
    <div className="error404">
      <div className="card card-title">
        <h1>Erreur 404</h1>
      </div>
      <div className="card info-card">
        <p>La page que vous recherchez n'existe pas</p>
        <img src={require('../assets/images/error404.png')}/>
        <button className="secondary-button">Retourner à la page d'accueil</button>
      </div>
    </div>
  );
}