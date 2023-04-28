import React from 'react';
import { db } from '../../initFirebase';
import {collection} from "firebase/firestore";
import { questionDataPartB} from "../../data/survey.js";
import {updateQuestionsInDB} from "./UpdateFirestore";

/**
 * SEED DEFAULT QUESTIONS PART B
 * Uploads and overwrites the questions to Firestore even if they already exist.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InitQuestionsPartB()
{
    async function uploadQuestions() {
        const collectionRef = collection(db, "questions_partB");
        const aggregatedData= questionDataPartB;
        
        updateQuestionsInDB(collectionRef, aggregatedData).then(r => console.log("Questions updated from SEED !"));
        
    }
    
    return (
        <button className="primary-button" onClick={uploadQuestions}>Initialize Questions Part B in DB</button>
    )
}
