import { doc } from "firebase/firestore";
import { db } from "../initFirebase";

// Get a reference to the users COLLECTION
const usersCollectionRef    = doc(db, 'users'); // Une référence est un objet léger qui pointe simplement vers un emplacement dans votre base de données.

// Get a referece to the users alovelace DOCUMENT
const userDocumentRef       = doc(db, 'users', 'ada');
const userDocumentRef_V2    = doc(db, 'users/ada');
// REFERENCE : DOCUMENT =/= COLLECTION
// Chaque référence est soit une référence de collection, soit une référence de document.
// Ils ont des opérations bien distinctes, mais ils partagent des méthodes communes.

// référence à un message dans la sous-collection messages de la collection rooms
                                                                //     collection   document   collection   document
const messageDocumentRef = doc(db, "rooms", "roomA", "messages", "message1");



