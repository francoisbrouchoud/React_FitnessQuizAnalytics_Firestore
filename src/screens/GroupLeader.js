import React, {useEffect, useState} from "react";
import DisplayResults from "../components/DisplayResults";
import {ManagesResultsGL,GetResultsFromUserAndDate} from "../components/GetResults";

export default function GroupLeader() {

    const [sourceElement, setSourceElement] = useState();

    useEffect(() => {
        setSourceElement("GROUPLEADER")
    },[])

    return (
        <div>
            <h1>GroupLeader</h1>
            <DisplayResults query1={ManagesResultsGL}
                            query2={GetResultsFromUserAndDate}
                            sourceElem={sourceElement}/>
        </div>
    )
}