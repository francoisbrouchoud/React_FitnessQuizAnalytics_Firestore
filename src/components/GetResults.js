import React from "react";

//TODO - A RECUPERER L'ARRAY DE RESULTAT SET PAR FRANCOIS
//TODO - A MODIFIER QUESTIONS PARTIE B, IL MANQUE MOBILITE ET PEUR DU VIDE 2x (A REMPLACER)

const reponsesSondage = [
    { id: "01", points: "2" },
    { id: "02", points: "3" },
    { id: "03", points: "10" },
    { id: "04", points: "14" },
    { id: "05", points: "18" },
    { id: "06", points: "2" },
    { id: "07", points: "8" },
    { id: "08", points: "11" },
    { id: "09", points: "0" },
    { id: "10", points: "1" },
    { id: "11", points: "1" },
    { id: "12", points: "0" },
    { id: "13", points: "1" },
    { id: "14", points: "0" },
    { id: "15", points: "2" },
];

export function GetResults() {

// Durée de la route à proposer
    let propositionRouteMessage = "";
    let propositionRouteResultat = reponsesSondage[2].points;

    switch (propositionRouteResultat) {
        case "0":
        case "1":
            propositionRouteMessage = "Pas de marche";
            break;
        case "4":
            propositionRouteMessage = "5 min";
            break;
        case "7":
            propositionRouteMessage = "15 min";
            break;
        case "10":
            propositionRouteMessage = "30 min";
            break;
        case "13":
            propositionRouteMessage = "1h";
            break;
        case "16":
            propositionRouteMessage = "2h";
            break;
        case "19":
            propositionRouteMessage = "3h";
            break;
        default:
            propositionRouteMessage = "Résultat inconnu";
    }

// Vitesse de la marche
// question 2
    let vitesseMarcheResultat = reponsesSondage[1].points;
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

    if (reponsesSondage[9].points === 1) {
        cheminMessage = "Pas de chemin exposés";
    } else {
        cheminMessage = "Chemins exposés possibles";
    }

    //Dénivelé
    //TODO - A FAIRE CALCUL DENIVELE POUR RECOMMENDATION
    var deniveleResultat;
    var deniveleMessage = "";

    //Monter 1 étage --> B06
    var monter1EtageResultat = reponsesSondage[5].points;
    var monter1EtageMessage="Seulement des dénivelés très faibles possibles";

    if(monter1EtageResultat === 0)
        monter1EtageMessage = "Pas de dénivelé possible"

    //Monter 3 étages --> B07
    var monter1EtageResultat = reponsesSondage[6].points;
    var monter1EtageMessage="Erreur";

    if(monter1EtageResultat !== 5)
        monter1EtageMessage = "Seulement des dénivelés faibles à modérés possibles"

    //Monter 5 étages --> B08
    var monter1EtageResultat = reponsesSondage[7].points;
    var monter1EtageMessage;

   switch (reponsesSondage){
       case 11:
       case 12:
           monter1EtageMessage = "Dénivelés modérés possibles"
           break;
       case 13:
       case 14:
           monter1EtageMessage = "Dénivelés importants possibles"
           break;
       default :
           monter1EtageMessage = "Erreur"
   }


    //Risques de chute
    let risqueChuteResultat = 0;
    var risqueChuteMessage = "";

    for (let i = 11; i <= 13; i++) {
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

    //Activité physique - questionnaire A
    var activitePhysiqueResultat = 5;
    var activitePhysiqueMessage =
        "Brochure encourager reprendre activité physique";

    switch (activitePhysiqueResultat) {
        case 1:
            activitePhysiqueMessage +=
                " et brochure bénéfices activité physique";
            break;
        case 2:
            break;
        case 3:
            activitePhysiqueMessage = "Brochure surmonter barrière";
            break;
        case 4:
            activitePhysiqueMessage =
                "Brochure activité physique ou conseils individuels";
            break;
        case 5:
            activitePhysiqueMessage =
                "Brochure activité physique ou conseils individuels";
            break;
        case 6:
            activitePhysiqueMessage = "Encourager";
            break;
        default:
            activitePhysiqueMessage = "Erreur";
    }


    return (
        <div>
            <p>Recommendations</p>
            <p>Durée de la route à proposer : {propositionRouteMessage} </p>
            <p>Vitesse de la marche : {vitesseMarcheMessage} </p>
            <p>Chemins : {cheminMessage} </p>
            <p>Le dénivelé : </p>
            <p>Risques de chute : {risqueChuteMessage}</p>
            <p>Brochures /Infos / Conseils "activité physique" : {activitePhysiqueMessage}</p>
        </div>
    );
}

/*
 Activité physique :
 Résultat de l'onglet activité physique (questionnaire 1) --> 1 à 6 points
 resulat/6x100
  */
    //TODO - FONCTION POUR QUESTIONNAIRE A

/*
Marcher sans aides :
Résultat de l'onglet autre questions (question B01) --> 1 à 5 points
resulat/5x100
 */
export function GetMarcherSansAidesPourcentage(){
    const qB01res = parseInt(reponsesSondage[0].points);
    const pourcentage = qB01res / 5 * 100;
    return pourcentage;
}

/*
Vitesse marche :
Résultat de l'onglet autre questions (question B02) --> 1 à 5 points
resulat/5x100
 */
export function GetVitesseMarchePourcentage(){
    const qB02res = parseInt(reponsesSondage[1].points);
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
    const qB03res = parseInt(reponsesSondage[2].points);
    const qB04res = parseInt(reponsesSondage[3].points);
    const qB05res = parseInt(reponsesSondage[4].points);
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
    const qB06res = parseInt(reponsesSondage[5].points);
    const qB07res = parseInt(reponsesSondage[6].points);
    const qB08res = parseInt(reponsesSondage[7].points);
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
    const qB13res = parseInt(reponsesSondage[12].points);
    const qB14res = parseInt(reponsesSondage[13].points);
    const qB12res = parseInt(reponsesSondage[11].points);
    const pourcentage = (qB13res+qB14res+qB12res)/5*100;
    return pourcentage;
}

/*
Pas peur du vide :
Résultat de l'onglet autre questions (question B09) --> 0 ou 1 point
100-(resulat/1x100)
 */
export function GetPasPeurVidePourcentage(){
    const qB09res = parseInt(reponsesSondage[8].points);
    const pourcentage = 100-(qB09res/1*100);
    return pourcentage;
}

/*
Equilibre:
Résultat de l'onglet autre questions (question B15) --> 0 à 2 points
resulat/2x100
 */
export function GetEquilibrePourcentage(){
    const qB15res = parseInt(reponsesSondage[14].points);
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
    const qB10res = parseInt(reponsesSondage[9].points);
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
    const qB11res = parseInt(reponsesSondage[10].points);
    const pourcentage = 100-(qB11res/5*100);
    return pourcentage;
}







