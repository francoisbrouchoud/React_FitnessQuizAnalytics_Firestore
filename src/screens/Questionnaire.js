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
 * As soon as the result of a part is completed, move on to the next questionnaire
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
        if (resultsA !== null) {
            setDisplaySurveyA(false);
            setDisplaySurveyB(true);
        }
    }, [resultsA]);

    useEffect(() => {
        if (resultsB !== null) {
            setDisplaySurveyB(false);
            setDisplaySurveyC(true);
        }
    }, [resultsB]);

    useEffect(() => {
        if (resultsC !== null) {
            console.log("Results to set in Firebase", resultsA, resultsB, resultsC);
            SetResultsToFirebase(resultsA, resultsB, resultsC);
            navigate('/');
        }
    }, [resultsC]);


      return (
        <>
            {displaySurveyA && <SurveyPartA setResults={setResultsA} />}
            {displaySurveyB && <SurveyPartB setResults={setResultsB} />}
            {displaySurveyC && <SurveyPartC setResults={setResultsC} />}
        </>
      );
}
