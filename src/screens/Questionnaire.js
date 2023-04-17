import {Link, useNavigate} from "react-router-dom";
import SurveyPartA from "../components/SurveyPartA";
//import SurveyPartB from "../components/SurveyPartB";
import SurveyPartB from "../components/SurveyPartB_fromDB";
import React, {useEffect, useState} from "react";
import SetResultsToFirebase from "../components/SetResultsToFirebase";

export default function Questionnaire() {
    const [resultsA, setResultsA] = useState("gg");
    const [resultsB, setResultsB] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        if(resultsA != null && resultsB != null){
            console.log("new Results A, B",  resultsA, resultsB)
            // 1 afficher le contenu de la variable
            // 2 concatener les resultats a et b
            // 3 push le resultats sur la firebase evt. avoir deux resultats
            SetResultsToFirebase(resultsA, resultsB);
            // 4 renitialiser les resultat
            // 5 Changer la page
            navigate('/');
        }
    }, [resultsA, resultsB]);

    //TODO Afficher dabord questionnaire, si questionnaire A ok, afficher questionnaire B
      return (
        <div>
            <SurveyPartB setResults={setResultsB}/>
            <SurveyPartA setResults={setResultsA}/>
          <p>
            <Link to="/">Go To The Home Page</Link>
          </p>
        </div>
      );
}
