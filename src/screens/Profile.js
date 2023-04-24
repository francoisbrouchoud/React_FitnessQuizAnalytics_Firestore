import React, {useEffect, useState} from "react";
import firebaseApp, {auth, db} from "../initFirebase";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {Link} from "react-router-dom";
import {AppHeader} from "./AppHeader";


// TODO : Ajouter un boutton pour IsAdmin
// TODO : Ajouter un boutton pour IsGroupLeader
export default function Profile() {
    
    const [isEditable,  setIsEditable]  = useState(false);
    const [userDatas,        setUserDatas]  = useState({});
    
    useEffect(() => {
        // Récupérer les données de l'utilisateur dans la base de données ou l'API
        const fetchUserDataFromDB = async () => {
            const docRef = doc(db, 'users', auth.currentUser.email );
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserDatas(data);
                console.log('Users Data fetched for profile !', data);
            } else {
                console.error('No such document!');
            }
        };
        
        // Call the function to fetch the data, use the .then() method to wait for the promise to resolve and then set the state with the result
        fetchUserDataFromDB()

    }, [isEditable]);
    
    // BTN EDIT PROFILE
    function handleEdit() {
        setIsEditable(true);
    }
    
    // BTN SAVE PROFILE
    function BACK() {
        // Va changer l'affichage du composant & fetch les données de l'utilisateur depuis la DB
        setIsEditable(false);
    }
    
    // BTN EDIT GROUP
    function handleGroup() {
    
    }
    
    
    
    return (
        <div className="card profile-card">
            <h1>Profil</h1>
            <img className="profileIcon" src={require('../Pictures/avatarHomme.png')}/>
            {/* Condition vérifiant si le profil est éditable ou non*/}
            {/* Si on est pas en mode EDIT, on peut y passer */}
            {!isEditable && (
              <>
                  <ProfileReadOnly {...userDatas} />
                  <button className="primary-button" onClick={handleEdit}>Modifier</button>
                  <button className="primary-button" onClick={handleGroup}>Gestion du groupe</button>
                  {userDatas.isAdmin && (
                      <Link to="/admin">
                          <button className="primary-button">Administrateur</button>
                      </Link>)}
              </>
            )}
            {/* EDITING MODE */}
            {isEditable && (
              <>
                  <ProfileEditable {...userDatas} />
                  <button className="primary-button" onClick={BACK}>Retour</button>
              </>
            )}
        </div>
    );
}



function ProfileEditable(props) {

    const [editedData, setEditedData] = useState(
        {
                    firstName:     props.firstName,
                    lastName:      props.lastName,
                    birthDate:     props.birthDate,
                    isGroupLeader: props.isGroupLeader
                 });
    
    //console.log("ProfileEditable props : " , props);
    
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
        //const value = target.type === 'radio' ? target.checked : target.value;
        const value = target.type === "checkbox" ? target.checked : target.value;
        
        
        setEditedData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    
    
    async function handleSubmit(event)
    {
        event.preventDefault();
        // Check if all fields are not empty
        // if (Object.values(editedData).every((val) => val.trim())) {
        //     // RETOURNER LES DATA A LA DB
        //     await updateUserProfile(auth.currentUser.email, editedData);
        // } else {
        //     // Handle empty fields error
        //     console.log("Error: Fields cannot be empty!");
        // }

        await updateUserProfile(auth.currentUser.email, editedData);
        
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
        <form onSubmit={handleSubmit} className="login-form profile-form">
            <div className="form-fields">
                <label htmlFor="first-name-input">Prénom :</label>
                <input
                    type="text"
                    id="first-name-input"
                    name="firstName"
                    value={editedData.firstName}
                    //defaultValue={null}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-fields">
                <label htmlFor="last-name-input">Nom :</label>
                <input
                    type="text"
                    id="last-name-input"
                    name="lastName"
                    value={editedData.lastName}
                    //defaultValue={null}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-fields">
                <label htmlFor="birth-date-input">Date de naissance :</label>
                <input
                    type="date"
                    id="birth-date-input"
                    name="birthDate"
                    value={editedData.birthDate}
                    //defaultValue={null}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-fields">
                <label htmlFor="is-group-leader-input">Est chef de groupe :</label>
                <input
                    type="checkbox"
                    id="is-group-leader-input"
                    name="isGroupLeader"
                    checked={editedData.isGroupLeader}
                    onChange={handleInputChange}
                />
            </div>
            {/*<div className="form-fields">*/}
            {/*    <label htmlFor="is-group-leader-input">Est responsable de groupe :</label>*/}
            {/*    <div className="radio-group">*/}
            {/*        <label>*/}
            {/*            <input*/}
            {/*                type="radio"*/}
            {/*                id="is-group-leader-yes"*/}
            {/*                name="isGroupLeader"*/}
            {/*                value="true"*/}
            {/*                checked={editedData.isGroupLeader === 'true'}*/}
            {/*                onChange={handleInputChange}*/}
            {/*            />*/}
            {/*            Oui*/}
            {/*        </label>*/}
            {/*        <label>*/}
            {/*            <input*/}
            {/*                type="radio"*/}
            {/*                id="is-group-leader-no"*/}
            {/*                name="isGroupLeader"*/}
            {/*                value="false"*/}
            {/*                checked={editedData.isGroupLeader === 'false'}*/}
            {/*                onChange={handleInputChange}*/}
            {/*            />*/}
            {/*            Non*/}
            {/*        </label>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <button className="primary-button" type="submit">Enregistrer</button>
        </form>
    );
}


function ProfileReadOnly(props) {
    const { firstName, lastName, birthDate, email, isAdmin, isGroupLeader } = props;

    //console.log("ProfileReadOnly props : " , props);
    return (
        <div>
            <p><strong>Prénom :</strong>            {firstName }</p>
            <p><strong>Nom :</strong>               {lastName }</p>
            <p><strong>Date de naissance :</strong> {birthDate}</p>
            <p><strong>E-mail :</strong>            {email}</p>
            <p><strong>Est chef de groupe :</strong>{isGroupLeader ? "Oui" : "Non"}</p>
            <p><strong>Est admin :</strong>         {isAdmin ? "Oui" : "Non"}</p>
        </div>
    );
}

