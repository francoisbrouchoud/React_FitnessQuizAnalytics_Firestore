import { Link } from "react-router-dom";
import SurveyPartA from "../components/SurveyPartA";
//import SurveyPartB from "../components/SurveyPartB";
import SurveyPartB from "../components/SurveyPartB_fromDB";
import React from "react";

export default function Questionnaire() {
  return (
    <div>
        //TODO Afficher dabord questionnaire, si questionnaire A ok, afficher questionnaire B
        <SurveyPartB/>
        <SurveyPartA/>
      <p>
        <Link to="/">Go To The Home Page</Link>
      </p>
    </div>
  );
}
