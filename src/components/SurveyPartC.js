import React, {useEffect, useState} from "react";
import {GetQuestions} from "./GetQuestions";
import {Link} from "react-router-dom";

export default function SurveyPartC({setResults, onComplete}) {
    const [emailInput, setEmailInput] = useState("");
    const [emails, setEmails] = useState([]);
    const [showEmailInput, setShowEmailInput] = useState(false);

    const surveyTitle = "Inscription auprès d'un chef de groupe";
    useEffect(() => {
        document.title = surveyTitle;
    }, [surveyTitle]);

    const handleChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handleAddEmail = () => {
        if (testRegexEmail(emailInput)) {
            setEmails([...emails, emailInput]);
            setEmailInput("");
        } else {
            alert("Veuillez saisir une adresse email valide.");
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const result = emails;

        console.log(result);
        setResults(result);

    };

    const testRegexEmail = (email) => {
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(String(email).toLowerCase());
    };

    const handleCheckboxChange = (event) => {
        setShowEmailInput(event.target.checked);
    };


    return (
        <>
            <h1>{surveyTitle}</h1>
            <div className="questionZone">
                <div className="card card-title">
                    <h3>Vous avez la possibilité de saisir l'adresse email de votre chef de groupe :</h3>
                </div>
                <div className="answers">
                    <label>
                        <input
                            type="checkbox"
                            name="showEmailInput"
                            onChange={handleCheckboxChange}
                        />
                        Saisir "mon chef de groupe"
                    </label>
                    {showEmailInput && (
                        <>
                            <input
                                type="text"
                                name="email"
                                value={emailInput}
                                onChange={handleChange}
                                placeholder="saisir une adresse mail"
                            />
                            <button type="button" onClick={handleAddEmail}>
                                Ajouter
                            </button>
                            {emails.map((email, index) => (
                                <p key={index}>{email}</p>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className="controls-btn">
                <div>

                </div>
                <button className="primary-button" type="button" onClick={handleSubmit}>
                    Envoyer mon questionnaire
                </button>
            </div>
        </>
    );
}


