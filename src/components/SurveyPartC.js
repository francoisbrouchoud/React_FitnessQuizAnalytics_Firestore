import React, {useEffect, useState} from "react";

//regex : https://www.w3resource.com/javascript/form/email-validation.php
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Component to give the choice to register the email of the groupLeader
 * There is also the button to submit all the responses included the previous survey
 * @param setResults
 * @returns {JSX.Element}
 */
export default function SurveyPartC({setResults}) {
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

    /**
     * Test if the email has a correct format
     * @param email address
     * @returns {boolean} - true if email has a correct format
     */
    const testRegexEmail = (email) => {
        return EMAIL_REGEX.test(String(email).toLowerCase());
    };

    const handleCheckboxChange = (event) => {
        setShowEmailInput(event.target.checked);
    };


    return (
        <>
            <h1>{surveyTitle}</h1>
            <div className="questionZone">
                <div className="card card-title">
                    <h3>Vous avez la possibilité de saisir l'adresse email de votre ou vos chef(s) de groupe :</h3>
                </div>
                <div className="answers">
                    <label>
                        Saisir un ou plusieurs chef(s) de groupe ?
                        <input
                            type="checkbox"
                            name="showEmailInput"
                            onChange={handleCheckboxChange}
                        />

                    </label>
                    {showEmailInput && (
                        <>
                            <input
                                type="text"
                                name="email"
                                value={emailInput}
                                onChange={handleChange}
                                placeholder="email"
                            />
                            <button type="button" onClick={handleAddEmail}>
                                Ajouter
                            </button>
                            <ul>
                                {emails.map((email, index) => (
                                    <li key={index}>{email}</li>
                                ))}
                            </ul>
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


