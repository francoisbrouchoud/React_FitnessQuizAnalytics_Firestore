import React from "react";

export function QuestionZoneA({questionId, questionText, choices, onChange, value}) {
    return(
    <div className="questionZone">
        <div className="card card-title">
            <h3>{questionText}</h3>
        </div>
        <div className="answers">
            {choices.map((choice, index) => (
                <label key={index} className="card answer-card">
                    <input
                        type="radio"
                        name={questionId}
                        value={choice}
                        onChange={onChange}
                        checked={value === choice}
                    />
                    {choice}
                </label>
            ))}
        </div>
    </div>)
}