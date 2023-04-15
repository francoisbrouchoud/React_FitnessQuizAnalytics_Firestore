import React, {useEffect, useState} from "react";
import {collection, getDocs, orderBy} from "firebase/firestore";
import {db} from "../initFirebase";

export default function GetQuestions()
{
	// variable to store the questions from the database
	const [questions, setQuestions] = useState([]);
	
	useEffect(() => {
		fetchQuestions().then(r => console.log("Questions fetched from DB"));
	}, []);
	
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
	// return (
	// 	<>
	// 		{/* POUR MODE ADMIN
	// 		<button onClick={fetchQuestions}>DB Get Data</button>*/}
	// 		{/*<p>{JSON.stringify(questions)}</p>*/}
	//
	// 		{questions}
	// 	</>
	// );
	return (
			// I want to return the variable "questions" which is an array of objects (questions) from the database, to the caller of this function.
		JSON.stringify(questions)
		
	);
}


