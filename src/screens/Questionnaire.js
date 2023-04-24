import {Link, useNavigate} from "react-router-dom";
import SurveyPartA from "../components/SurveyPartA";
//import SurveyPartB from "../components/SurveyPartB";
import SurveyPartB from "../components/SurveyPartB_fromDB";
import React, {useEffect, useState} from "react";
import SetResultsToFirebase from "../components/SetResultsToFirebase";
import {AppHeader} from "./AppHeader";
import SurveyPartC from "../components/SurveyPartC";

export default function Questionnaire() {
    const [resultsA, setResultsA] = useState(null);
    const [resultsB, setResultsB] = useState(null);
    const [resultsC, setResultsC] = useState(null);
    const [displaySurveyA, setDisplaySurveyA] = useState(true);
    const [displaySurveyB, setDisplaySurveyB] = useState(false);
    const [displaySurveyC, setDisplaySurveyC] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        console.log("resultat Provisoire A", resultsA);
        if(resultsA != null && resultsB != null && resultsC != null){
            console.log("new Results A, B",  resultsA, resultsB, resultsC)
            // 1 afficher le contenu de la variable
            // 2 concatener les resultats a et b
            // 3 push le resultats sur la firebase evt. avoir deux resultats
            SetResultsToFirebase(resultsA, resultsB, resultsC);
            // 4 renitialiser les resultat
            // 5 Changer la page
            navigate('/');
        }
    }, [resultsA, resultsB, resultsC]);

    const handleCompleteA = () => {
        setDisplaySurveyA(false);
        setDisplaySurveyB(true);
        setDisplaySurveyC(false);
    };

    const handleCompleteB = () => {
        setDisplaySurveyA(false);
        setDisplaySurveyB(false);
        setDisplaySurveyC(true);
    };

    //TODO Afficher dabord questionnaire, si questionnaire A ok, afficher questionnaire B
      return (
        <>
            {displaySurveyA && <SurveyPartA setResults={setResultsA} onComplete={handleCompleteA} />}
            {displaySurveyB && <SurveyPartB setResults={setResultsB} onComplete={handleCompleteB} />}
            {displaySurveyC && <SurveyPartC setResults={setResultsC} />}

            <p>
                <Link to="/">Go To The Home Page</Link>
            </p>
        </>
      );
}
