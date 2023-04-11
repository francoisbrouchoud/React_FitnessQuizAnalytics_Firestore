import firebaseApp, {db} from "../initFirebase";
import {collection, getDocs} from 'firebase/firestore';
import { Link } from "react-router-dom";
import {useState} from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  
  // Sign out
  const handleSignOutClick = async () => {
    await firebaseApp.auth().signOut();
  };
  
  const fetchQuestions = async () =>
  {
      const questionsCollection = collection(db, 'questions');
      const questionsSnapshot = await getDocs(questionsCollection);
      const questionsData = questionsSnapshot.docs.map(doc => doc.data());
      setQuestions(questionsData);
  
  };
  
  
  
  
  return (
    <div>
      <h1>Welcome to the Fitness Check!</h1>
      <p>
        <Link to="/questionnaire">Go To Questionnaire</Link>
      </p>
      <button onClick={handleSignOutClick}>Sign Out</button>
      
      <button onClick={fetchQuestions}>DB Get Data</button>
      <p>{JSON.stringify(questions)}</p>
    </div>
    
  );
}
