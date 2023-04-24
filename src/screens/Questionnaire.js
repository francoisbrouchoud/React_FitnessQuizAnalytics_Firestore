import {Link, useNavigate} from "react-router-dom";
import SurveyPartA from "../components/SurveyPartA";
//import SurveyPartB from "../components/SurveyPartB";
import SurveyPartB from "../components/SurveyPartB_fromDB";
import React, {useEffect, useState} from "react";
import SetResultsToFirebase from "../components/SetResultsToFirebase";
import SurveyGroupChef from "../components/SurveyPartA";
import {AppHeader} from "./AppHeader";

export default function Questionnaire() {
    const [resultsA, setResultsA] = useState(null);
    const [resultsB, setResultsB] = useState(null);
    const [resultGroupChef, setResultGroupChef] = useState(null);
    const [displaySurveyA, setDisplaySurveyA] = useState(true);
    const [displaySurveyB, setDisplaySurveyB] = useState(false);
    const [displaySurveyGroupChef, setDisplaySurveyGroupChef] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        console.log("resultat Provisoire A", resultsA);
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

    const handleCompleteA = () => {
        setDisplaySurveyA(false);
        setDisplaySurveyB(true);
        setDisplaySurveyGroupChef(false);
    };

    const handleCompleteB = () => {
        setDisplaySurveyA(false);
        setDisplaySurveyB(false);
        setDisplaySurveyGroupChef(true);
    };

    //TODO Afficher dabord questionnaire, si questionnaire A ok, afficher questionnaire B
      return (
        <>
            {displaySurveyA && <SurveyPartA setResults={setResultsA} onComplete={handleCompleteA} />}
            {displaySurveyB && <SurveyPartB setResults={setResultsB} onComplete={handleCompleteB} />}
            {<SurveyGroupChef setResults={setResultGroupChef} />}

            <p>
                <Link to="/">Go To The Home Page</Link>
            </p>
        </>
      );
}
