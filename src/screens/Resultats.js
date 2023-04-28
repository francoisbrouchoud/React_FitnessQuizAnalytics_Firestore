import React, {useEffect, useState} from "react";
import DisplayResults from "../components/Results/DisplayResults";
import {ManagesResults,GetResultsFromQuestionnaire} from "../components/Results/GetResults";

/**
 * Function to display the results on the Results page
 * @returns {JSX.Element}
 * @constructor
 */
export default function Resultats(){

    const [sourceElement, setSourceElement] = useState();

    useEffect(() => {
        setSourceElement("RESULTATS")
    },[])

    //Specify the functions containing the requests to the DB for the Results
    return(
        <DisplayResults query1={ManagesResults}
                        query2={GetResultsFromQuestionnaire}
                        sourceElem={sourceElement}
        />
    );

}