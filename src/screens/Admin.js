import React, {useEffect, useState} from "react";
import firebaseApp, {auth, db} from "../initFirebase";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";

// Page to display the questions of the DB, and to update them if needed.
// The page is only accessible to admins.
// All the questions are displayed in a form, and the admin can update them by clicking on the "Update" button.
export default function Admin() {

    const [messages_A, setMessages_A] = useState([]);
    const [questionsDB_A, setQuestionsDB_A] = useState([]);
    const [questionsDB_B, setQuestionsDB_B] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    
    // TODO : METTRE TOUS CES APPELS A LA DB DANS UN SEUL USE EFFECT, AINSI ON PEUT
    // TODO : GERER COORECTEMENT LE LOADING ET LES ERREURS (TRY CATCH)
    // TODO : ET ON AURA QU'UN SEUL APPEL A LA DB A CHAQUE FOIS QU'ON RECHARGE LA PAGE (AU LIEU DE 4)
    // TODO : NE FAIRE CET APPELS A LA DB QUE SI ON EST ADMIN
    
    useEffect(() => {
        getDB().then(r => console.log('getDB done !'));
    }, [isAdmin]);
    
    const getDB = async () => {
        
        if(isAdmin)
        {
            try
            {
                setIsLoading(true);
                fetchQuestionsA_FromDB();
                fetchMessagesA_FromDB();
                fetchQuestionsB_FromDB();
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
            
            fetchQuestionsFromDB()
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
            
            fetchMessagesFromDB()
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
            
            fetchQuestionsFromDB()
        }
        catch (e) {
            console.error(e);
        }
    }
    
    
    //
    // useEffect(() => {
    //     try
    //     {
    //         setIsLoading(true);
    //         // Récupérer les données de l'utilisateur dans la base de données ou l'API
    //         const fetchMessagesFromDB = async () => {
    //             const querySnapshot = await getDocs(collection(db, 'messages_partA'));
    //             const messages = querySnapshot.docs.map(doc => doc.data());
    //             setMessages_A(messages);
    //             console.log('Messages A fetched !', messages);
    //         };
    //
    //         fetchMessagesFromDB()
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
    //     finally
    //     {
    //         setIsLoading(false);
    //     }
    // }, [messages_A]);
    //
    // // Fetch the questions from the DB and store them in the state
    // useEffect(() => {
    //     try
    //     {
    //         setIsLoading(true);
    //         // Récupérer les données de l'utilisateur dans la base de données ou l'API
    //         const fetchQuestionsFromDB = async () => {
    //             const querySnapshot = await getDocs(collection(db, 'questions_partB')); // TODO : CHANGER NOM
    //             const questions = querySnapshot.docs.map(doc => doc.data());
    //             setQuestionsDB_B(questions);
    //             console.log('Questions B fetched !', questions);
    //         };
    //
    //         fetchQuestionsFromDB()
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
    //     finally
    //     {
    //         setIsLoading(false);
    //     }
    // }, [questionsDB_B]);
    //
    //
    // // Fetch the current user's data from the DB and store them in the state
    // useEffect(() => {
    //     try
    //     {
    //         setIsLoading(true);
    //         // Récupérer les données de l'utilisateur dans la base de données ou l'API
    //         const fetchUserDataFromDB = async () => {
    //             const docRef = doc(db, 'users', auth.currentUser.email );
    //             const docSnap = await getDoc(docRef);
    //             if (docSnap.exists()) {
    //                 const data = docSnap.data();
    //                 setIsAdmin(data.isAdmin);
    //                 console.log('Users Data fetched , is admin ?', data);
    //             } else {
    //                 console.error('No such document!');
    //             }
    //         };
    //
    //         fetchUserDataFromDB()
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
    //     finally
    //     {
    //         setIsLoading(false);
    //     }
    //
    // }, [isAdmin]);
    
    
    return (
        <>
            {isLoading ?
                (<p>Chargement...</p>)
                :
                (<div>
                    {isAdmin ?
                        (
                            
                            <h1>ADMIN PORTAIL</h1>
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





