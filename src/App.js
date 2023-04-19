import "./App.css";

import firebase from "firebase/compat/app";
import firebaseApp from "./initFirebase";
import {db, auth} from "./initFirebase";
import {addDoc, collection, doc, getDoc, setDoc, Timestamp, updateDoc} from "firebase/firestore";
import {getAdditionalUserInfo, User, } from "firebase/auth"
import {StyledFirebaseAuth} from "react-firebaseui";
import 'firebaseui/dist/firebaseui.css'

import {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import Questionnaire from "./screens/Questionnaire";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Resultats from "./screens/Resultats";
;

// Configure FirebaseUI.
// This object contains the configuration for FirebaseUI, which is used to authenticate users using email and Google Sign-In providers.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: "redirect",
	// We will display Google and Facebook as auth providers.
	signInOptions:
						 [
							 firebase.auth.EmailAuthProvider.PROVIDER_ID,
							 firebase.auth.GoogleAuthProvider.PROVIDER_ID
						 ],
	signInSuccessUrl:    '/',
	allowForgotPassword: true,
	callbacks: // What to do after sign-in success or failure.
						 {
							 // Avoid redirects after sign-in.
							 signInSuccessWithAuthResult: () => false,
						 },
};


export default function App()
{
    // Local signed-in state.
    const [isSignedIn, setIsSignedIn] = useState(null);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() =>
    {
        // This hook is used to listen to changes in the Firebase Authentication state and update the local state accordingly.
        // The onAuthStateChanged function is passed to the firebaseApp.auth() object,
        // which is called every time the authentication state changes.
        // The unregisterAuthObserver function is returned from the hook,
        // which is used to unregister the Firebase observer when the component unmounts.
        const unregisterAuthObserver = firebaseApp
                                                    .auth()
                                                    .onAuthStateChanged((user) =>
                                                    {
                                                        setIsSignedIn(!!user);
                                                    });

        // Make sure we un-register Firebase observers when the component unmounts.
        return () => unregisterAuthObserver();
    }, []);
    
    
    // Create a default user in the DB if user is signed in
    // This hook is used to create a default user profile in Firestore when the user signs in for the first time.
    // It listens to changes in the isSignedIn state and calls the createDefaultUser function when the state changes.
    // The createDefaultUser function checks if the user's profile exists in Firestore and creates it if it doesn't.
    // The function also sets the isAdmin property of the user's profile to true,
    // which indicates that the user is an administrator.
    useEffect(() =>
    {
        console.log("USE EFFECT");
        
        // If user is signed in (AUTH), create a default user in the DB
        if (isSignedIn)
        {
            createDefaultUser().then(r => console.log("createDefaultUser() result : " + r));
            
        }
    }, [isSignedIn]); // Use Effect CALLED ONLY WHEN isSignedIn changes
    
    // DEFAULT USER PROFILE CREATION
    const createDefaultUser = async () =>
    {
        // Create a new user profile in the DB if it doesn't exist yet for the current user email address (auth.currentUser.email)
        const userRef = doc(db, "users", auth.currentUser.email);
        const data = {
            email: auth.currentUser.email,
            uid:   auth.currentUser.uid,
            isAdmin: true,
            //firstName:                 ON REMPLIT CES DONNE DEPUIS LE PROFIL
            //lastName:
            //birthDate:
            xolo: "non"
        }
        
        // Get the user profile from the DB
        const docSnap = async () =>
        {
            const snapShot = await getDoc(userRef);
            return snapShot;
        }
        const snapshot = await docSnap();
        
        // If the user profile doesn't exist, create it
        // If the user profile already exists, update it
        // TODO : Bon ben IF et ELSE font la même chose ici, car le ELSE utilise l'option MERGE qui met à jour les données existantes
        if (snapshot.exists())
        {
            console.log("Document data already exist :", snapshot.data());
            // Merge it with the new data from the auth provider (if it exists)
            
            // TODO : VOIR QUELLE VERSION EST INTERESSANTE
            // VERSION 1
            // await updateDoc(userRef, data)
            
            // VERSION 2
            const oldUserData = snapshot.data();
            const newUserData = data;
            const mergedUserData = { ...oldUserData, ...newUserData };
            
            // Only update the user profile if the data has changed. This prevents an infinite loop of updates.
            if (JSON.stringify(oldUserData) !== JSON.stringify(mergedUserData)) {
                await setDoc(userRef, mergedUserData);
            }
        }
        else // If the user profile doesn't exist, create it
        {
            console.log("Document doesn't exist, created default user");
            await setDoc(userRef, data, {merge: true}); // merge permet de ne pas écraser les données existantes (si le document existe déjà) mais de les mettre à jour avec les nouvelles données
            console.log("user created in DB : " + auth.currentUser.email + "\nUID : " + auth.currentUser.uid);
        }
    }
    
    // UPDATE USER PROFILE
    // This function is used to update the user profile in Firestore.
    // It takes the userId and newUserData as parameters and updates the user profile in Firestore.
    const updateUserProfile = async (userId, newUserData) =>
    {
        console.log('UPDATE USER PROFILE FOR '+ userId + " with data : " + newUserData)
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const oldUserData = docSnap.data();
            const mergedUserData = { ...oldUserData, ...newUserData };
            
            // Only update the user profile if the data has changed. This prevents an infinite loop of updates.
            if (JSON.stringify(oldUserData) !== JSON.stringify(mergedUserData)) {
                await setDoc(docRef, mergedUserData);
            }
        }
        
        console.log("user update result : " + docSnap.data());
    }
    
    // Methode to reset password
    const handleResetPasswordClick = () =>
    {
        const email = prompt("Please enter your email address");

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Si ça na pas le bon format, return
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        firebaseApp
            .auth()
            .sendPasswordResetEmail(email)
            .then(() =>
            {
                alert("Password reset email sent! Check your inbox.");
            })
            .catch((error) =>
            {
                console.error(error);
                alert("Error sending password reset email. Verify email address & Please try again.");
            });
    };

    // *********************************************************************************************************************
    // CONDITIONAL RENDERING OF THE APP (loading, auth, app)
    // *********************************************************************************************************************
    
    // Not initialized yet - Render loading message
    if (isSignedIn === null)
    {
        return (
            <div className="App">
                <p>Loading...</p>
            </div>
        );
    }

    // Not signed in - Render auth screen
    if (!isSignedIn)
        return (
            <div className="App">
                <h1>Fitness Check - WebApp</h1>
                <h2>Please sign-in:</h2>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebaseApp.auth()}
                />
                <button onClick={handleResetPasswordClick}>Forgot Password</button>
            </div>
        );
    
    // Signed in - Render app
    if(isSignedIn)
    {
        return (
            <>
                <div className="App">
                    <Routes>
                        <Route path="/" 				element={<Home/>}/>
                        <Route path="/questionnaire" 	element={<Questionnaire/>}/>
                        <Route path="/profile" 			element={<Profile/>}/>
                        <Route path="/resultats" 		element={<Resultats/>}/>
                    </Routes>
                </div>
            </>
        
        );
    }
    
}

