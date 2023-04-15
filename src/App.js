import "./App.css";

import firebase from "firebase/compat/app";
import firebaseApp from "./initFirebase";
import {db, auth} from "./initFirebase";
import {StyledFirebaseAuth} from "react-firebaseui";
import 'firebaseui/dist/firebaseui.css'

import {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import Questionnaire from "./screens/Questionnaire";
import Home from "./screens/Home";

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

        // Make sure we un-register Firebase observers when the component unmounts.
        return () => unregisterAuthObserver();
    }, []);

    // Methode to reset password
    const handleResetPasswordClick = () =>
    {
        const email = prompt("Please enter your email address");

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    // Signed in - Render app
    return (
        <div className="App">
            <Routes>
                <Route path="/" 				element={<Home/>}/>
                <Route path="/questionnaire" 	element={<Questionnaire/>}/>
            </Routes>
        </div>
    );
}

export default App;
