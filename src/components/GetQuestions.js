import React, {useEffect, useState} from "react";
import {collection, getDocs, orderBy} from "firebase/firestore";
import {db} from "../initFirebase";

export async function GetQuestions()
{
	// variable to store the questions from the database
	try {
		const questionsCollection = collection(db, "questions_partB");
		const questionsSnapshot = await getDocs(questionsCollection, orderBy("questionId", "asc"));
		const questionsData = questionsSnapshot.docs.map(doc => doc.data());
		return questionsData;
	} catch (error) {
		console.error("Error fetching questions:", error);
		throw error;
	}


}

export async function GetQuestionsPartA()
{
	// variable to store the questions from the database
	try {
		const questionsCollection = collection(db, "questions_partA");
		const questionsSnapshot = await getDocs(questionsCollection, orderBy("questionId", "asc"));
		const questionsData = questionsSnapshot.docs.map(doc => doc.data());
		return questionsData;
	} catch (error) {
		console.error("Error fetching questions:", error);
		throw error;
	}
	
	
}




