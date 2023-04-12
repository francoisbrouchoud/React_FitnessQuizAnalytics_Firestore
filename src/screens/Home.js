import firebaseApp, {db} from "../initFirebase";
import {collection, getDocs} from 'firebase/firestore';
import { Link } from "react-router-dom";
import {useState} from "react";
import GetQuestions from "../components/GetQuestions";
import InitQuestionsPart2 from "../components/InitQuestionsPart2";

export default function Home() {
  
  // Sign out
  const handleSignOutClick = async () => {
    await firebaseApp.auth().signOut();
  };
  
  
  
  
  
  
  return (
    <div>
      <h1>Welcome to the Fitness Check!</h1>
      <p>
        <Link to="/questionnaire">Go To Questionnaire</Link>
      </p>
      <button onClick={handleSignOutClick}>Sign Out</button>
      
      <GetQuestions />
      <InitQuestionsPart2/>
      
    </div>
    
  );
}
