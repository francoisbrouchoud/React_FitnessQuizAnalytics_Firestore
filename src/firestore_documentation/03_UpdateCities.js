// Tutorial from : https://firebase.google.com/docs/firestore/manage-data/add-data?hl=fr

import {doc, setDoc, updateDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../initFirebase";

/**
 * DOCUMENTATION RESUME FROM FIREBASE
 */

// METTRER A JOUR UN DOCUMENT *******************************************
// Pour mettre à jour certains champs d'un document sans écraser l'intégralité du document,
// utilisez les méthodes update()
const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef,{capital: true});


// HORODATAGE DU SERVEUR ************************************************
// Vous pouvez définir un champ dans votre document sur un horodatage de serveur qui
// suit le moment où le serveur reçoit la mise à jour.
const docRef = doc(db, "objects", "some-id");

// Update the timestamp field with the value from the server
const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp()
});

// Mettre à jour CHAMPS dans Obets Imbriqués
// Si votre document contient des objets imbriqués, vous pouvez utiliser la
// "notation par points" pour référencer les champs imbriqués dans
// le document lorsque vous appelez update()

// Create an initial document to update
const frankDocRef = doc(db, "users", "frank");
await setDoc(frankDocRef, {
    name: "Frank",
    favorites: { food: "Pizza", color: "Blue", subject: "recess" },
    age: 12
});

// To update age and favorite color:
await updateDoc(frankDocRef, {
    "age": 13,
    "favorites.color": "Red"
});





