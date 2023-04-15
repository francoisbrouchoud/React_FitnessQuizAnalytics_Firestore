import { Link } from "react-router-dom";
import SurveyPartA from "../components/SurveyPartA";
import SurveyPartB from "../components/SurveyPartB";
import React from "react";
export default function Questionnaire() {
  return (
    <div>
        <SurveyPartB/>
        <SurveyPartA/>
      <p>
        <Link to="/">Go To The Home Page</Link>
      </p>
    </div>
  );
}
