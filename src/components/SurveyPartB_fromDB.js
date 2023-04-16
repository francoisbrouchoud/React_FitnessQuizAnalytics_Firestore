import React, {useEffect, useState} from "react";
import GetQuestions from "./GetQuestions";
import {questionDataPartB} from "../data/survey";



export default function SurveyPartB() {

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
        <div className="App">
            <h1>Questionnaire B</h1>
            {isLoading ? (
                <p>Question en cours de chargement</p>
            ) : (
                <Survey questionDataPartB={questionsFromDB} />
            )}
        </div>
    );
}

function Survey ({ questionDataPartB, onSubmit })
{
    const [responses, setResponses] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleChange = (event) => {
        const questionId = event.target.name;
        const { value } = event.target;
        const points = event.target.dataset.points;
        setResponses({ ...responses, [questionId]: {id: questionId, value, points } });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const userAnsweredAllQuestions = questionDataPartB.every((question) => responses.hasOwnProperty(question.questionId));
        
        if (!userAnsweredAllQuestions) {
            setErrorMessage('Veuillez svp répondre à toutes les questions.');
            return;
        } else {
            //supprime le message d'erreur
            setErrorMessage('');
        }
        
        const results = Object.keys(responses).map((questionId) => {
            const { id, points } = responses[questionId];
            return { id, points };
        });
        
        //TODO ici on peut gérer les résultat
        console.log("Réponses du sondage :", results);
    };
    
    //retour en arrière teste si on ne sort pa du tableau à gauche
    const back = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    
    //aller en avant teste si on ne sort pa du tableau à droite
    const next = () => {
        if (currentQuestionIndex < questionDataPartB.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
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
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {currentQuestionIndex > 0 && (
                <button type="button" onClick={back}>Précédant</button>
            )}
            {/*si on arrive au bout on remplace le bouton suivant par submit*/}
            {currentQuestionIndex < questionDataPartB.length - 1 ? (
                <button type="button" onClick={next}>Suivant</button>
            ) : (
                <button type="submit">Valider mon questionnaire</button>
            )}
        </form>
    );
};

// Affichage de la question et des radioButtons
export function QuestionZone ({questionId, questionText, questionSecondaryText, choices, onChange, value, points }) {
    return(
        <div className="questionZone">
            <h3>{questionText}</h3>
            {/*texte secondaire si présent*/}
            {questionSecondaryText && <p>{questionSecondaryText}</p>}
            {choices.map((choice, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name={questionId}
                        value={choice}
                        data-points={points[index]}
                        onChange={onChange}
                        checked={value === choice}
                    />
                    {choice}
                </label>
            ))}
        </div>
    )
} ;