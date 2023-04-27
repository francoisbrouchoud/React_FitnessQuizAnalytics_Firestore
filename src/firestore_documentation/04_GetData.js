// Il y a 3 façons de récupérer les données d'une collection / document dans Firestore:
// 1. getDoc() / getDocs() -- récupère UNE SEULE FOIS les données d'un document / d'une collection
// 2. onSnapshot() -- LISTENER : récupère les données d'un document / d'une collection à chaque fois qu'elles changent (en temps réel)
    // Lorsque vous définissez un écouteur LISTENER, Cloud Firestore envoie à votre écouteur un instantané (snapShot)  initial des données,
    // puis un autre instantané chaque fois que le document change.
// 3. Chargez des blocs de données de snapshot depuis une source externe (ex: un fichier JSON) -- Voir BUNDLES

import {collection, doc, getDocs, getDoc, setDoc, getDocFromCache, query, where, addDoc, Timestamp} from "firebase/firestore";
import {db} from "../initFirebase";

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

export default function Firestore_GetData(){
    
    // SEED DB
    const seedDatabase = async () => {
        console.log('SEED DB')
        // Créer des data pour la DB -- SEED DB
        const citiesRef = collection(db, "cities");
        
        await setDoc(doc(citiesRef, "SF"), {
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"]
        });
        await setDoc(doc(citiesRef, "LA"), {
            name: "Los Angeles", state: "CA", country: "USA",
            capital: false, population: 3900000,
            regions: ["west_coast", "socal"]
        });
        await setDoc(doc(citiesRef, "DC"), {
            name: "Washington, D.C.", state: null, country: "USA",
            capital: true, population: 680000,
            regions: ["east_coast"]
        });
        await setDoc(doc(citiesRef, "TOK"), {
            name: "Tokyo", state: null, country: "Japan",
            capital: true, population: 9000000,
            regions: ["kanto", "honshu"]
        });
        await setDoc(doc(citiesRef, "BJ"), {
            name: "Beijing", state: null, country: "China",
            capital: true, population: 21500000,
            regions: ["jingjinji", "hebei"]
        });
    };
    
    // Recuperer un DOCUMENT -- GetDoc()
    const getDocument = async () => {
        console.log('GET ONLY 1  DOCUMENT')
        
        // Recuperer un DOCUMENT -- GetDoc()
        const docRef = doc(db, "cities", "SF");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    };
    
    // Recuperer un DOCUMENT Hors ligne -- GetFromCACHE()
    const getDocumentCache = async () => {
        
        console.log('GET ONLY 1  DOCUMENT Hors ligne -- GetFromCACHE()')
        const docRef = doc(db, "cities", "SF");

        // Get a document, forcing the SDK to fetch from the offline cache.
        try {
            const doc = await getDocFromCache(docRef);
            
            // Document was found in the cache. If no cached document exists,
            // an error will be returned to the 'catch' block below.
            console.log("Cached document data:", doc.data());
        } catch (e) {
            console.log("Error getting cached document:", e);
        }
    }
    
    // Firestore data converter
    const cityConverter = {
        toFirestore: (city) => {
            console.log("CitiesConverter toFirestore : " + city.toString());
            return {
                name: city.name,
                state: city.state,
                country: city.country
            };
        },
        fromFirestore: (snapshot, options) => {
            console.log("CitiesConverter fromFirestore : " + snapshot.toString());
            const data = snapshot.data(options);
            return new City(data.name, data.state, data.country);
        }
    };
    
    // Recuperer un objet PERSONNALISE "CITY"
    // Appelez votre convertisseur de données avec vos opérations de lecture.
    // Après la conversion, vous pouvez accéder aux méthodes d'objet personnalisées :
    const getCityObject = async () => {
        console.log("getCityObject")
        const ref = doc(db, "cities", "LA").withConverter(cityConverter);
        const docSnap = await getDoc(ref);
       
        if (docSnap.exists()) {
            
            // Convert to City object
            const city = docSnap.data();
            
            // Use a City instance method
            console.log(city.toString());
        } else {
            console.log("No such document!");
        }
    }
    
    // Recuperer plusieurs DOCUMENTS d'une COLLECTION -- GetDocs()
    // Vous pouvez également récupérer plusieurs documents avec une seule demande en interrogeant les documents d'une collection.
    // Par exemple, vous pouvez utiliser where() pour interroger tous les documents remplissant une certaine condition,
    // puis utiliser get() pour récupérer les résultats
    const getDocuments = async () => {
        console.log('GET MULTIPLE DOCUMENTS FROM A COLLECTION, WHERE CAPITAL = TRUE')
        
        const q = query(collection(db, "cities"), where("capital", "==", true));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        
        // Par défaut, Cloud Firestore récupère tous les documents qui répondent à la requête
        // dans l'ordre croissant par ID de document,
        // mais vous pouvez trier et limiter les données renvoyées .
    }
    
    // Button Click Event
    const handleButtonClick = async () => {
        try
        {
            await seedDatabase();
            await getDocument();
            await getDocumentCache();
            await getCityObject();
            await getDocuments();
        }
        catch (error)
        {
            console.log(error);
        }
    };
    
    return (
        <div>
            <button onClick={handleButtonClick}>Get Data</button>
        </div>
    );
    
}