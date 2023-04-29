// Tutorial from : https://firebase.google.com/docs/firestore/manage-data/add-data?hl=fr

import {collection, doc, setDoc, addDoc, Timestamp} from "firebase/firestore";
import {db} from "../initFirebase";

/**
 * DOCUMENTATION RESUME FROM FIREBASE
 */
// AJOUTER UNE COLLECTION & UN DOCUMENT *******************************
// créer ou écraser un seul document, utilisez les méthodes set().
// Si le document n'existe pas, il sera créé. Si le document existe, son contenu sera remplacé par les nouvelles données fournies
await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
} );

//si document existe & FUSION (MERGE), vous spécifiez que les données doivent être fusionnées dans le document existant
const cityRef = doc(db, "cities", "BJ");
setDoc(cityRef, {capital: true},
                {merge: true});
// Si vous n'êtes pas sûr que le document existe, passez l'option pour fusionner
// les nouvelles données avec n'importe quel document existant pour éviter
// d'écraser des documents entiers. Pour les documents contenant des cartes,
// notez que la spécification d'un ensemble avec un champ contenant une carte vide
// écrasera le champ de carte du document cible.


// TYPES DE DONNEES  ****************************************************
const docData = {
    stringExample:  "Hello world!",
    booleanExample: true,
    numberExample:  3.14159265,
    dateExample:    Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample:   [5, true, "hello"],
    nullExample:    null,
    objectExample:  {
                        a: 5,
                        b:
                        {
                            nested: "foo"
                        }
                    }
};
await setDoc(doc(db, "dataTypes", "one"), docData);


// OBJETS PERSONALISES  **************************************************
// L'utilisation d'objets Map ou Dictionary pour représenter vos documents
// n'est souvent pas très pratique,
// c'est pourquoi Cloud Firestore prend en charge l'écriture de documents
// avec des classes personnalisées.
// Cloud Firestore convertit les objets en types de données pris en charge.
class City {
    constructor (name, state, country ) {
        this.name = name;
        this.state = state;
        this.country = country;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}

// Firestore data converter
const cityConverter = {
    toFirestore: (city) => {
        return {
            name: city.name,
            state: city.state,
            country: city.country
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);    // options permet de donner le MERGE
        return new City(data.name, data.state, data.country);
    }
};

// Set with cityConverter
const ref = doc(db, "cities", "LA").withConverter(cityConverter);
await setDoc(ref, new City("Los Angeles", "CA", "USA"));


// AJOUTER UN DOCUMENT **************************************************
// Ajouter un document avec une clé personnalisée -- SET DOC
await setDoc(doc(db, "cities", "new-city-id"),
             cityConverter.toFirestore(new City("New York", "NY", "USA")));

// Ajouter un document avec une clé générée automatiquement -- ADD DOC
const docRef = await addDoc(collection(db, "cities"),
                                { name: "Tokyo" , country: "Japan" });
console.log("Document written with ID: ", docRef.id);
// Important : Contrairement aux "identifiants push" dans la base de données en temps réel
// Firebase, les identifiants générés automatiquement par Cloud Firestore ne fournissent
// aucun tri automatique.
// Si vous souhaitez pouvoir classer vos documents par date de création,
// vous devez stocker un horodatage sous forme de champ dans les documents.

// créer une référence de document avec un ID généré automatiquement, puis d'utiliser la référence ultérieurement.
// Pour ce cas d'utilisation, vous pouvez appeler doc()
// Add a new document with a generated id
const newCityRef = doc(collection(db, "cities"));

// later...
await setDoc(newCityRef,
             { name: "São Paulo", state: null, country: "Brazil" });
