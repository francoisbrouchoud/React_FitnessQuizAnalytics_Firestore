import {auth, db} from "../initFirebase";
import {setDoc, serverTimestamp, Timestamp, doc} from "firebase/firestore";

export default async function SetResultsToFirebase(resultsA, resultsB){
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
        console.log(formattedDate); // Output: 2023-04-17-16-22-30

        resultsB.unshift(resultsA)
        console.log(resultsB)
        const userResultRef = doc(db, "users", auth.currentUser.email, "results", formattedDate);
        await setDoc(userResultRef, {
            date: formattedDate,
            results: resultsB
        });
    } catch (e) {
        console.error("ErrorSettingResult : ", e);
    }
}