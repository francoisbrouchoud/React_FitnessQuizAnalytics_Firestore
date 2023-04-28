import React, {useEffect, useState} from "react";
import DisplayResults from "../components/DisplayResults";
import {ManagesResults,GetResultsFromQuestionnaire} from "../components/GetResults";

export default function Resultats(){

    const [sourceElement, setSourceElement] = useState();

    useEffect(() => {
        setSourceElement("RESULTATS")
    },[])

    return(
        <DisplayResults query1={ManagesResults}
                        query2={GetResultsFromQuestionnaire}
                        sourceElem={sourceElement}
        />
    );

}