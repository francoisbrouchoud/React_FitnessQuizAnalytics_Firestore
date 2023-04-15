import React, {useState} from "react";
import {collection, getDocs, orderBy} from "firebase/firestore";
import {db} from "../initFirebase";

export default function GetQuestions()
{
	// variable to store the questions from the database
	const [questions, setQuestions] = useState([]);
	
	// function to get the questions from the database and store them in the questions variable
	const fetchQuestions = async () =>
	{
		try
		{

			const questionsCollection = collection(db, 'questions_partB');
			const questionsSnapshot = await getDocs(questionsCollection, orderBy("questionId", "asc"));
			const questionsData = questionsSnapshot.docs.map(doc => doc.data());
			setQuestions(questionsData);
		
		}
		catch (error)
		{
			console.error('Error fetching questions: ', error);
		}
		
	};
	
	// return the questions variable in the p tag and the fetchQuestions function in the button tag
	return (
		<>
			<button onClick={fetchQuestions}>DB Get Data</button>
			<p>{JSON.stringify(questions)}</p>
			
		</>
	);
}

