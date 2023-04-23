import React, {useEffect, useState} from "react";
import {GetQuestions} from "./GetQuestions";
import {Link} from "react-router-dom";

export default function SurveyPartB({setResults}) {

    const [questionsFromDB, setQuestionsFromDB] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await GetQuestions();
            setQuestionsFromDB(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    
    return (
        <>
            <h1>Questionnaire B</h1>
            {isLoading ? (
                <p>Question en cours de chargement</p>
            ) : (
                <Survey questionDataPartB={questionsFromDB} setResults={setResults} />
            )}
        </>
    );
}

function Survey ({ questionDataPartB, setResults})
{
    const [responses, setResponses] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    //const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if (responses["BQst06"]?.points === "0") {
            if (responses["BQst07"]?.points !== "0" || responses["BQst08"]?.points !== "0") {
                setResponses((prevResponses) => ({
                    ...prevResponses,
                    BQst07: { id: "BQst07", value: "Infaisable", points: "0" },
                    BQst08: { id: "BQst08", value: "Infaisable", points: "0" },
                }));
            }
        }

        if (responses["BQst08"]?.points === "0") {
            if (responses["BQst09"]?.points !== "0") {
                setResponses((prevResponses) => ({
                    ...prevResponses,
                    BQst09: { id: "BQst09", value: "Infaisable", points: "0" },
                }));
            }
        }
    }, [responses]);


    const handleChange = (event) => {
        const questionId = event.target.name;
        const { value } = event.target;
        const points = event.target.dataset.points;
        const multipleChoice = event.target.dataset.multiplechoice === "true";

        if (multipleChoice) {
            if (event.target.checked) {
                const previousResponses = responses[questionId]?.value || [];
                const pointsForAlreadyCheckedBoxes = parseInt(responses[questionId]?.points) || 0;

                if (points == 0 && pointsForAlreadyCheckedBoxes > 0) {
                    alert("Cette option n'est pas sélectionnable en combinaison des autres.");
                    event.target.checked = false;
                    return;
                }

                if (points == 1 && pointsForAlreadyCheckedBoxes === 0 && previousResponses.length > 0) {
                    alert("Cette option n'est pas sélectionnable en combinaison de la dernière réponse");
                    event.target.checked = false;
                    return;
                }

                setResponses({...responses, [questionId]: {id: questionId, value: [...previousResponses, value], points: (parseInt(pointsForAlreadyCheckedBoxes) + parseInt(points)).toString()}});

            } else {
                const updatedResponses = responses[questionId].value.filter(
                    (choice) => choice !== value
                );
                setResponses({...responses, [questionId]: {id: questionId,  value: updatedResponses, points: (parseInt(responses[questionId].points) - parseInt(points)).toString()}});
            }
        } else {
                setResponses({ ...responses, [questionId]: { id: questionId, value, points }});
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        // Plus utilisé permettait de vérifier que tout était bien répondu mais géré au niveau du next
        /*
        const userAnsweredAllQuestions = questionDataPartB.every((question) => responses.hasOwnProperty(question.questionId));
        
        if (!userAnsweredAllQuestions) {
            setErrorMessage('Veuillez svp répondre à toutes les questions.');
            return;
        } else {
            //supprime le message d'erreur
            setErrorMessage('');
        }
        */




        const resultsTemp = Object.keys(responses).map((questionId) => {
            const { id, points } = responses[questionId];
            return { id, points };
        });

        setResults(resultsTemp);

    };
    
    //retour en arrière teste si on ne sort pa du tableau à gauche
    const back = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    
    //aller en avant teste si on ne sort pa du tableau à droite
    const next = () => {
        if (!responses[question.questionId]) {
            alert("Sélectionner une réponse svp.");
            return;
        }

        if (questionDataPartB[currentQuestionIndex].multipleChoice) {
            const checkBoxesSelected = responses[question.questionId]?.value;
            if (!checkBoxesSelected || checkBoxesSelected.length === 0) {
                alert("Sélectionner au minimum une case");
                return;
            }
        }

        if (currentQuestionIndex < questionDataPartB.length - 1) {

            if (
                (question.questionId === "BQst06" && responses[question.questionId]?.points === "0") || (question.questionId === "BQst07" && responses[question.questionId]?.points === "5")
            ) {
                const indexOfBQst09 = questionDataPartB.findIndex((q) => q.questionId === "BQst09");
                setCurrentQuestionIndex(indexOfBQst09);
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }


        }
    };
    
    //Question courrante à l'index donné
    const question = questionDataPartB[currentQuestionIndex];
    
    return (
        <form onSubmit={handleSubmit}>
            <QuestionZone
                questionId={question.questionId}
                questionText={question.questionText}
                questionSecondaryText={question.questionSecondaryText}
                choices={question.choices}
                onChange={handleChange}
                value={responses[question.questionId]?.value}
                points={questionDataPartB[currentQuestionIndex].points}
                multipleChoice={question.multipleChoice}
            />
            <div className="controls-btn">
                {/*{errorMessage && <p className="error-message">{errorMessage}</p>}*/}
                {currentQuestionIndex > 0 ? (
                  <button className="secondary-button" type="button" onClick={back}>Précédent</button>
                ) : (
                    <div style={{flex: 1}} />
                    )}
                {/*si on arrive au bout on remplace le bouton suivant par submit*/}
                {currentQuestionIndex < questionDataPartB.length - 1 && (
                  <button className="primary-button" type="button" onClick={next}>Suivant</button>)
                }
                {currentQuestionIndex === questionDataPartB.length - 1 && (
                  <button className="primary-button" type="submit">Valider mon questionnaire</button>
                )}
            </div>
        </form>
    );
};

// Affichage de la question et des radioButtons
export function QuestionZone ({questionId, questionText, questionSecondaryText, choices, onChange, value, points, multipleChoice }) {
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
} ;