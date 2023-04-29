// Vous pouvez écouter un document avec la méthode onSnapshot().
// Un appel initial utilisant le rappel que vous fournissez crée immédiatement un instantané de document
// avec le contenu actuel du document unique.
// Ensuite, chaque fois que le contenu change, un autre appel met à jour l'instantané du document.
//https://firebase.google.com/docs/firestore/query-data/listen?hl=fr

import {collection, doc, query, where, onSnapshot} from "firebase/firestore";
import {db} from "../initFirebase";

/**
 * DOCUMENTATION RESUME FROM FIREBASE
 */

// Objet Personalisée à transformer en Objet City
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

export default function Firestore_RealTime(){
    
    const unSubscribe = async () => {
        const unsub = await onSnapshot(doc(db, "cities", "SF"), (doc) => {
            console.log('UNSUBSCRIBE')
            console.log("Current data: ", doc.data());
        });
    }
    
    // Changements locaux -- LOCAL CHANGES
    // fonctionnalité importante appelée "compensation de latence".
    // Lorsque vous effectuez une écriture, vos auditeurs seront informés des nouvelles données AVANT que
    // les données ne soient envoyées au backend.
    const listen_localChanges = async () => {
        // Les changements locaux sont des modifications qui n'ont pas encore été envoyées au serveur.
        // Vous pouvez détecter les changements locaux en vérifiant le champ hasPendingWrites de la métadonnée d'un document.
        // Si hasPendingWrites est vrai, le document a été modifié localement et n'a pas encore été envoyé au serveur.
        // Si hasPendingWrites est faux, le document a été synchronisé avec le serveur.
        
        const unsub = await onSnapshot(doc(db, "cities", "SF"), (doc) => {
            console.log('LOCAL CHANGES')
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log ("Has pending writes ? \nTrue -> Source = Local, \nFalse -> Source = Server : \n", doc.metadata.hasPendingWrites);
            console.log(source, " data: ", doc.data());
        });
        
        // Remarque : Si vous voulez simplement savoir quand votre écriture est terminée,
        // vous pouvez écouter le rappel d'achèvement plutôt que d'utiliser hasPendingWrites.
        // En JavaScript, utilisez la Promise renvoyée par votre opération d'écriture en attachant un rappel .then() .
        // then(() => { console.log('LOCAL CHANGES - OVER') });
        
    }
    
    // Ecoutez les changements sur plusieurs documents ou collections en même temps avec la méthode onSnapshot().
    // Comme pour les documents, vous pouvez utiliser onSnapshot() au lieu de get() pour écouter les résultats d'une requête.
    // Cela crée un instantané de requête. Par exemple, pour écouter les documents avec l'état CA :
    const listen_MultipleSources = async () => {
        console.log('LISTEN MULTIPLE SOURCES')
        
        const q = query(collection(db, "cities"), where("state", "==", "CA"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data().name);
            });
            console.log("Current cities in CA: ", cities.join(", "));
        });
        
    }
    
    // Button Click Event
    const handleButtonClick = async () => {
        try
        {
            await unSubscribe();
            await listen_localChanges();
        }
        catch (error)
        {
            console.log(error);
        }
    };
    
    return (
        <div>
            <button onClick={handleButtonClick}>Real Time Data</button>
        </div>
    );
    
}