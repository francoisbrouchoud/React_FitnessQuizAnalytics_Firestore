import React, {useEffect, useState} from "react";
import {collection, doc, getDocs, getDoc} from "firebase/firestore";
import {db,auth} from "../initFirebase";

//initial table containing the points of questions
let responseSurvey = [
    { id: "AQst", points : "0"},
    { id: "BQst01", points: "0" },
    { id: "BQst02", points: "0" },
    { id: "BQst03", points: "0" },
    { id: "BQst04", points: "0" },
    { id: "BQst05", points: "0" },
    { id: "BQst06", points: "0" },
    { id: "BQst07", points: "0" },
    { id: "BQst08", points: "0" },
    { id: "BQst09", points: "1" },
    { id: "BQst10", points: "5" },
    { id: "BQst11", points: "5" },
    { id: "BQst12", points: "0" },
    { id: "BQst13", points: "0" },
    { id: "BQst14", points: "0" },
    { id: "BQst15", points: "0" },
];

/**
 * Get a list of questionnaires for a user
 * @returns {Promise<DocumentData[]>}
 * @constructor
 */
export function ManagesResults() {

    const getListQuestionnaires = async () => {

        //get Docs from Firestore
        const querySnapshot = await getDocs(collection(db, "users",auth.currentUser.email,"results"));

        const tab = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return data;
        });
        return tab;
    }

    return getListQuestionnaires();
}

/**
 * Get all results for a specified questionnaire
 * @param name - name of the questionnaire
 * @returns {Promise<null|*|[{id: string, points: string},...>}
 * @constructor
 */
export async function GetResultsFromQuestionnaire(name){
        try{
            console.log("name :",name)
            const docRef = doc(db,"users",auth.currentUser.email,"results",name);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            //collect the data saved in the result doc
            const myResultsArray = data.results;

            //copy of myResultsArray inside reponseSurvey
            responseSurvey = myResultsArray.slice();

            return responseSurvey;
        } catch (e){
            console.log("Error :" + e);
            return null;
        }
}

/**
 * Get all messages saved inside a collection
 * @returns {Promise<DocumentData[]>}
 * @constructor
 */
export function GetMessages() {
    const getAllMessages = async () => {

        const querySnapshot = await getDocs(collection(db, "messages_partA"));

        const tab = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return data;
        });
        return tab;
    }
    return getAllMessages();
}

/**
 * Function for determining the recommendations and messages to be displayed based on the questionnaire results
 * @returns {JSX.Element}
 * @constructor
 */
