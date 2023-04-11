import React, {useState} from "react";
import "./App.css";

/*
Book is a class Component now in order to use state
 */

function App() {

    return (

        <div className="App">
            <header className="AppHeader">
                <div class="HeadIconsPosition">
                    <img class="headerIcons" src={require('./Pictures/fonctionnement.png')}/>
                    <h1>Fitness Check</h1>
                </div>
                <div class="HeadIconsPosition">
                    <img className="headerIcons" src={require('./Pictures/information.png')}/>
                    <img class="headerIcons" src={require('./Pictures/deconnexion.png')}/>
                    <h1>Logout</h1>
                </div>
            </header>
            <div class="ContainDoOrConsultQuizz">
                <div class="DoOrConsultQuizz">
                    <img class="headerIcons" src={require('./Pictures/ideas.png')}/>
                    <ChangeColor class="buttonTitle"/>
                    {/*<button class="buttonTitle" onClick={changeColor()}>Faire le quizz</button>*/}
                </div>
                <div class="DoOrConsultQuizz">
                    <img class="headerIcons" src={require('./Pictures/research.png')}/>
                    <p class="buttonTitle">Voir mes résultats</p>
                </div>
            </div>

            <SurveyPartTwo />
        </div>

    );
}



function SurveyPartTwo() {
    const QuestionZone = ({questionId, questionText, questionSecondaryText, choices, onChange, value, points }) => (
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
    );

    const Survey = ({ questions, onSubmit }) => {
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

            const userAnsweredAllQuestions = questions.every((question) => responses.hasOwnProperty(question.questionId));

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
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        };

        //Question courrante à l'index donné
        const question = questions[currentQuestionIndex];

        return (
            <form onSubmit={handleSubmit}>
                <QuestionZone
                    questionId={question.questionId}
                    questionText={question.questionText}
                    questionSecondaryText={question.questionSecondaryText}
                    choices={question.choices}
                    onChange={handleChange}
                    value={responses[question.questionId]?.value}
                    points={questions[currentQuestionIndex].points}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {currentQuestionIndex > 0 && (
                    <button type="button" onClick={back}>Précédant</button>
                )}
                {/*si on arrive au bout on remplace le bouton suivant par submit*/}
                {currentQuestionIndex < questions.length - 1 ? (
                    <button type="button" onClick={next}>Suivant</button>
                ) : (
                    <button type="submit">Valider mon questionnaire</button>
                )}
            </form>
        );
    };

    //TODO gérer avec Firestore mais la structure est là
    const questions = [
        {
            questionId: 1,
            questionText: "Quels dispositifs d'aide à la marche utilisez vous ? ",
            choices: ["aucune", "une canne", "deux cannes", "déambulateur", "cadre de marche", "j'ai besoin de l'aide d'une tierce personne"],
            points:[5,4,3,2,2,1]
        },
        {
            questionId: 2,
            questionText: "Par rapport à la vitesse de marche moyenne (celle de vos proches, de vos amis et des gens de votre âge), pensez-vous marcher habituellement… (cocher une seule case)",
            choices: ["Nettement moins vite", "Un peu moins vite", "A la même vitesse", "Un peu plus vite", "Nettement plus vite"],
            points: [1, 2, 3, 4, 5]
        },
        {
            questionId: 3,
            questionText: "Entourez le temps maximal que vous pouvez pensez pouvoir tenir aux différentes allures suivantes facilement, sur terrain plat et sans vous arrêter pour vous reposer:",
            questionSecondaryText: "Marcher lentement (une vitesse plus lente que celle de vos proches, de vos amis ou des gens de votre âge)",
            choices: ["impossible", "1 minute", "5 minutes", "15 minutes", "30 minutes", "1 heure", "2 heures", "3 heures & plus"],
            points: [0, 1, 4, 7, 10, 13, 16, 19]
        },
        {
            questionId: 4,
            questionText: "Entourez le temps maximal que vous pouvez pensez pouvoir tenir aux différentes allures suivantes facilement, sur terrain plat et sans vous arrêter pour vous reposer:",
            questionSecondaryText: "Marcher à vitesse moyenne (la même vitesse que celle de vos proches, de vos amis ou des gens de votre âge)",
            choices: ["impossible", "1 minute", "5 minutes", "15 minutes", "30 minutes", "1 heure", "2 heures", "3 heures & plus"],
            points: [0, 2, 5, 8, 11, 14, 17, 20]
        },
        {
            questionId: 5,
            questionText: "Entourez le temps maximal que vous pouvez pensez pouvoir tenir aux différentes allures suivantes facilement, sur terrain plat et sans vous arrêter pour vous reposer:",
            questionSecondaryText: "Marcher rapidement (une vitesse plus rapide que celle de vos proches, de vos amis ou des gens de votre âge)",
            choices: ["impossible", "1 minute", "5 minutes", "15 minutes", "30 minutes", "1 heure", "2 heures", "3 heures & plus"],
            points: [0, 3, 6, 9, 12, 15, 18, 21]
        },
        {
            questionId: 6,
            questionText: "Montée d'escaliers : Reportez le degré de difficulté physique qui décrit le mieux la difficulté que vous avez eu à monter des escaliers, sans vous arrêter pour vous reposer, au cours de la dernière semaine.:",
            questionSecondaryText: "Monter 1 étage ? Degré de difficulté",
            choices: ["Aucun", "Leger", "Moyen", "Important", "Infaisable"],
            points: [4, 3, 2, 1, 0]
        },
        {
            questionId: 7,
            questionText: "Montée d'escaliers : Reportez le degré de difficulté physique qui décrit le mieux la difficulté que vous avez eu à monter des escaliers, sans vous arrêter pour vous reposer, au cours de la dernière semaine.:",
            questionSecondaryText: "Monter 3 étage ? Degré de difficulté",
            choices: ["Aucun", "Leger", "Moyen", "Important", "Infaisable"],
            points: [9, 8, 7, 6, 5]
        },
        {
            questionId: 8,
            questionText: "Montée d'escaliers : Reportez le degré de difficulté physique qui décrit le mieux la difficulté que vous avez eu à monter des escaliers, sans vous arrêter pour vous reposer, au cours de la dernière semaine.:",
            questionSecondaryText: "Monter 5 étages ? Degré de difficulté",
            choices: ["Aucun", "Leger", "Moyen", "Important", "Infaisable"],
            points: [14, 13, 12, 11, 10]
        },
        {
            questionId: 9,
            questionText: "Avez-vous peur de l'altitude (Peur du vide) ? ",
            questionSecondaryText: "Explication: La peur du vide est une vraie phobie (phobie = peur) et n'est pas à confondre avec le vertige, qui est un phénomène physiologique). La peur du vide peut se déclencher à la simple pensée de se retrouver en hauteur.",
            choices: ["Oui", "Non"],
            points: [1, 0]
        },
        {
            questionId: 10,
            questionText: "Avez-vous peur de l'altitude (Peur du vide) ? ",
            questionSecondaryText: "Explication: La peur du vide est une vraie phobie (phobie = peur) et n'est pas à confondre avec le vertige, qui est un phénomène physiologique). La peur du vide peut se déclencher à la simple pensée de se retrouver en hauteur.",
            choices: ["Oui", "Non"],
            points: [1, 0]
        },
        {
            questionId: 11,
            questionText: "Avez-vous des douleurs?",
            choices: ["Douleurs dans la hanche", "Douleurs des genoux", "Douleurs aux pieds", "Douleurs de dos", "Douleurs ailleurs", "Pas de douleurs"],
            points: [1, 1, 1, 1, 1, 0]
        },
        {
            questionId: 12,
            questionText: "Est-ce que vous avez peur de chuter?",
            choices: ["Oui, j'ai peur de chuter", "Non je n'ai pas peur de chuter"],
            points: [1, 0]
        },
        {
            questionId: 13,
            questionText: "Avez-vous chuté lors des 12 derniers mois?",
            choices: ["Non", "Une fois", "Deux fois", "Plusieurs fois"],
            points: [0, 1, 2, 3]
        },
        {
            questionId: 14,
            questionText: "Avez-vous parfois des vertiges?",
            choices: ["Oui", "Non"],
            points: [1, 0]
        },
        {
            questionId: 15,
            questionText: "Est-ce que vous vous sentez sûre de vous lorsque vous vous tenez debout sur une seule jambe sans vous tenir à quelque chose?",
            choices: ["Non je ne me sens pas sûr-e", "Oui je me sens sûr-e", "Impossible de faire sans me tenir"],
            points: [1, 2, 0]
        }
    ];


    return (
            <div className="App">
                <h1>Quizz</h1>
                <Survey questions={questions}  />
            </div>
    );
}

function ChangeColor(){
    const[color, setColor] = useState('black');
    function handleClick (){
        setColor('blue');

    }

    return (
        <button onClick={handleClick} style={{ color: color }}> Faire le quizz </button>
    )
}


export default App;
