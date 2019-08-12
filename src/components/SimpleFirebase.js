import React, { Component } from "react"
import firebaseui from 'firebaseui'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase/app"
import "firebase/auth"
import "../assets/css/app.css"
import "../assets/css/simplefirebase.css"

const firebaseApp=firebase.initializeApp({
  apiKey: process.env.GATSBY_FIREBASE_APIKEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASEURL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGESENDER,
  appId: process.env.GATSBY_FIREBASE_APPID,
})

class SimpleFirebase extends Component {
  state = {
    isSignedIn: false,
  }
  /* uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  } */
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }
  render() {
    const { isSignedIn } = this.state
    return (
      <div className="container">
        <div className="caption">This is a cool demo app</div>
        {isSignedIn !== undefined && !isSignedIn && (
          <div>
            <StyledFirebaseAuth
              className="firebaseUi"
              uiConfig={{
                // Popup signin flow rather than redirect flow.
                signInFlow: "popup",
                // We will display Google and Facebook as auth providers.
                signInOptions: [
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                ],
                credentialHelper: 'none', // disables authchooser when logs out
                callbacks: {
                  // Avoid redirects after sign-in.
                  signInSuccessWithAuthResult: () => false,
                },
              }}
              firebaseAuth={firebaseApp.auth()}
            />
          </div>
        )}
        {isSignedIn && (
          <div className='signedIn'>
            Hello {firebaseApp.auth().currentUser.displayName}. You are now
            signed In!
            <a
              className='button'
              onClick={() => firebaseApp.auth().signOut()}
            >
              Sign-out
            </a>
          </div>
        )}
      </div>
    )
  }
}
export default SimpleFirebase
