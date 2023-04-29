import {auth, db} from "../../initFirebase";
import {setDoc, Timestamp, doc} from "firebase/firestore";

/**
 * Set the results of the quiz to the Firestore database
 * in the user's document in the results collection with the date as the document name
 * @param resultsA : results of the quiz A
 * @param resultsB : results of the quiz B
 * @param resultsC : results of the quiz C (group leader)
 * @returns {Promise<void>} : nothing
 * @constructor
 */
export default async function SetResultsToFirebase(resultsA, resultsB, resultsC){
    try {
        const timestamp = Timestamp.now();
        const date = timestamp.toDate();
        const formattedDate = date.toLocaleString("fr-CH", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Europe/Zurich"
        }).replace(/[/:\s]/g, "-");

        resultsB.unshift(resultsA)
        const userResultRef = doc(db, "users", auth.currentUser.email, "results", formattedDate);
        await setDoc(userResultRef, {
            groupLeader: resultsC,
            date: formattedDate,
            results: resultsB
        });
    } catch (e) {
        console.error("ErrorSettingResult : ", e);
    }
}