import React, {useEffect, useState} from "react";
import firebaseApp, {auth, db} from "../initFirebase";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import InitQuestionsPartA from "../components/Admin/InitQuestionsPartA";
import InitQuestionsPartB from "../components/Admin/InitQuestionsPartB";
import InitMessagesPartA from "../components/Admin/InitMessagesPartA";

// Page to display the questions of the DB, and to update them if needed.
// The page is only accessible to admins.
// All the questions are displayed in a form, and the admin can update them by clicking on the "Update" button.
export default function Admin() {

    const [messages_A, setMessages_A] = useState([]);
    const [questionsDB_A, setQuestionsDB_A] = useState([]);
    const [questionsDB_B, setQuestionsDB_B] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
        console.log('useEffect Admin');
        
        checkIfAdmin().then(r => console.log('checkIfAdmin done !'))
        
        getDB().then(r => console.log('getDB done !'))
       
        
    }, [isAdmin]);
    
    // Check if the user is an admin
    const checkIfAdmin = async () => {
        const user = auth.currentUser;
        const userDoc = await getDoc(doc(db, "users", user.email));
        const userData = await userDoc.data();
        console.log('User Data : ', userData);
        const userIsAdmin = userData.isAdmin;
        console.log('User is Admin ? : ', userIsAdmin);
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
                console.log('GetDB - isLoading - finally start', isLoading);
                await setIsLoading(false);
                console.log('GetDB - isLoading - finally end', isLoading);
            }
        }
    }
    
    const fetchQuestionsA_FromDB = async () => {
        try
        {
            // Récupérer les données de l'utilisateur dans la base de données ou l'API
            const fetchQuestionsFromDB = async () => {
                const querySnapshot = await getDocs(collection(db, 'questions_partA'));
                const questions = querySnapshot.docs.map(doc => doc.data());
                setQuestionsDB_A(questions);
                console.log('Questions A fetched !', questions);
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
                const querySnapshot = await getDocs(collection(db, 'messages_partA'));
                const messages = querySnapshot.docs.map(doc => doc.data());
                setMessages_A(messages);
                console.log('Messages A fetched !', messages);
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
                const querySnapshot = await getDocs(collection(db, 'questions_partB')); // TODO : CHANGER NOM
                const questions = querySnapshot.docs.map(doc => doc.data());
                setQuestionsDB_B(questions);
                console.log('Questions B fetched !', questions);
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
                            <>
                                <h1>ADMIN PORTAIL</h1>
                                
                                <h1>Update quizz</h1>
                                <h2>Questions A</h2>
                                <FormQuestions questionsInput={questionsDB_A}/>
                                <hr/>
                                <br/>
                                
                                <h2>Messages A</h2>
                                <FormMessages messagesInput={messages_A}/>
                                <hr/>
                                <br/>
                                
                                <h2>Questions B</h2>
                                <FormQuestions questionsInput={questionsDB_B}/>
                                <hr/>
                                <br/>
                                
                                
                                
                                <h1>Seed default data in DB</h1>
                                <InitQuestionsPartA/>
                                <InitQuestionsPartB/>
                                <InitMessagesPartA/>
                            </>
                            
                            // DANS UN FORM :
                            // Afficher liste messages A
                            // Afficher liste questions A
                            // Afficher liste questions B
                            
                            
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

function FormQuestions ({questionsInput}){
    const [questions, setQuestions] = useState(questionsInput);
    
    useEffect(() => {
        
        //console.log(questionsInput, questions);
        
    }, [questionsInput]);
    
    const handleChange = (event, index) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = event.target.value;
        setQuestions(newQuestions);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // do something with the updated questions
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
                <div key={question.questionId}>
                    {/*<label htmlFor={`question${index}`}>{question.questionText}</label>*/}
                    <label htmlFor={`question${index}`}>{question.questionId} : </label>
                    <input
                        type="text"
                        id={`question${index}`}
                        value={question.questionText}
                        onChange={(event) => handleChange(event, index)}
                        style={{ width: 'fit-content' }}
                    />
                </div>
            ))}
            <button type="submit">Update Questions</button>
        </form>
    );
}

function FormMessages({ messagesInput }) {
    const [messages, setMessages] = useState(messagesInput);
    
    useEffect(() => {
         console.log(messagesInput, messages);
    }, [messagesInput]);
    
    const handleChange = (event, index, key) => {
        const newMessages = [...messages];
        newMessages[index][key] = event.target.value;
        setMessages(newMessages);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // do something with the updated messages
    };
    
    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Update Messages</button>
        </form>
    );
}




