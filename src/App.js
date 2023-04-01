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

            <Questionnaire />


        </div>



    );
}



function Questionnaire() {
    // État local qui stocke les réponses de l'utilisateur
    const [reponses, setReponses] = useState([{id: 'a', text: 'Roufdggfe'}, { id: 'b', text: 'Bleu' },
        { id: 'c', text: 'Vert' },]);

    // Tableau de questions et réponses
    const questions = [
        {
            id: 1,
            question: 'Quelle est votre couleur préférée ?',
            reponses: [
                { id: 'a', text: 'Rouge', isChecked: false },
                { id: 'b', text: 'Bleu', isChecked: false },
                { id: 'c', text: 'Vert' , isChecked: false},
            ],
        },
        {
            id: 2,
            question: 'Quel est votre animal préféré ?',
            reponses: [
                { id: 'a', text: 'Chien' , isChecked: false},
                { id: 'b', text: 'Chat' , isChecked: false},
                { id: 'c', text: 'Oiseau' , isChecked: false},
            ],
        },
        {
            id: 3,
            question: 'Quel est votre fruit préféré ?',
            reponses: [
                { id: 'a', text: 'Pomme' , isChecked: false},
                { id: 'b', text: 'Banane' , isChecked: false},
                { id: 'c', text: 'Orange', isChecked: false },
            ],
        },
    ];

    // État local qui stocke l'index de la question actuelle
    const [index, setIndex] = useState(0);

    // Fonction qui est appelée lorsque l'utilisateur clique sur le bouton "suivant"
    const handleNext = () => {
        // Vérifie que l'utilisateur a sélectionné une réponse avant de passer à la question suivante
        if (reponses[index]) {
            // Incrémente l'index pour passer à la question suivante
            setIndex(index + 1);
        }
    };

    // Fonction qui est appelée lorsque l'utilisateur coche une réponse
    const handleReponseChange = (e) => {
        // Copie l'état actuel des réponses
        const newReponses = [...reponses];
        // Ajoute ou met à jour la réponse de l'utilisateur pour la question actuelle
        newReponses[index] = e.target.value;
        // Met à jour l'état des réponses
        setReponses(newReponses);



        //TODO set du checkbox response
    };


    // Récupère la question et les réponses de la question actuelle à partir du tableau de questions
    //const [,question, options] = questions[index];

    return (
        <div>
            <h1>Questionnaire</h1>
            <h2>Question {index + 1}</h2>
            <p>{questions[index].question}</p>
            {
                questions[index].reponses.map((r) =>
                        <div key={questions[index].reponses.id}>
                            <form>
                                <label>
                                    <input
                                    type="radio"
                                    name="reponse"
                                    value={r.id}
                                   // checked={q[index] === q.reponses.id}
                                    checked={r.isChecked}
                                    onChange={handleReponseChange}
                                />
                                    <span>{r.text}</span>
                                </label>
                            </form>
                        </div>

                )
            }
            <button onClick={handleNext}>Suivant</button>
        </div>
    );
}

//export default Questionnaire;



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
