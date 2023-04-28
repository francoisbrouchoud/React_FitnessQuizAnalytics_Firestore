import React from 'react';
import { db } from '../../initFirebase';
import {doc, setDoc, collection, getDocs} from "firebase/firestore";
import {messageDataPartA, questionDataPartA} from "../../data/survey.js";
import {updateQuestionsInDB} from "./UpdateFirestore";

/**
 * Uploads the questions to Firestore if they don't already exist. This function is only used once to upload the questions.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InitMessagesPartA()
{
    async function uploadQuestions() {
        const collectionRef = collection(db, "messages_partA");
        const aggregatedData= messageDataPartA;
        
        updateQuestionsInDB(collectionRef, aggregatedData).then(r => console.log("Messages updated from SEED !"));
        
    }
    
    return (
        <button className="primary-button" onClick={uploadQuestions}>Initialize Messages Part A in DB</button>
    )
}
