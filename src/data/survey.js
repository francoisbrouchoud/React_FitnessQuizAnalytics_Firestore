// DEFAULT DATA TO SEED FIREBASE DATABASE
// This variable is used to store the current question to initialize the firestore database if it is empty.
export const questionDataPartB =
                 [
                     {
                         questionId: "B01",
                         questionText: "Quels dispositifs d'aide à la marche utilisez vous ? ",
                         choices: ["aucune", "une canne", "deux cannes", "déambulateur", "cadre de marche", "j'ai besoin de l'aide d'une tierce personne"],
                         points:[5,4,3,2,2,1]
                     },
                     {
                         questionId: "B02",
                         questionText: "Par rapport à la vitesse de marche moyenne (celle de vos proches, de vos amis et des gens de votre âge), pensez-vous marcher habituellement… (cocher une seule case)",
                         choices: ["Nettement moins vite", "Un peu moins vite", "A la même vitesse", "Un peu plus vite", "Nettement plus vite"],
                         points: [1, 2, 3, 4, 5]
                     },
                     {
                         questionId: "B03",
                         questionText: "Entourez le temps maximal que vous pouvez pensez pouvoir tenir aux différentes allures suivantes facilement, sur terrain plat et sans vous arrêter pour vous reposer:",
                         questionSecondaryText: "Marcher lentement (une vitesse plus lente que celle de vos proches, de vos amis ou des gens de votre âge)",
                         choices: ["impossible", "1 minute", "5 minutes", "15 minutes", "30 minutes", "1 heure", "2 heures", "3 heures & plus"],
                         points: [0, 1, 4, 7, 10, 13, 16, 19]
                     },
                     {
                         questionId: "B04",
                         questionText: "Entourez le temps maximal que vous pouvez pensez pouvoir tenir aux différentes allures suivantes facilement, sur terrain plat et sans vous arrêter pour vous reposer:",
                         questionSecondaryText: "Marcher à vitesse moyenne (la même vitesse que celle de vos proches, de vos amis ou des gens de votre âge)",
                         choices: ["impossible", "1 minute", "5 minutes", "15 minutes", "30 minutes", "1 heure", "2 heures", "3 heures & plus"],
                         points: [0, 2, 5, 8, 11, 14, 17, 20]
                     },
                     {
                         questionId: "B05",
                         questionText: "Entourez le temps maximal que vous pouvez pensez pouvoir tenir aux différentes allures suivantes facilement, sur terrain plat et sans vous arrêter pour vous reposer:",
                         questionSecondaryText: "Marcher rapidement (une vitesse plus rapide que celle de vos proches, de vos amis ou des gens de votre âge)",
                         choices: ["impossible", "1 minute", "5 minutes", "15 minutes", "30 minutes", "1 heure", "2 heures", "3 heures & plus"],
                         points: [0, 3, 6, 9, 12, 15, 18, 21]
                     },
                     {
                         questionId: "B06",
                         questionText: "Montée d'escaliers : Reportez le degré de difficulté physique qui décrit le mieux la difficulté que vous avez eu à monter des escaliers, sans vous arrêter pour vous reposer, au cours de la dernière semaine.:",
                         questionSecondaryText: "Monter 1 étage ? Degré de difficulté",
                         choices: ["Aucun", "Leger", "Moyen", "Important", "Infaisable"],
                         points: [4, 3, 2, 1, 0]
                     },
                     {
                         questionId: "B07",
                         questionText: "Montée d'escaliers : Reportez le degré de difficulté physique qui décrit le mieux la difficulté que vous avez eu à monter des escaliers, sans vous arrêter pour vous reposer, au cours de la dernière semaine.:",
                         questionSecondaryText: "Monter 3 étage ? Degré de difficulté",
                         choices: ["Aucun", "Leger", "Moyen", "Important", "Infaisable"],
                         points: [9, 8, 7, 6, 5]
                     },
                     {
                         questionId: "B08",
                         questionText: "Montée d'escaliers : Reportez le degré de difficulté physique qui décrit le mieux la difficulté que vous avez eu à monter des escaliers, sans vous arrêter pour vous reposer, au cours de la dernière semaine.:",
                         questionSecondaryText: "Monter 5 étages ? Degré de difficulté",
                         choices: ["Aucun", "Leger", "Moyen", "Important", "Infaisable"],
                         points: [14, 13, 12, 11, 10]
                     },
                     {
                         questionId: "B09",
                         questionText: "Avez-vous peur de l'altitude (Peur du vide) ? ",
                         questionSecondaryText: "Explication: La peur du vide est une vraie phobie (phobie = peur) et n'est pas à confondre avec le vertige, qui est un phénomène physiologique). La peur du vide peut se déclencher à la simple pensée de se retrouver en hauteur.",
                         choices: ["Oui", "Non"],
                         points: [1, 0]
                     },
                     {
                         questionId: "B10",
                         questionText: "Avez-vous peur de l'altitude (Peur du vide) ? ",
                         questionSecondaryText: "Explication: La peur du vide est une vraie phobie (phobie = peur) et n'est pas à confondre avec le vertige, qui est un phénomène physiologique). La peur du vide peut se déclencher à la simple pensée de se retrouver en hauteur.",
                         choices: ["Oui", "Non"],
                         points: [1, 0]
                     },
                     {
                         questionId: "B11",
                         questionText: "Avez-vous des douleurs?",
                         choices: ["Douleurs dans la hanche", "Douleurs des genoux", "Douleurs aux pieds", "Douleurs de dos", "Douleurs ailleurs", "Pas de douleurs"],
                         points: [1, 1, 1, 1, 1, 0]
                     },
                     {
                         questionId: "B12",
                         questionText: "Est-ce que vous avez peur de chuter?",
                         choices: ["Oui, j'ai peur de chuter", "Non je n'ai pas peur de chuter"],
                         points: [1, 0]
                     },
                     {
                         questionId: "B13",
                         questionText: "Avez-vous chuté lors des 12 derniers mois?",
                         choices: ["Non", "Une fois", "Deux fois", "Plusieurs fois"],
                         points: [0, 1, 2, 3]
                     },
                     {
                         questionId: "B14",
                         questionText: "Avez-vous parfois des vertiges?",
                         choices: ["Oui", "Non"],
                         points: [1, 0]
                     },
                     {
                         questionId: "B15",
                         questionText: "Est-ce que vous vous sentez sûre de vous lorsque vous vous tenez debout sur une seule jambe sans vous tenir à quelque chose?",
                         choices: ["Non je ne me sens pas sûr-e", "Oui je me sens sûr-e", "Impossible de faire sans me tenir"],
                         points: [1, 2, 0]
                     }
                 ];
