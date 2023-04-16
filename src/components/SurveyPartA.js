//Provisoire questionnaire 1
//TODO faire afficher les messages, enregister les points
import React, {useState} from "react";

export default function SurveyPartA() {
    const QuestionZone = ({
                              questionId,
                              messageToShow,
                              questionText,
                              choices,
                              onChange,
                              value,
                          }) => (
        <div className="questionZone">
            <h3>{questionText}</h3>
            {/*Tentative d'affichage de message quand plus de question*/}
            <div>
                {messageToShow ? (
                    <div>
                        <h2>{messageToShow.messageTitle}</h2>
                        <p>{messageToShow.messageText}</p>
                        {console.log("message")}
                        <ul>
                            {messageToShow.advices &&
                                messageToShow.advices.map((advice, index) => (
                                    <li key={index}>{advice}</li>
                                ))}
                        </ul>
                    </div>
                ) : (
                    <div>
                        {choices.map((choice, index) => (
                            <label key={index}>
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
                )}
            </div>
        </div>
    );

    const Survey = ({ questions, onSubmit }) => {
        const [responses, setResponses] = useState({});
        const [messageToShow, setMessageToShow] = useState(null);
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

        const handleChange = (event) => {
            const questionId = event.target.name;
            const { value } = event.target;
            setResponses({ ...responses, [questionId]: { id: questionId, value } });
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            onSubmit(responses);
        };
        //Tentative d'affichage de message quand plus de question
        const next = () => {
            if (responses.hasOwnProperty(question.questionId)) {
                const nextQuestionOrMessage = getNextQuestion(
                    question.questionId,
                    responses[question.questionId].value,
                    responses
                );

                if (nextQuestionOrMessage.messageId) {
                    setMessageToShow(nextQuestionOrMessage);
                } else {
                    setCurrentQuestionIndex(
                        questions.findIndex((q) => q.questionId === nextQuestionOrMessage.questionId)
                    );
                }
            }
        };

        const question = questions[currentQuestionIndex];

        if (messageToShow) {
            return (
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>{messageToShow.messageTitle}</h2>
                        <p>{messageToShow.messageText}</p>
                        <ul>
                            {messageToShow.advices &&
                                messageToShow.advices.map((advice, index) => (
                                    <li key={index}>{advice}</li>
                                ))}
                        </ul>
                    </div>
                    <button type="submit">Soumettre les données & passer au questionnaire B</button>
                </form>
            );
        }

        return (
            <div>
                <QuestionZone
                    questionId={question.questionId}
                    questionText={question.questionText}
                    choices={question.choices}
                    onChange={handleChange}
                    value={responses[question.questionId]?.value}
                />
                {!messageToShow && currentQuestionIndex < questions.length  && (
                    <button type="button" onClick={next}>
                        Suivant
                    </button>
                )}
            </div>
        );
    };




    const getNextQuestion = (currentQuestionId, response, responses) => {
        switch (currentQuestionId) {
            case "A01":
                if (response === "Oui") {
                    return questionsPartOne[1];
                } else {
                    return questionsPartOne[3];
                }
            case "A02":
                if (response  === "Oui") {
                    return questionsPartOne[2];
                } else {
                    console.log("return message", messagePartOne[3]);
                    return messagePartOne[3];
                }
            case "A03":
                if (response  === "Oui") {
                    console.log("return message", messagePartOne[5]);
                    return messagePartOne[5];
                } else {
                    console.log("return message", messagePartOne[4]);
                    return messagePartOne[4];
                }
            case "A04":
                if (response === "Oui") {
                    console.log("return message", messagePartOne[2]);
                    return messagePartOne[2];
                } else {
                    return questionsPartOne[4];
                }
            case "A05":
                return questionsPartOne.find((q) => q.questionId === "A06");
            case "A06":
                const knowsBenefits = responses["A05"]?.value == "Oui";
                const knowsRisks = responses["A06"]?.value == "Oui";

                console.log(responses["A05"]?.value);
                console.log(responses["A06"]?.value);
                console.log(knowsRisks);
                console.log(knowsBenefits);
                if (knowsBenefits || knowsRisks) {

                    console.log("une des deux");
                    return messagePartOne.find((m) => m.messageId === "AM02");
                } else {
                    return messagePartOne.find((m) => m.messageId === "AM01");
                }
            default:
                return null;
        }
    };

    const questionsPartOne = [
        {
            questionId: "A01",
            questionText: "Est-ce que vous avez une activité physique régulière ? ",
            choices: ["Oui", "Non"],
        },
        {
            questionId: "A02",
            questionText: "Diriez-vous que vous êtes actif/-ve au moins 30 minutes chaque jour (au moins 5 jours par semaine) ?",
            choices: ["Oui", "Non"],
        },
        {
            questionId: "A03",
            questionText: "Est-ce qu’il vous arrive parfois/régulièrement de transpirer ou d’être essoufflé/-e durant cette activité ?",
            choices: ["Oui", "Non"],
        },
        {
            questionId: "A04",
            questionText: "Est-ce que vous auriez envie de reprendre une activité physique plus importante dans les prochains mois ?",
            choices: ["Oui", "Non"],
        },
        {
            questionId: "A05",
            questionText: "Est-ce que vous connaisez les avantages que l'activité physique peut apporter pour la santé ?",
            choices: ["Oui", "Non"],
        },
        {
            questionId: "A06",
            questionText: "Est-ce que vous connaisez les risques de l'inactivité ?",
            choices: ["Oui", "Non"],
        },
    ];

    const messagePartOne = [
        {
            messageId: "AM01",
            messageTitle: "BOX: Précontemplation 1 (indétermination)",
            messageText: "Le patient n’envisage pas de reprendre une activité physique et il n'est pas consient de risque de l'inactivité ou des benefices de l'activité physique.",
            advices: ["brochure pour: – Encourager à envisager de reprendre de l’activité", "– Informer sur les bénéfices potentiels pour sa santé et son indépendance"],
            points: 1
        },
        {
            messageId: "AM02",
            messageTitle: "BOX: Précontemplation 2 (indétermination)",
            messageText: "Le patient n’envisage pas de reprendre une activité physique mais il connais les avantes de l'activité physique. ",
            advices: ["brochure pour: – Encourager à envisager de reprendre de l’activité"],
            points: 2
        },
        {
            messageId: "AM03",
            messageTitle: "Contemplation (intention)",
            messageText: "Le patient est intéressé ou réfléchit à modifier son activité",
            advices: ["– Entretien motivationnel (tab. 3)", "– Pouvoir répondre aux éventuelles objections (cf. tab. 4)", "– Référer à une association de seniors ou proposant de l’activité physique adaptée et supervisée (par ex. Pro Senectute, programme «pas de retraite pour ma santé»)"],
            points: 3
        },
        {
            messageId: "AM04",
            messageTitle: "Préparation 1",
            messageText: "Le patient est actif mais moins de 30 minutes/j, 5 j/semaine ou avec une intensité trop basse",
            points: 4
        },
        {
            messageId: "AM05",
            messageTitle: "Préparation 2",
            messageText: "Le patient est actif au moins 30 minutes/j, 5 j/semaine, mais avec une intensité trop basse",
            advices: ["- proposer brochures sur l'activité physique"],
            points: 5
        },
        {
            messageId: "AM06",
            messageTitle: "Action et maintien",
            messageText: "Le patient est actif au moins 30 minutes/j, 5 j/semaine",
            messageSecondaryText: ["- proposer brochures sur l'activité physique", "– Traiter les problèmes de santé qui pourraient provoquer un manque d’activité physique", "– Développer des stratégies pour gérer des nouvelles barrières qui se présentent", "– ENCOURAGER!"],
            points: 6
        },
    ]

    return (
        <div className="App">
            <h1>Questionnaire A</h1>
            <Survey
                questions={questionsPartOne}
                onSubmit={(responses) => {
                    console.log("Réponses du sondage :", responses);
                }}
            />
        </div>
    );

}