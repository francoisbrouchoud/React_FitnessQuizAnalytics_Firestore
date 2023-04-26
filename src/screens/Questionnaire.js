import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SurveyPartA from "../components/SurveyPartA";
import SurveyPartB from "../components/SurveyPartB";
import SurveyPartC from "../components/SurveyPartC";
import SetResultsToFirebase from "../components/SetResultsToFirebase";

/**
 * Component that handles the three parts of the survey
 * A : physical activity evaluation
 * B : mobility evaluation
 * C : optional entry of a group leader and send of responses
 * @returns {JSX.Element} - current survey A then B then C
 * @constructor
 */
export default function Questionnaire() {
    const [resultsA, setResultsA] = useState(null);
    const [resultsB, setResultsB] = useState(null);
    const [resultsC, setResultsC] = useState(null);
    const [displaySurveyA, setDisplaySurveyA] = useState(true);
    const [displaySurveyB, setDisplaySurveyB] = useState(false);
    const [displaySurveyC, setDisplaySurveyC] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if(resultsA != null && resultsB != null && resultsC != null){
            console.log("Results to set in Firebase",  resultsA, resultsB, resultsC)
            SetResultsToFirebase(resultsA, resultsB, resultsC);
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

      return (
        <>
            {displaySurveyA && <SurveyPartA setResults={setResultsA} onComplete={handleCompleteA} />}
            {displaySurveyB && <SurveyPartB setResults={setResultsB} onComplete={handleCompleteB} />}
            {displaySurveyC && <SurveyPartC setResults={setResultsC} />}
        </>
      );
}
