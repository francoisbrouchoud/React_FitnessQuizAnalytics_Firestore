import React from "react";

// Affichage de la question et des radioButtons
export function QuestionZoneB({questionId, questionText, questionSecondaryText, choices, onChange, value, points, multipleChoice}) {
    return(
        <div className="questionZone">
            <div className="card card-title">
                <h3>{questionText}</h3>
            </div>
            {/*texte secondaire si présent*/}
            {questionSecondaryText && <p>{questionSecondaryText}</p>}
            <div className="answers">
                {choices.map((choice, index) => (
                    <label key={index} className="card answer-card">
                        <input
                            type={multipleChoice ? "checkbox" : "radio"}
                            name={questionId}
                            value={choice}
                            data-points={points[index]}
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