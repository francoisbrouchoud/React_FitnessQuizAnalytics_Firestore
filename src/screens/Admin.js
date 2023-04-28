import React, {useEffect, useState} from "react";
import {auth, db} from "../initFirebase";
import {collection, doc, getDoc, getDocs, orderBy} from "firebase/firestore";
import InitQuestionsPartA from "../components/Admin/InitQuestionsPartA";
import InitQuestionsPartB from "../components/Admin/InitQuestionsPartB";
import InitMessagesPartA from "../components/Admin/InitMessagesPartA";
import {updateQuestionsInDB} from "../components/Admin/UpdateFirestore";


/**
 * Page to display the questions of the DB, and to update them if needed.
 * The page is only accessible to admins.
 * All the questions are displayed in a form, and the admin can update them by clicking on the "Update" button.
 * @returns {JSX.Element} : the page to display the questions of the DB, and to update them if needed.
 * @constructor
 */
export default function Admin() {

    const [messagesDB_A, setMessagesDB_A] = useState([]);
    const [questionsDB_A, setQuestionsDB_A] = useState([]);
    const [questionsDB_B, setQuestionsDB_B] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
        checkIfAdmin().then(r => console.log('checkIfAdmin done !'))
        
        getDB().then(r => console.log('getDB done !'))
       
        
    }, [isAdmin]);
    
    // Check if the user is an admin
    const checkIfAdmin = async () => {
        const user = auth.currentUser;
        const userDoc = await getDoc(doc(db, "users", user.email));
        const userData = await userDoc.data();
        const userIsAdmin = userData.isAdmin;
        setIsAdmin(userIsAdmin);
    }
    
    const getDB = async () => {
        if(isAdmin)
        {
            console.log('GetDB - isAdmin', isAdmin);
            try
            {
                setIsLoading(true);
                await fetchQuestionsA_FromDB()  .then(r => console.log('Questions A fetched !'));
                await fetchMessagesA_FromDB()   .then(r => console.log('Messages A fetched !'));
                await fetchQuestionsB_FromDB()  .then(r => console.log('Questions B fetched !'));
            }
            catch (e) {
                console.error(e);
            }
            finally
            {
                await setIsLoading(false);
            }
        }
    }
    
    const fetchQuestionsA_FromDB = async () => {
        try
        {
            // Récupérer les données de l'utilisateur dans la base de données ou l'API
            const fetchQuestionsFromDB = async () => {
                const querySnapshot = await getDocs(collection(db, 'questions_partA'),orderBy("questionId", "asc") );
                const questions = querySnapshot.docs.map(doc => doc.data());
                setQuestionsDB_A(questions);
            };
            
            await fetchQuestionsFromDB()
        }
        catch (e) {
            console.error(e);
        }
    }
    
    const fetchMessagesA_FromDB = async () => {
        try
        {
            // Récupérer les données de l'utilisateur dans la base de données ou l'API
            const fetchMessagesFromDB = async () => {
                const querySnapshot = await getDocs(collection(db, 'messages_partA'),orderBy("questionId", "asc"));
                const messages = querySnapshot.docs.map(doc => doc.data());
                setMessagesDB_A(messages);
            };
            
            await fetchMessagesFromDB()
        }
        catch (e) {
            console.error(e);
        }
    }
    
    const fetchQuestionsB_FromDB = async () => {
        try
        {
            // Récupérer les données de l'utilisateur dans la base de données ou l'API
            const fetchQuestionsFromDB = async () => {
                const querySnapshot = await getDocs(collection(db, 'questions_partB'),orderBy("questionId", "asc"));
                const questions = querySnapshot.docs.map(doc => doc.data());
                setQuestionsDB_B(questions);
            };
            
            await fetchQuestionsFromDB()
        }
        catch (e) {
            console.error(e);
        }
      
    }
    
    return (
        <>
            {isLoading ?
                (<p>Chargement...</p>)
                :
                (<div>
                    {isAdmin ?
                        (
                            <div className="adminPage">
                                <div className="card card-title">
                                    <h1>Portail administrateur</h1>
                                </div>
                                <div className="card info-card">
                                    <h2>Update quizz</h2>
                                    <h3>Questions A</h3>
                                    <FormQuestions questionsInput={questionsDB_A}/>
                                    <hr/>
                                    <br/>

                                    {/* This is commented out because the feature is not yet complete.
                                        The inputs need to be pushed to the database. The button currently does nothing. */}
                                    {/*<h3>Messages A</h3>*/}
                                    {/*<FormMessages messagesInput={messagesDB_A}/>*/}
                                    {/*<hr/>*/}
                                    {/*<br/>*/}

                                    <h3>Questions B</h3>
                                    <FormQuestions questionsInput={questionsDB_B}/>
                                    <hr/>
                                    <br/>
                                </div>
                                <div className="card">
                                    <h2>Seed default data in DB</h2>
                                    <div className="buttons">
                                        <InitQuestionsPartA/>
                                        <InitMessagesPartA/>
                                        <InitQuestionsPartB/>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <h1>Vous n'avez pas accès à cette page</h1>
                        
                          )
                    }
                </div>)
            }
        </>
    );
}

/**
 * Form for the questions, the user can update the question text to update it in the DB
 * @param questionsInput : the questions from the DB (array of objects)
 * @returns {JSX.Element} : the form with the questions
 * @constructor
 */
