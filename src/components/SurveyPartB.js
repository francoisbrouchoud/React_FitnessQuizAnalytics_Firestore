import React, {useEffect, useState} from "react";
import {GetQuestions} from "./GetQuestions";
import {QuestionZone} from "./QuestionZone";

/**
 * Component that handle the survey for the mobility evaluation
 * Recover questionData with to GetQuestions
 * @param setResults - results of this survey
 * @returns {JSX.Element}
 * @constructor
 */
export default function SurveyPartB({setResults}) {

    const [questionsFromDB, setQuestionsFromDB] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await GetQuestions("questions_partB");
            setQuestionsFromDB(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const surveyTitle = "Évalutation de votre mobilité";
    useEffect(() => {
        document.title = surveyTitle;
    }, [surveyTitle]);
    
    return (
        <>
            <h1>{surveyTitle}</h1>
            {isLoading ? (
                <p>Questions en cours de chargement.</p>
            ) : (
                <Survey questionDataPartB={questionsFromDB} setResults={setResults} />
            )}
        </>
    );
}

/**
 * Handle the navigation, responses saving of the questions of SurveyB (mobility evaluation)
 * @param questions - the questions data
 * @param setResults - results when completed
 * @returns {JSX.Element}
 * @constructor
 */
function Survey ({ questionDataPartB, setResults}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionHistory, setQuestionHistory] = useState([]);

    const [responses, setResponses] = useState({});
    useEffect(() => {
        if (responses["BQst03"]?.points === "0") {
            if (responses["BQst04"]?.points !== "0" || responses["BQst05"]?.points !== "0") {
                setResponses((prevResponses) => ({
                    ...prevResponses,
                    BQst04: { id: "BQst04", value: "Impossible", points: "0" },
                    BQst05: { id: "BQst05", value: "Impossible", points: "0" },
                }));
            }
        }

        if (responses["BQst04"]?.points === "0") {
            if (responses["BQst05"]?.points !== "0") {
                setResponses((prevResponses) => ({
                    ...prevResponses,
                    BQst05: { id: "BQst05", value: "Impossible", points: "0" },
                }));
            }
        }

        if (responses["BQst06"]?.points === "0") {
            if (responses["BQst07"]?.points !== "5" || responses["BQst08"]?.points !== "10") {
                setResponses((prevResponses) => ({
                    ...prevResponses,
                    BQst07: { id: "BQst07", value: "Infaisable", points: "5" },
                    BQst08: { id: "BQst08", value: "Infaisable", points: "10" },
                }));
            }
        }

        if (responses["BQst07"]?.points === "5") {
            if (responses["BQst08"]?.points !== "10") {
                setResponses((prevResponses) => ({
                    ...prevResponses,
                    BQst08: { id: "BQst08", value: "Infaisable", points: "10" },
                }));
            }
        }
    }, [responses]);

    const handleChange = (event) => {
        const questionId = event.target.name;
        const value = event.target.value;
        const points = event.target.dataset.points;
        const multipleChoice = event.target.dataset.multiplechoice === "true";

        //handle multiple choice with checkbox
        if (multipleChoice) {
            if (event.target.checked) {
                const previousResponses = responses[questionId]?.value || [];
                const pointsForAlreadyCheckedBoxes = parseInt(responses[questionId]?.points) || 0;

                // if we select the "no option" with other options that are positive already checked
                if (points == 0 && pointsForAlreadyCheckedBoxes > 0) {
                    alert("Cette option n'est pas sélectionnable en combinaison des autres.");
                    event.target.checked = false;
                    return;
                }
                // if we select options that are positive with already a "no option" checked
                if (points == 1 && pointsForAlreadyCheckedBoxes === 0 && previousResponses.length > 0) {
                    alert("Cette option n'est pas sélectionnable en combinaison de la dernière option.");
                    event.target.checked = false;
                    return;
                }

                //set response : for points: -> calculate the sum of points corresponding to all checked boxes
                setResponses({...responses,
                                    [questionId]: {
                                        id: questionId,
                                        value: [...previousResponses, value],
                                        points: (parseInt(pointsForAlreadyCheckedBoxes) + parseInt(points)).toString()}
                });

            }
            //if option unchecked
            else {
                const updatedResponses = responses[questionId].value.filter((choice) => choice !== value);
                // set response : for points: -> recalculate the sum of points corresponding to all checked boxes
                setResponses({...responses,
                                    [questionId]: {
                                        id: questionId,
                                        value: updatedResponses,
                                        points: (parseInt(responses[questionId].points) - parseInt(points)).toString()}
                });
            }
        }
        //normal case with only one choice per question
        else {
                setResponses({ ...responses,
                                    [questionId]: {
                                            id: questionId,
                                            value: value,
                                            points: points }
                });
        }
    };

    const next = () => {
        //specific alert for multipe choice
        if (questionDataPartB[currentQuestionIndex].multipleChoice) {
            const checkBoxesSelected = responses[question.questionId]?.value;
            if (!checkBoxesSelected || checkBoxesSelected.length === 0) {
                alert("Sélectionner au minimum une case.");
                return;
            }
        }

        if (!responses[question.questionId]) {
            alert("Sélectionner une réponse svp.");
            return;
        }

        // standard case to go to the next question if we are still in the array
        if (currentQuestionIndex < questionDataPartB.length - 1) {
            const nextQuestionMapping = nextQuestionMap[question.questionId];

            // in case of conditional question we get the id of the next question
            if (nextQuestionMapping && nextQuestionMapping.condition(responses[question.questionId])) {
                const nextQuestionIndex = questionDataPartB.findIndex((q) => q.questionId === nextQuestionMapping.nextQuestionId);
                // if we go back there is an order for the questions to set in memory
                setQuestionHistory([...questionHistory, currentQuestionIndex]);
                setCurrentQuestionIndex(nextQuestionIndex);
            }

            // normal question
            else {
                setQuestionHistory([...questionHistory, currentQuestionIndex]);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }

        // handle the last question and rector result
        if(currentQuestionIndex === questionDataPartB.length-1){
            const resultsTemp = Object.keys(responses).map(questionId =>
                ({
                    id: responses[questionId].id,
                    points: responses[questionId].points
                }));

            setResults(resultsTemp);
        }
    };

    const back = () => {
        if (questionHistory.length > 0) {
            const newQuestionHistory = [...questionHistory];
            const lastQuestionIndex = newQuestionHistory.pop();
            setQuestionHistory(newQuestionHistory);
            setCurrentQuestionIndex(lastQuestionIndex);
        }
    };

    // Conditional question map
    const nextQuestionMap = {
        "BQst03": {
            condition: (response) => response?.points === "0",
            nextQuestionId: "BQst06",
        },
        "BQst04": {
            condition: (response) => response?.points === "0",
            nextQuestionId: "BQst06",
        },
        "BQst06": {
            condition: (response) => response?.points === "0",
            nextQuestionId: "BQst09",
        },
        "BQst07": {
            condition: (response) => response?.points === "5",
            nextQuestionId: "BQst09",
        },
    };

    // get current question
    const question = questionDataPartB[currentQuestionIndex];
    
    return (
        <form>
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
                {/*Button précédent, empty html tag if start of survey*/}
                {currentQuestionIndex > 0 ? (
                    <button className="secondary-button" type="button" onClick={back}>
                        Précédent
                    </button>
                ) : (
                    <div style={{ flex: 1 }} />
                )}

                  <button className="primary-button" type="button" onClick={next}>
                      Suivant
                  </button>
            </div>
        </form>
    );
};