export function GetResults() {
    const [messages,setMessages] = useState([]);

    useEffect(() => {
        async function fetchMessages() {
            const messagesList = await GetMessages();
                setMessages(messagesList);
        }
        fetchMessages();

        console.log("Messages : ",messages.toString())
    },[]);

    //Recommendation for the duration of the road
    let propositionRoadMessage = "Définir une route de ";
    let propositionRoadResult = responseSurvey[3].points;

    switch (propositionRoadResult) {
        case "0":
        case "1":
            propositionRoadMessage = "Pas de marche";
            break;
        case "4":
            propositionRoadMessage += "5 min de marche";
            break;
        case "7":
            propositionRoadMessage += "15 min de marche";
            break;
        case "10":
            propositionRoadMessage += "30 min de marche";
            break;
        case "13":
            propositionRoadMessage += "1h de marche";
            break;
        case "16":
            propositionRoadMessage += "2h de marche";
            break;
        case "19":
            propositionRoadMessage += "3h de marche";
            break;
        default:
            propositionRoadMessage = "Résultat inconnu";
    }

    //Recommendation for the walking speed
    let walkingSpeedMessage = "";
    let walkingSpeedResult = responseSurvey[2].points;

    switch(walkingSpeedResult) {
        case "1":
            walkingSpeedMessage = "Augmenter le temps indiqué de 30%";
            break;
        case "2":
            walkingSpeedMessage = "Augmenter le temps indiqué de 10%";
            break;
        case "3":
            walkingSpeedMessage = "Garder le temps indiqué";
            break;
        case "4":
            walkingSpeedMessage = "Réduire le temps indiqué de 10%";
            break;
        case "5":
            walkingSpeedMessage = "Réduire le temps indiqué de 30%";
            break;
        default:
            walkingSpeedMessage = "Résultat inconnu";
    }

    //Recommendation for the path
    let pathMessage = "";

    if (responseSurvey[10].points === 1) {
        pathMessage = "Pas de chemin exposés";
    } else {
        pathMessage = "Chemins exposés possibles";
    }

    //Recommendation for the altitude difference
    let bqst06Result = responseSurvey[6].points;
    let bqst07Result = responseSurvey[7].points;
    let bqst08Result = responseSurvey[8].points;
    let climbUpstairsMessage = "";

    switch(bqst08Result){
        case "10":
            switch(bqst07Result){
                case "5":
                    switch(bqst06Result){
                        case "0":
                            climbUpstairsMessage="Pas de dénivelé possible"
                            break;
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                            climbUpstairsMessage="Seulement des dénivelés très faibles possibles"
                            break;
                        default:
                            climbUpstairsMessage="Erreur"
                    }
                    break;
                case "6":
                case "7":
                case "8":
                case "9":
                    climbUpstairsMessage="Seulement des dénivelés faibles à modérés possibles"
                    break;
                default:
                    climbUpstairsMessage="Erreur"
            }
            break;
        case "11":
        case "12":
            climbUpstairsMessage="Dénivelés modérés possibles"
            break;
        case "13":
        case "14":
            climbUpstairsMessage="Dénivelés importants possibles"
            break;
        default:
            climbUpstairsMessage="Erreur"
    }

    //Recommendation for the falls risks
    let fallsRiskResult = 0;
    let fallsRiskMessage = "";

    for (let i = 12; i <= 14; i++) {
        const reponse = responseSurvey[i];
        const points = parseInt(reponse.points);
        if (!isNaN(points)) {
            fallsRiskResult += points;
        }
    }

    switch (fallsRiskResult) {
        case 0:
            fallsRiskMessage =
                "Pas de problème avec l'équilibre ou des risque de chute; pas de propositions nécessaires";
            break;
        case 1:
            fallsRiskMessage =
                "Chemins sans trop de difficultés (risque de chute) et randonées accompagnées";
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            fallsRiskMessage =
                "Randonées accompagnées ou des chemins simples";
            break;
        default:
            fallsRiskMessage = "Erreur";
    }


    //Determining the messages for the physical activity section
    let messagesAResults = responseSurvey[0].points;
    let messagesAMessage = "";

    switch(messagesAResults){
        case "1":
            messagesAMessage=messages[0].messageText+"\n"+messages[0].advices[0]+"\n"+messages[0].advices[1];
            break;
        case "2":
            messagesAMessage=messages[1].messageText+"\n"+messages[1].advices[0];
            break;
        case "3":
            messagesAMessage=messages[2].messageText+"\n"+messages[2].advices[0]+"\n"+messages[2].advices[1]+"\n"+messages[2].advices[2];
            break;
        case "4":
            messagesAMessage=messages[3].messageText;
            break;
        case "5":
            messagesAMessage=messages[4].messageText+"\n"+messages[4].advices[0];
            break;
        case "6":
            messagesAMessage=messages[5].messageText+"\n"+messages[5].messageSecondaryText[0]+"\n"+messages[5].messageSecondaryText[1]+"\n"+messages[5].messageSecondaryText[2]+"\n"+messages[5].messageSecondaryText[3];
            break;
        default:
            messagesAMessage = "Erreur"
    }

    //list of substrings for bulleted list display
    const messageLines = messagesAMessage.split("\n");

    return (
        <div>
            <h2>Recommandations</h2>
            <ul>
                <li>{propositionRoadMessage}</li>
                <li>{walkingSpeedMessage}</li>
                <li>{pathMessage}</li>
                <li>{climbUpstairsMessage}</li>
                <li>{fallsRiskMessage}</li>
            </ul>
            <h2>Activité physique</h2>
            <ul>
                {messageLines.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Calculation of the percentage according ot the results of the physical activity questions
 * @returns {number} - percentage
 * @constructor
 */
export function GetPhysicalActivity(){
    const qA01res = parseInt(responseSurvey[0].points);
    const percentage = qA01res / 6 * 100;
    return percentage;

}

/**
 * Calculation of the percentage according ot the results of walking without aids question
 * @returns {number} - percentage
 * @constructor
 */
export function GetWalkingWithoutAidsPercentage(){
    const qB01res = parseInt(responseSurvey[1].points);
    const percentage = qB01res / 5 * 100;
    return percentage;
}

/**
 * Calculation of the percentage according ot the results of speed walking question
 * @returns {number} - percentage
 * @constructor
 */
export function GetSpeedWalkingPercentage(){
    const qB02res = parseInt(responseSurvey[2].points);
    const percentage = qB02res / 5 * 100;
    return percentage;
}

/**
 * Calculation of the percentage according ot the results of walking time questions
 * @returns {number} - percentage
 * @constructor
 */
export function GetWalkingTimePercentage(){
    const qB03res = parseInt(responseSurvey[3].points);
    const qB04res = parseInt(responseSurvey[4].points);
    const qB05res = parseInt(responseSurvey[5].points);
    const percentage = (qB03res+qB04res+qB05res)/60*100;
    return percentage;
}

/**
 * Calculation of the percentage according ot the results of climb abilities questions
 * @returns {number} - percentage
 * @constructor
 */
export function GetAbilityClimbPercentage(){
    const qB06res = parseInt(responseSurvey[6].points);
    const qB07res = parseInt(responseSurvey[7].points);
    const qB08res = parseInt(responseSurvey[8].points);
    const percentage = (qB06res+qB07res+qB08res)/27*100;
    return percentage;
}

/**
 * Calculation of the percentage according ot the results of walking insecurities questions
 * @returns {number} - percentage
 * @constructor
 */
export function GetWalkingInsecurityPercentage(){
    const qB13res = parseInt(responseSurvey[13].points);
    const qB14res = parseInt(responseSurvey[14].points);
    const qB12res = parseInt(responseSurvey[12].points);
    const percentage = (qB13res+qB14res+qB12res)/5*100;
    return percentage;
}

/**
 * Calculation of the percentage according ot the results of not fear hights question
 * @returns {number} - percentage
 * @constructor
 */
export function GetNotFearHeightsPercentage(){
    const qB09res = parseInt(responseSurvey[9].points);
    const percentage = 100-(qB09res/1*100);
    return percentage;
}

/**
 * Calculation of the percentage according ot the results of balance question
 * @returns {number} - percentage
 * @constructor
 */
export function GetBalancePercentage(){
    const qB15res = parseInt(responseSurvey[15].points);
    const percentage = qB15res/2* 100;
    return percentage;
}

/**
 * Calculation of the percentage according ot the results of painless question
 * @returns {number} - percentage
 * @constructor
 */
export function GetPainlessPercentage(){
    const qB10res = parseInt(responseSurvey[10].points);
    const percentage = 100-qB10res/5*100;
    return percentage;
}

/**
 * Calculation of the percentage according ot the results of mobility question
 * @returns {number} - percentage
 * @constructor
 */
export function GetMobilityPourcentage(){
    const qB11res = parseInt(responseSurvey[11].points);
    const percentage = 100-(qB11res/5*100);
    return percentage;
}







