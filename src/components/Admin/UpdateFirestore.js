import React from 'react';
import { db } from '../../initFirebase';
import {doc, getDocs, deleteDoc, writeBatch} from "firebase/firestore";

/**
 * Uploads the questions to Firestore if they don't already exist.
 * This function is only used once to upload the questions.
 * @param collectionRef : reference to the collection in Firestore
 * @param data : array of questions to be uploaded to Firestore (each question is an object). It depends on the format of the questions in the database.
 * @returns {Promise<void>} : nothing
 */
export const updateQuestionsInDB = async (collectionRef, data) => {
    try
    {
        // Check if the collection already exists in Firestore
        // If it exists, remove the collection
        const snapshot = await getDocs(collectionRef);
        if (snapshot.size > 0) {
            snapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });
        }
        
        // Upload the new data using batched writes
        // Access only once the database, instead of once per document
        const batch = writeBatch(db); // batch to store the setDoc operations that will be performed in the batch.
        // Array of write operations to be performed in a single batch (batched writes)
        data.forEach((question) => {
            const id = question.questionId ? question.questionId : question.messageId; // If the question has a questionId, use it, otherwise use the messageId
            const docRef = doc(collectionRef, id); //
            batch.set(docRef, question);
        });
        await batch.commit().then( () => {console.log('Questions successfully uploaded to Firestore!')});
    }
    catch (error) {
        console.error('Error uploading questions to Firestore: ', error);
        throw error;
    }
}