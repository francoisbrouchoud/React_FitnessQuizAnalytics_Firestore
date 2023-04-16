import "./App.css";

import firebase from "firebase/compat/app";
import firebaseApp from "./initFirebase";
import {db, auth} from "./initFirebase";
import {addDoc, collection, doc, setDoc, updateDoc} from "firebase/firestore";
import {getAdditionalUserInfo, User, } from "firebase/auth"
import {StyledFirebaseAuth} from "react-firebaseui";
import 'firebaseui/dist/firebaseui.css'

import {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import Questionnaire from "./screens/Questionnaire";
import Home from "./screens/Home";
;

// Configure FirebaseUI.
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
        const unregisterAuthObserver = firebaseApp
                                                    .auth()
                                                    .onAuthStateChanged((user) =>
                                                    {
                                                        setIsSignedIn(!!user);
                                                    });
        
        const createDefaultUserInDB = async () =>{
            await createDefaultUser().then(r => console.log("createDefaultUser: ", r.toString()));
        }
        
        // If user is signed in, create a default user in the DB
        if (isSignedIn)
            createDefaultUserInDB();
        
        
        // Make sure we un-register Firebase observers when the component unmounts.
        return () => unregisterAuthObserver();
    }, []); // TODO : Add isSignedIn to the dependency array to avoid infinite loop when user is signed in and createDefaultUserInDB is called (but it will create an infinite loop when user is not signed in)

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
    
    // DEFAULT USER PROFILE CREATION
    const createDefaultUser = async () =>
    {
        console.log('CREATE DEFAULT USER FOR '+ auth.currentUser.email)
        
        // Create a new user profile in the DB if it doesn't exist yet for the current user email address (auth.currentUser.email)
        const userRef = doc(db, "users", auth.currentUser.email);
        await setDoc(userRef, {
            email: auth.currentUser.email,
            //uid:   auth.currentUser.uid,
            isAdmin: true,
            //firstName: auth.additionalUserInfo.profile.given_name, // I want to get infos from the Google account if it exists
            //lastName: "Doe",
            birthDate: 1997,
        }/*, {merge: true}*/);
        
        console.log("user created in DB" + auth.currentUser.email);
                    //+ "\nUID : "+ auth.currentUser.uid);
    }
    
    // Signed in - Render app
    return (
        <>
            
            <div className="App">
                <Routes>
                    <Route path="/" 				element={<Home/>}/>
                    <Route path="/questionnaire" 	element={<Questionnaire/>}/>
                </Routes>
            </div>
        </>
        
    );
}

