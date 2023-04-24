import React, {useEffect, useState} from "react";
import firebaseApp, {auth, db} from "../initFirebase";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";

// Page to display the questions of the DB, and to update them if needed.
// The page is only accessible to admins.
// All the questions are displayed in a form, and the admin can update them by clicking on the "Update" button.
export default function Admins() {

    const [questionsDB, setQuestionsDB] = useState([]);
    
    // Fetch the questions from the DB and store them in the state
    useEffect(() => {}, [questionsDB]);
    
    return (
        <div className="card profile-card">
            <h1>Questions</h1>
            <img className="profileIcon" src={require('../Pictures/avatarHomme.png')}/>
            <div className="questions">
                <QuestionsEditForm questionsDB={questionsDB} />
            </div>
        </div>
    );
    

}

function QuestionsEditForm({questionsDB}) {

    return (
        <div>
            {questionsDB.map((question) => (
                <Question key={question.id} {...question}
                />
                
            ))}
        </div>
    );
}






