import React from 'react';
import { db } from '../../initFirebase';
import { collection} from "firebase/firestore";
import {questionDataPartA} from "../../data/survey.js";
import {updateQuestionsInDB} from "./UpdateFirestore";

/**
 * SEED DEFAULT QUESTIONS PART A
 * Uploads and overwrites the questions to Firestore even if they already exist.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InitQuestionsPart2()
{
    async function uploadQuestions() {
        const collectionRef = collection(db, "questions_partA");
        const aggregatedData= questionDataPartA;
        
        updateQuestionsInDB(collectionRef, aggregatedData).then(r => console.log("Questions updated from SEED !"));
        
    }
    
    return (
        <button className="primary-button" onClick={uploadQuestions}>Initialize Questions Part A in DB</button>
    )
}
