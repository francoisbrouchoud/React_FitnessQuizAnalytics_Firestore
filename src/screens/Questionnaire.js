import {Link, useNavigate} from "react-router-dom";
import SurveyPartA from "../components/SurveyPartA";
//import SurveyPartB from "../components/SurveyPartB";
import SurveyPartB from "../components/SurveyPartB_fromDB";
import React, {useEffect, useState} from "react";
import SetResultsToFirebase from "../components/SetResultsToFirebase";

export default function Questionnaire() {
    const [results, setResults] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        if(results != null){
            console.log("new Results",  results)
            // 1 afficher le contenu de la variable
            // 2 concatener les resultats a et b
            // 3 push le resultats sur la firebase
            SetResultsToFirebase(results);
            // 4 renitialiser les resultat
            // 5 Changer la page
            navigate('/');
        }
    }, [results]);

    //TODO Afficher dabord questionnaire, si questionnaire A ok, afficher questionnaire B
      return (
        <div>
            <SurveyPartB setResults={setResults}/>
            <SurveyPartA/>
          <p>
            <Link to="/">Go To The Home Page</Link>
          </p>
        </div>
      );
}
