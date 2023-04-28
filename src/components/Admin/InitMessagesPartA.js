import React from 'react';
import { db } from '../../initFirebase';
import { collection} from "firebase/firestore";
import {messageDataPartA} from "../../data/survey.js";
import {updateQuestionsInDB} from "./UpdateFirestore";

/**
 * SEED DEFAULT MESSAGES PART A
 * Uploads and overwrites the questions to Firestore even if they already exist.
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
