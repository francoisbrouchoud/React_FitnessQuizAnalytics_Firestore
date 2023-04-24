//Provisoire questionnaire 1
//TODO faire afficher les messages, enregister les points
import React, {useEffect, useState} from "react";
import {GetQuestionsPartA} from "./GetQuestions";

export default function SurveyPartA({setResults, onComplete}) {
    
    const [questionsFromDBPartA, setQuestionsFromDBPartA] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
            const data = await GetQuestionsPartA();
            setQuestionsFromDBPartA(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    
    const QuestionZone = ({questionId, questionText, choices, onChange, value,}) => (
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
        </div>
    );

    const Survey = ({ questions, setResults, onComplete }) => {
        const [responses, setResponses] = useState({});
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

        const handleChange = (event) => {
            const questionId = event.target.name;
            const { value } = event.target;
            setResponses({ ...responses, [questionId]: { id: questionId, value } });
        };

        //Tentative d'affichage de message quand plus de question
        const next = () => {
            if (!responses[question.questionId]) {
                alert("Sélectionner une réponse svp.");
                return;
            }

            if (responses.hasOwnProperty(question.questionId)) {
                const nextQuestionOrPoints = getNextQuestion(
                    question.questionId,
                    responses[question.questionId].value,
                    responses
                );

                if (typeof nextQuestionOrPoints === 'number') {
                    const pointsA = {
                        id: 'AQst',
                        points: nextQuestionOrPoints.toString(),
                    };
                    setResults(pointsA);
                    onComplete();


                } else {
                    setCurrentQuestionIndex(
                        questions.findIndex((q) => q.questionId === nextQuestionOrPoints.questionId)
                    );
                }
            }
        };

        const back = () => {
            if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
            }
        };


        const question = questions[currentQuestionIndex];

        return (
            <div>
                <QuestionZone
                    questionId={question.questionId}
                    questionText={question.questionText}
                    choices={question.choices}
                    onChange={handleChange}
                    value={responses[question.questionId]?.value}
                />
                <div className="controls-btn">
                    {currentQuestionIndex > 0 ? (
                        <button className="secondary-button" type="button" onClick={back} disabled={currentQuestionIndex === 0}>
                            Précédent
                        </button>
                    ) : (
                        <div style={{flex: 1}} />
                        )
                    }
                    <button className="primary-button" type="button" onClick={next}>
                        Suivant
                    </button>
                </div>
            </div>
        );
    };

    const getNextQuestion = (currentQuestionId, response, responses) => {
        switch (currentQuestionId) {
            case "AQst01":
                if (response === "Oui") {
                    return questionsFromDBPartA.find((q) => q.questionId === "AQst02");
                } else {
                    return questionsFromDBPartA.find((q) => q.questionId === "AQst04");
                }
            case "AQst02":
                if (response  === "Oui") {
                    return questionsFromDBPartA.find((q) => q.questionId === "AQst03");
                } else {
                    return 4;
                }
            case "AQst03":
                if (response  === "Oui") {
                    return 6;
                } else {
                    return 5;
                }
            case "AQst04":
                if (response === "Oui") {
                    return 3;
                } else {
                    return questionsFromDBPartA.find((q) => q.questionId === "AQst05");
                }
            case "AQst05":
                return questionsFromDBPartA.find((q) => q.questionId === "AQst06");
            case "AQst06":
                const knowsBenefits = responses["AQst05"]?.value === "Oui";
                const knowsRisks = responses["AQst06"]?.value === "Oui";

                if (knowsBenefits || knowsRisks) {
                    return 2;
                } else {
                    return 1;
                }
            default:
                return null;
        }
    };


    return (
        <>
            {isLoading ? (
                <p>Question en cours de chargement</p>
            ) : (
            <Survey questions={questionsFromDBPartA} setResults={setResults} onComplete={onComplete} />
            )}
        </>
    );

}