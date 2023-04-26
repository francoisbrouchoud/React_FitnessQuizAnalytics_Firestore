import React from "react";

/**
 * Standard question zone for survey A and B.
 * It displays a question, possibly a secondary text and answer options
 * @param questionId
 * @param questionText
 * @param questionSecondaryText
 * @param choices
 * @param onChange
 * @param value
 * @param points
 * @param multipleChoice
 * @returns {JSX.Element}
 * @constructor
 */
export function QuestionZone({questionId, questionText, questionSecondaryText, choices, onChange, value, points, multipleChoice}) {
    return(
        <div className="questionZone">
            <div className="card card-title">
                <h3>{questionText}</h3>
            </div>
            {questionSecondaryText && <p>{questionSecondaryText}</p>}
            <div className="answers">
                {choices.map((choice, index) => (
                    <label key={index} className="card answer-card">
                        <input
                            type={multipleChoice ? "checkbox" : "radio"}
                            name={questionId}
                            value={choice}
                            data-points={points && points[index]}
                            data-multiplechoice={multipleChoice}
                            onChange={onChange}
                            checked={multipleChoice ? value?.includes(choice) : value === choice}
                        />
                        {choice}
                    </label>
                ))}
            </div>
        </div>
    )
}