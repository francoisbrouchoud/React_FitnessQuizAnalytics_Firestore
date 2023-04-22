import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DisplayResults from "../components/DisplayResults";

export default function Resultats(){

    return(
        <div>
            <p>
                <Link to="/"> Go To The Home Page</Link>
            </p>
            <DisplayResults/>
        </div>
    );

}