function FormQuestions ({questionsInput}){
    // State to store the question text from DB, and the updated question text from the input by the User (onChange)
    const [questions, setQuestions] = useState(questionsInput);
    
    // Update the question text in the state when the input changes (onChange)
    const handleChange = (event, index) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = event.target.value;
        setQuestions(newQuestions);
    };
    
    const getFormInputA = () => {
        const newQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            const questionId = `AQst0${i+1}`;
            const questionText = questions[i].questionText;
            const choices = ["Oui", "Non"]; // Définir les options possibles ici
            newQuestions.push({ questionId, questionText, choices });
        }
        return newQuestions;
    };
    
    const getFormInputB = () => {
        const newQuestions = [];
        
        for (let i = 0; i < questions.length; i++) {
            // Avoir un ID de type BQst01, BQst02, etc. et dès que i > 9, BQst10, BQst11, etc.
            const questionId = i < 9 ?
                                            (`BQst0${i+1}` )
                                            :
                                            (`BQst${i+1}`);
            const questionText = questions[i].questionText;
            const choices = questions[i].choices;
            const points = questions[i].points;
            const multipleChoice = questions[i].multipleChoice;
            // Vérifier si questionSecondaryText existe avant de l'utiliser
            const questionSecondaryText = questions[i].questionSecondaryText ? questions[i].questionSecondaryText : null;
            
            newQuestions.push({
                                  questionId,
                                  questionText,
                                  choices,
                                  points,
                                  multipleChoice,
                                  ...(questionSecondaryText !== null && { questionSecondaryText }) // Ajouter la propriété uniquement si elle n'est pas null
                              });
        }
        return newQuestions;
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        let collectionRef = null;
        let aggregatedData= null;
        
        // do something with the updated questions
        // Verifier la première lettre du questionId pour savoir si c'est une question A ou B
        const questionId = questions[0].questionId;
        console.log("ID VERIFICATION",questionId[0]);
        if(questionId[0] === 'A'){
            aggregatedData = getFormInputA();
            collectionRef = collection(db, 'questions_partA');
        }
        else if(questionId[0] === 'B'){
            aggregatedData = getFormInputB();
            collectionRef = collection(db, 'questions_partB');
        }
        else {
            console.error('QuestionId not valid !');
        }

        // Envoyer les données à la DB avec la methode commune
        updateQuestionsInDB(collectionRef, aggregatedData).then(r => console.log("Questions updated from form "+questionId[0]+" !"));
    };
    
    return (
        <form className="card card-result" onSubmit={handleSubmit}>
            {questions.map((question, index) => (
                <div key={question.questionId}>
                    <label htmlFor={`question${index}`}>{question.questionId} : </label>
                    <input
                        type="text"
                        id={`question${index}`}
                        name={`question${index}`}
                        value={question.questionText}
                        onChange={(event) => handleChange(event, index)}
                    />
                </div>
            ))}
            <button className="primary-button" type="submit">Update Questions</button>
        </form>
    );
}

/**
 * Form to update the messages in the DB. The messages are displayed in the form as inputs.
 * @param messagesInput : the messages from the DB (array of objects)
 * @returns {JSX.Element} : the form with the messages as inputs to update them in the DB
 * @constructor
 */
function FormMessages({ messagesInput }) {
    const [messages, setMessages] = useState(messagesInput);
    
    const handleChange = (event, index, key) => {
        const newMessages = [...messages];
        newMessages[index][key] = event.target.value;
        setMessages(newMessages);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // do something with the updated messages... (send them to the DB)
    };
    
    return (
        <form className="card card-result" onSubmit={handleSubmit}>
            {messages.map((message, index) => (
                <div key={message.messageId}>
                    <label htmlFor={`messageTitle${index}`}>Titre du message:</label>
                    <input
                        type="text"
                        id={`messageTitle${index}`}
                        value={message.messageTitle}
                        onChange={(event) => handleChange(event, index, "messageTitle")}
                    />
                    
                    <label htmlFor={`messageText${index}`}>Contenu du message:</label>
                    <textarea
                        id={`messageText${index}`}
                        value={message.messageText}
                        onChange={(event) => handleChange(event, index, "messageText")}
                    ></textarea>
                    
                    {message.messageSecondaryText && (
                        <div>
                            <label htmlFor={`messageSecondaryText${index}`}>
                                Message Secondary Text:
                            </label>
                            <textarea
                                id={`messageSecondaryText${index}`}
                                value={message.messageSecondaryText}
                                onChange={(event) =>
                                    handleChange(event, index, "messageSecondaryText")
                                }
                            ></textarea>
                        </div>
                    )}
                    
                    {message.advices && (
                        <div>
                            <label htmlFor={`advices${index}`}>Advices:</label>
                            <ul>
                                {message.advices.map((advice, adviceIndex) => (
                                    <li key={adviceIndex}>
                                        <input
                                            type="text"
                                            id={`advice${index}-${adviceIndex}`}
                                            value={advice}
                                            onChange={(event) =>
                                                handleChange(
                                                    event,
                                                    index,
                                                    `advices[${adviceIndex}]`
                                                )
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    <br/>
                    <hr/>
                </div>
                
            ))}
            <button className="primary-button" type="submit">Update Messages</button>
        </form>
    );
}




