import React, {useEffect, useState} from "react";
import firebaseApp, {auth, db} from "../initFirebase";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {Link} from "react-router-dom";

export default function Profile() {
    
    const [isEditable,  setIsEditable]  = useState(false);
    const [isSaved,     setIsSaved]     = useState(false);  // TODO : A supprimer
    const [userDatas,        setUserDatas]  = useState({});
    
    useEffect(() => {
        // Récupérer les données de l'utilisateur dans la base de données ou l'API
        const fetchUserDataFromDB = async () => {
            const docRef = doc(db, 'users', auth.currentUser.email );
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserDatas(data);
            } else {
                console.error('No such document!');
            }
        };
        
        // Call the function to fetch the data, use the .then() method to wait for the promise to resolve and then set the state with the result
        fetchUserDataFromDB().then(() => {
            console.log('Users Data fetched for profile !', userDatas);
        });
        
    }, [isEditable]);
    
    // BTN EDIT PROFILE
    function handleEdit() {
        setIsEditable(true);
    }
    
    // BTN SAVE PROFILE
    function BACK() {
        // Va changer l'affichage du composant & fetch les données de l'utilisateur depuis la DB
        setIsEditable(false);
        setIsSaved(true);
    }
    
    // CALLBACK FUNCTION POUR RECUPERER LES DONNEES DU FORM ENFANT
    // Cette fonction recevra les données modifiées du formulaire en tant qu'argument et les mettra à jour dans l'état
    // du composant parent, puis enverra les données mises à jour à la base de données ou à l'API.
    
    
    return (
        <>
            <header className="AppHeader">
                <div className="HeadIconsPosition">
                    <Link to={"/"}>
                        <h1>HOME</h1>
                    </Link>
                </div>
                <div className="HeadIconsPosition">
                    <img className="headerIcons" src={require('../Pictures/fonctionnement.png')}/>
                    <h1>Fitness Check</h1>
                </div>
                <div className="HeadIconsPosition">
                    <img className="headerIcons" src={require('../Pictures/information.png')}/>
                    <img className="headerIcons" src={require('../Pictures/deconnexion.png')}/>
                    <h1>Logout</h1>
                </div>
            </header>
            <div>
                <h1>Profile</h1>
                {/* Condition vérifiant si le profil est éditable ou non*/}
                {/* Si on est pas en mode EDIT, on peut y passer */}
                {!isEditable && (
                    <>
                        <ProfileReadOnly {...userDatas} />
                        <button onClick={handleEdit}>EDIT</button>
                    </>
                )}
                {/* EDITING MODE */}
                {isEditable && (
                    <>
                        <ProfileEditable {...userDatas} />
                        <button onClick={BACK}>BACK</button>
                    </>
                )}
            </div>
        </>
        
    );
}



function ProfileEditable(props) {

    const [editedData, setEditedData] = useState(
        {
                    firstName:  props.firstName,
                    lastName:   props.lastName,
                    birthDate:  props.birthDate
                 });
    
    // OLD VERSION --> REFACTOR IN 1 METHODE
    /*function handleFirstNameChange(event) {
        setEditedFirstName(event.target.value);
    }
    
    function handleLastNameChange(event) {
        setEditedLastName(event.target.value);
    }
    
    function handleBirthDateChange(event) {
        setEditedBirthDate(event.target.value);
    }
    */
    
    function handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        setEditedData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    
    
    async function handleSubmit(event)
    {
        event.preventDefault();
        // Check if all fields are not empty
        if (Object.values(editedData).every((val) => val.trim())) {
            // RETOURNER DATA  LES DATA A LA DB
            await updateUserProfile(auth.currentUser.email, editedData);
        } else {
            // Handle empty fields error
            console.log("Error: Fields cannot be empty!");
        }
        
        
        //await updateUserProfile(auth.currentUser.email, editedData);
        
    }
    
    // UPDATE USER PROFILE
    // This function is used to update the user profile in Firestore.
    // It takes the userId and newUserData as parameters and updates the user profile in Firestore.
    const updateUserProfile = async (userId, newUserData) =>
    {
        console.log('UPDATE USER PROFILE FOR '+ userId + " with data : " + newUserData)
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
            await setDoc(userRef, newUserData, {merge: true}); // merge permet de ne pas écraser les données existantes (si le document existe déjà) mais de les mettre à jour avec les nouvelles données
        }
        
        console.log("user update result : " + docSnap.data());
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="first-name-input">First Name:</label>
                <input
                    type="text"
                    id="first-name-input"
                    name="firstName"
                    value={editedData.firstName}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="last-name-input">Last Name:</label>
                <input
                    type="text"
                    id="last-name-input"
                    name="lastName"
                    value={editedData.lastName}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="birth-date-input">Birth Date:</label>
                <input
                    type="date"
                    id="birth-date-input"
                    name="birthDate"
                    
                    value={editedData.birthDate}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Update Changes</button>
        </form>
    );
}


function ProfileReadOnly(props) {
    const { firstName, lastName, birthDate, email, isAdmin } = props;
    return (
        <div>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Birth Date: {birthDate}</p>
            <p>Email: {email}</p>
            <p>Is Admin: {isAdmin ? "Yes" : "No"}</p>
        </div>
    );
}