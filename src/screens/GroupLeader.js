import React, {useEffect, useState} from "react";
import DisplayResults from "../components/Results/DisplayResults";
import {ManagesResultsGL,GetResultsFromUserAndDate} from "../components/Results/GetResults";
/**
 * Function to display the results on the GroupLeader page
 * @returns {JSX.Element} : DisplayResults component for the GroupLeader
 * @constructor
 */
export default function GroupLeader() {

    const [sourceElement, setSourceElement] = useState();

    useEffect(() => {
        setSourceElement("GROUPLEADER")
    },[])

    //Specify the functions containing the requests to the DB for the GroupLeader
    return (
        <div>
            <h1>GroupLeader</h1>
            <DisplayResults query1={ManagesResultsGL}
                            query2={GetResultsFromUserAndDate}
                            sourceElem={sourceElement}/>
        </div>
    )
}