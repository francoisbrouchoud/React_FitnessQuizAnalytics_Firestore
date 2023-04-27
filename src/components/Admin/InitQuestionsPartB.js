import React from 'react';
import { db } from '../../initFirebase';
import {doc, setDoc, collection, getDocs} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {questionDataPartB} from "../../data/survey.js";

export default function InitQuestionsPartB()
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
            const questionsRef = collection(db, "questions_partB");
            
            // Check if the collection already exists in Firestore
            const snapshot = await getDocs(questionsRef);
            const existingData = snapshot.docs.map((doc) => doc.data());
            
            // Compare the existing data with the data you want to upload
            const newData = questionDataPartB.filter((question) => {
                return !existingData.some(
                    (existingQuestion) =>
                        existingQuestion.question === question.question &&
                        existingQuestion.answer === question.answer
                );
            });
            
            // If there is new data, push it to Firestore
            if (newData.length > 0) {
                const batch = [];
                questionDataPartB.forEach((question) => {
                    if (newData.some((newQuestion) => newQuestion === question)) {
                        const docRef = doc(questionsRef, question.questionId.toString() );
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
        <button className="primary-button" onClick={uploadQuestions}>Initialize Questions Part 2 in DB</button>
    )
}
