import firebaseApp, {db} from "../initFirebase";
import {collection, getDocs} from 'firebase/firestore';
import { Link } from "react-router-dom";

export default function Home() {
  // Sign out
  const handleSignOutClick = async () => {
    await firebaseApp.auth().signOut();
  };
  
  async function getQuestions (db)
   {
       const questionsCol  = collection(db, 'questions');
       const questionSnapshot = await getDocs(questionsCol);
       const questionList = questionSnapshot.docs.map((doc) => doc.data());
       //return questionList;
       getQuestions(db).then((questions) => console.log(questions))
       //console.log(questions.toString());
       
   };
  
  return (
    <div>
      <h1>Welcome to the Fitness Check!</h1>
      <p>
        <Link to="/questionnaire">Go To Questionnaire</Link>
      </p>
      <button onClick={handleSignOutClick}>Sign Out</button>
      
      <button onClick={getQuestions}>DB Get Data</button>
      
      

    </div>
    
  );
}
