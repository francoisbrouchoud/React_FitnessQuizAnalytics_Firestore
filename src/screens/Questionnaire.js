import { Link } from "react-router-dom";
import SurveyPartA from "../components/SurveyPartA";
//import SurveyPartB from "../components/SurveyPartB";
import SurveyPartB from "../components/SurveyPartB_fromDB";
import React, {useEffect, useState} from "react";

export default function Questionnaire() {
    const [results, setResults] = useState(null);
    useEffect(() => {console.log("new Results",  results)}, [results]);

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
