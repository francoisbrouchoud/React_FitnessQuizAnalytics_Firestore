import React from "react";
import {collection, doc, getDocs, getDoc, query, where} from "firebase/firestore";
import {db,auth} from "../initFirebase";

//TODO - Récupérer le tableau de DisplayResults
let reponsesSondage = [
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
export function ManagesResults() {
    const getListeQuestionnaires = async () => {

        // Récupérer tous les documents de la collection 'users'
        const usersSnapshot = await getDocs(collection(db, "users"));

        // Utilisez Promise.all pour effectuer plusieurs requêtes en parallèle
        const resultsPromises = usersSnapshot.docs.map(async (userDoc) => {
            // Créez une requête pour obtenir tous les documents avec l'e-mail actuel dans le tableau groupLeader
            const q = query(
                collection(userDoc.ref, "results"),
                where("groupLeader", "array-contains", auth.currentUser.email)
            );

            // Récupérer les documents correspondants
            const resultsSnapshot = await getDocs(q);

            // Transformer les documents en un tableau d'objets contenant les données et l'ID de l'utilisateur
            return resultsSnapshot.docs.map((resultDoc) => ({
                ...resultDoc.data(),
                userId: userDoc.id,
                userEmail: userDoc.data().email,
            }));
        });

        // Attendez que toutes les requêtes soient terminées
        const resultsArrays = await Promise.all(resultsPromises);

        // Aplatir le tableau 2D en un tableau 1D
        const results = resultsArrays.flat();

        return results;
    }

    return getListeQuestionnaires();
}
export async function GetResultsFromQuestionnaire(name){
        try{
            console.log("name :",name)
            const docRef = doc(db,"users",auth.currentUser.email,"results",name);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const myResultsArray = data.results;
            console.log("initial array : ",reponsesSondage)
            reponsesSondage = myResultsArray.slice();
            console.log("replace array : ",reponsesSondage);

            return reponsesSondage;
        } catch (e){
            console.log("Error :" + e);
            return null;
        }
}

export async function GetResultsFromUserAndDate(email, resultDate) {
    try {
        console.log("Email :", email);
        console.log("Result Date :", resultDate);

        // Modifier cette partie pour récupérer les résultats en fonction de l'adresse e-mail et de la date du résultat
        const docRef = doc(db, "users", email, "results", resultDate);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const myResultsArray = data.results;
            console.log("Initial array: ", reponsesSondage);
            reponsesSondage = myResultsArray.slice();
            console.log("Replace array: ", reponsesSondage);

            return reponsesSondage;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (e) {
        console.log("Error :" + e);
        return null;
    }
}

export function GetResults() {

    //RECOMMENDATIONS
    //var reponsesSondage = GetResultsFromQuestionnaire(name);

    //Activité physique - questionnaire A
    var activitePhysiqueResultat = reponsesSondage[0].points;
    var activitePhysiqueMessage =
        "Brochure encourager reprendre activité physique";

    switch (activitePhysiqueResultat) {
        case "1":
            activitePhysiqueMessage +=
                " et brochure bénéfices activité physique";
            break;
        case "2":
            break;
        case "3":
            activitePhysiqueMessage = "Brochure surmonter barrière";
            break;
        case "4":
            activitePhysiqueMessage =
                "Brochure activité physique ou conseils individuels";
            break;
        case "5":
            activitePhysiqueMessage =
                "Brochure activité physique ou conseils individuels";
            break;
        case "6":
            activitePhysiqueMessage = "Encourager";
            break;
        default:
            activitePhysiqueMessage = "Erreur";
    }
    console.log(activitePhysiqueResultat);

// Durée de la route à proposer
    let propositionRouteMessage = "";
    let propositionRouteResultat = reponsesSondage[3].points;

    switch (propositionRouteResultat) {
        case "0":
        case "1":
            propositionRouteMessage = "Pas de marche";
            break;
        case "4":
            propositionRouteMessage = "5 min de marche";
            break;
        case "7":
            propositionRouteMessage = "15 min de marche";
            break;
        case "10":
            propositionRouteMessage = "30 min de marche";
            break;
        case "13":
            propositionRouteMessage = "1h de marche";
            break;
        case "16":
            propositionRouteMessage = "2h de marche";
            break;
        case "19":
            propositionRouteMessage = "3h de marche";
            break;
        default:
            propositionRouteMessage = "Résultat inconnu";
    }

// Vitesse de la marche
// question 2
    let vitesseMarcheResultat = reponsesSondage[2].points;
    let vitesseMarcheMessage = "";

    switch(vitesseMarcheResultat) {
        case "1":
            vitesseMarcheMessage = "Augmenter le temps indiqué de 30%";
            break;
        case "2":
            vitesseMarcheMessage = "Augmenter le temps indiqué de 10%";
            break;
        case "3":
            vitesseMarcheMessage = "Garder le temps indiqué";
            break;
        case "4":
            vitesseMarcheMessage = "Réduire le temps indiqué de 10%";
            break;
        case "5":
            vitesseMarcheMessage = "Réduire le temps indiqué de 30%";
            break;
        default:
            vitesseMarcheMessage = "Résultat inconnu";
    }
    //Chemins
    var cheminMessage = "";

    if (reponsesSondage[10].points === 1) {
        cheminMessage = "Pas de chemin exposés";
    } else {
        cheminMessage = "Chemins exposés possibles";
    }

    //Dénivelé
    //TODO - A FAIRE CALCUL DENIVELE POUR RECOMMENDATION - A REVOIR SELON FICHIER EXCEL

    var bqst06Resultat = reponsesSondage[6].points;
    var bqst07Resultat = reponsesSondage[7].points;
    var bqst08Resultat = reponsesSondage[8].points;
    var monterEtageMessage = "";

    if(bqst08Resultat === 10){
        if(bqst07Resultat === 5){

        }
    }


    //Risques de chute
    let risqueChuteResultat = 0;
    var risqueChuteMessage = "";

    for (let i = 12; i <= 14; i++) {
        const reponse = reponsesSondage[i];
        const points = parseInt(reponse.points);
        if (!isNaN(points)) {
            risqueChuteResultat += points;
        }
    }

    switch (risqueChuteResultat) {
        case 0:
            risqueChuteMessage =
                "Pas de problème avec l'équilibre ou des risque de chute; pas de propositions nécessaires";
            break;
        case 1:
            risqueChuteMessage =
                "Proposer des chemins sans trop de difficultés (risque de chute) et randonées accompagnées";
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            risqueChuteMessage =
                "Proposer des randonées accompagnées ou des chemins simples";
            break;
        default:
            risqueChuteMessage = "Erreur";
    }

    //TODO - Affichage des messages questionnaire A

    return (
        <div>
            <ul>
                <h1>Recommendations</h1>
                <li>{propositionRouteMessage}</li>
                <li>{vitesseMarcheMessage}</li>
                <li>{cheminMessage}</li>
                <li>Dénivelé</li>
                <li>{risqueChuteMessage}</li>
                <li>{activitePhysiqueMessage}</li>
            </ul>
            <ul>
                <h1>Messages For Part A</h1>
                <li></li>
            </ul>
        </div>

    );
}

//POURCENTAGES pour affichage dans RadarPlot
/*
 Activité physique :
 Résultat de l'onglet activité physique (questionnaire 1) --> 1 à 6 points
 resulat/6x100
  */
export function GetActivitePhysique(){
    const qA01res = parseInt(reponsesSondage[0].points);
    const pourcentage = qA01res / 6 * 100;
    return pourcentage;

}

/*
Marcher sans aides :
Résultat de l'onglet autre questions (question B01) --> 1 à 5 points
resulat/5x100
 */
export function GetMarcherSansAidesPourcentage(){
    const qB01res = parseInt(reponsesSondage[1].points);
    const pourcentage = qB01res / 5 * 100;
    return pourcentage;
}

/*
Vitesse marche :
Résultat de l'onglet autre questions (question B02) --> 1 à 5 points
resulat/5x100
 */
export function GetVitesseMarchePourcentage(){
    const qB02res = parseInt(reponsesSondage[2].points);
    const pourcentage = qB02res / 5 * 100;
    return pourcentage;
}

/*
Marche temps :
Résultat de l'onglet autre questions (question B03+B04+B05) -->
B03 --> 0,1,4,7,10,13,16,19
B04 --> 0,2,5,8,11,14,17,20
B05 --> 0,3,6,9,12,15,18,21
resulat/60x100
 */
export function GetMarcheTempsPourcentage(){
    const qB03res = parseInt(reponsesSondage[3].points);
    const qB04res = parseInt(reponsesSondage[4].points);
    const qB05res = parseInt(reponsesSondage[5].points);
    const pourcentage = (qB03res+qB04res+qB05res)/60*100;
    return pourcentage;
}


/*
Capacité monter :
Résultat de l'onglet autre questions (question B06+B07+B08) -->
B06 --> 0,1,2,3,4
B07 --> 5,6,7,8,9
B08 --> 10,11,12,13,14
resulat/27x100
 */
export function GetCapaciteMonterPourcentage(){
    const qB06res = parseInt(reponsesSondage[6].points);
    const qB07res = parseInt(reponsesSondage[7].points);
    const qB08res = parseInt(reponsesSondage[8].points);
    const pourcentage = (qB06res+qB07res+qB08res)/27*100;
    return pourcentage;
}


/*
Insécurité marche :
Résultat de l'onglet autre questions (question B13+B14+B12) -->
B13 --> 0,1,2,3
B14 --> 0 ou 1
B12 --> 0 ou 1
resulat/5x100
 */
export function GetInsecuriteMarchePourcentage(){
    const qB13res = parseInt(reponsesSondage[13].points);
    const qB14res = parseInt(reponsesSondage[14].points);
    const qB12res = parseInt(reponsesSondage[12].points);
    const pourcentage = (qB13res+qB14res+qB12res)/5*100;
    return pourcentage;
}

/*
Pas peur du vide :
Résultat de l'onglet autre questions (question B09) --> 0 ou 1 point
100-(resulat/1x100)
 */
export function GetPasPeurVidePourcentage(){
    const qB09res = parseInt(reponsesSondage[9].points);
    const pourcentage = 100-(qB09res/1*100);
    return pourcentage;
}

/*
Equilibre:
Résultat de l'onglet autre questions (question B15) --> 0 à 2 points
resulat/2x100
 */
export function GetEquilibrePourcentage(){
    const qB15res = parseInt(reponsesSondage[15].points);
    const pourcentage = qB15res/2* 100;
    return pourcentage;
}


/*
Sans douleurs :
Résultat de l'onglet autre questions (question B10) -->
5 choix de réponses --> 1 = oui
100-resulat/5x100
 */
export function GetSansDouleursPourcentage(){
    const qB10res = parseInt(reponsesSondage[10].points);
    const pourcentage = 100-qB10res/5*100;
    return pourcentage;
}

/*
Mobilité :
Résultat de l'onglet autre questions (question B11) -->
5 choix de réponses --> 1 = oui
100-(resulat/5x100)
 */
export function GetMobilitePourcentage(){
    const qB11res = parseInt(reponsesSondage[11].points);
    const pourcentage = 100-(qB11res/5*100);
    return pourcentage;
}







