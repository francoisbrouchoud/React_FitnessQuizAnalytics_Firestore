import React from 'react';
import { db } from '../../initFirebase';
import {doc, setDoc, collection, getDocs} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {questionDataPartA, questionDataPartB} from "../../data/survey.js";
import {updateQuestionsInDB} from "./UpdateFirestore";

export default function InitQuestionsPartB()
{
    async function uploadQuestions() {
        const collectionRef = collection(db, "questions_partBB");
        const aggregatedData= questionDataPartB;
        
        updateQuestionsInDB(collectionRef, aggregatedData).then(r => console.log("Questions updated from SEED !"));
        
    }
    
    return (
        <button className="primary-button" onClick={uploadQuestions}>Initialize Questions Part B in DB</button>
    )
}
