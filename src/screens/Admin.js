import React, {useEffect, useState} from "react";
import firebaseApp, {auth, db} from "../initFirebase";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import InitQuestionsPartA from "../components/InitQuestionsPartA";
import InitQuestionsPart2 from "../components/InitQuestionsPart2";
import InitMessagesPartA from "../components/InitMessagesPartA";

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
        
        checkIfAdmin().then(r => console.log('checkIfAdmin done !'));
        
        getDB().then(r => console.log('getDB done !'));
        
    }, []);
    
    // Check if the user is an admin
    const checkIfAdmin = async () => {
        const user = firebaseApp.auth().currentUser;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        const userIsAdmin = userData.isAdmin;
        setIsAdmin(userIsAdmin);
        console.log('User is admin ? ', userIsAdmin);
    }
    
    const getDB = async () => {
        if(isAdmin)
        {
            try
            {
                setIsLoading(true);
                Promise.all([     fetchQuestionsA_FromDB(),
                                        fetchMessagesA_FromDB(),
                                        fetchQuestionsB_FromDB()
                                   ]).then(r => console.log('All DB fetched !'));
                // await fetchQuestionsA_FromDB();
                // await fetchMessagesA_FromDB();
                // await fetchQuestionsB_FromDB();
            }
            catch (e) {
                console.error(e);
            }
            finally
            {
                setIsLoading(false);
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
                                {/*// SEED DB*/}
                                <InitQuestionsPartA/>
                                <InitQuestionsPart2/>
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





