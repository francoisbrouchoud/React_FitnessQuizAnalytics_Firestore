import React from 'react';
import { db } from '../initFirebase';
import {doc, setDoc, collection, getDocs} from "firebase/firestore";
import firebase from "firebase/compat/app";

// This variable is used to store the current question to initialize the firestore database if it is empty.
export const initQuestionsPart2Data =
   [
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

export default function InitQuestionsPart2()
{
    // Upload data ordre random
    /*
    async function uploadQuestions() {
        try {
            // Get a reference to the "questions" collection in Firestore
            const questionsRef = collection(db, 'questions');
            // batch to store the setDoc operations that will be performed in the batch.
            const batch = [];   // Array of write operations to be performed in a single batch
            
            initQuestionsPart2Data.forEach((question) => {
                //  create a new document reference using the doc function,  automatically generates a unique ID for the document
                const docRef = doc(questionsRef);
                batch.push(setDoc(docRef, question));
            });
            await Promise.all(batch);
            console.log('Questions successfully uploaded to Firestore!');
        } catch (error) {
            console.error('Error uploading questions to Firestore: ', error);
        }
    }
    */
    
    //1) Check if the collection already exists in Firestore.
    //2) If the collection exists, retrieve the documents and compare them with the data you want to upload.
    //3) If the data is the same as what is already in the collection, do not push the data.
    //4) If the collection does not exist or the data is different, push the data.
    
    // Upload data ordre random - Pas de doublons
    /*async function uploadQuestions() {
        try {
            // Get a reference to the "questions" collection in Firestore
            const questionsRef = collection(db, 'questions');
            
            // Check if the collection already exists in Firestore
            const snapshot = await getDocs(questionsRef);
            const existingData = snapshot.docs.map(doc => doc.data());
            
            // Compare the existing data with the data you want to upload
            const newData = initQuestionsPart2Data.filter(question => {
                return !existingData.some(existingQuestion =>
                                              existingQuestion.question === question.question &&
                                              existingQuestion.answer === question.answer
                );
            });
            
            // If there is new data, push it to Firestore
            if (newData.length > 0) {
                const batch = [];
                newData.forEach(question => {
                    const docRef = doc(questionsRef);
                    batch.push(setDoc(docRef, question));
                });
                await Promise.all(batch);
                console.log('Questions successfully uploaded to Firestore!');
            } else {
                console.log('No new questions to upload.');
            }
            
        } catch (error) {
            console.error('Error uploading questions to Firestore: ', error);
        }
    }*/
    
    // Upload data ordre non random - Pas de doublons
    async function uploadQuestions() {
        try {
            // Get a reference to the "questions" collection in Firestore
            const questionsRef = collection(db, "questions");
            
            // Check if the collection already exists in Firestore
            const snapshot = await getDocs(questionsRef);
            const existingData = snapshot.docs.map((doc) => doc.data());
            
            // Compare the existing data with the data you want to upload
            const newData = initQuestionsPart2Data.filter((question) => {
                return !existingData.some(
                    (existingQuestion) =>
                        existingQuestion.question === question.question &&
                        existingQuestion.answer === question.answer
                );
            });
            
            // If there is new data, push it to Firestore
            if (newData.length > 0) {
                const batch = [];
                initQuestionsPart2Data.forEach((question) => {
                    if (newData.some((newQuestion) => newQuestion === question)) {
                        const docRef = doc(questionsRef);
                        batch.push(setDoc(docRef, question));
                    }
                });
                await Promise.all(batch);
                console.log("Questions successfully uploaded to Firestore!");
            } else {
                console.log("No new questions to upload.");
            }
        } catch (error) {
            console.error("Error uploading questions to Firestore: ", error);
        }
    }
    
    return (
        <>
            <button onClick={uploadQuestions}>Initialize Questions Part 2 in DB</button>
        </>
    )
}
