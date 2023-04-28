import React from "react";
import {collection, getDocs, orderBy} from "firebase/firestore";
import {db} from "../../initFirebase";

/**
 * Retrieve the list of question form the Firestore collection
 * @param path - the path of the collection in Firestore, for example: questions_partA or question_partB
 * @returns {Promise<Array<Object>>} retrieves the questionsData in an array of objects
 */
export async function GetQuestions(path)
{
	try {
		const questionsCollection = collection(db, path);
		const questionsSnapshot = await getDocs(questionsCollection, orderBy("questionId", "asc"));
		const questionsData = questionsSnapshot.docs.map(doc => doc.data());
		return questionsData;
	} catch (error) {
		console.error("Error fetching questions: ", error);
		throw error;
	}
}






