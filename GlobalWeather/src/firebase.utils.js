import firebase from 'firebase/app';
import 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyBE2gKM6KYDD1sdpq8MonLdEgRAjQAq3_U",
    authDomain: "pl-global-weather.firebaseapp.com",
    projectId: "pl-global-weather",
    storageBucket: "pl-global-weather.appspot.com",
    messagingSenderId: "109031117318",
    appId: "1:109031117318:web:5cc2329df473f989d96987",
    measurementId: "G-W9XGYH8HZP"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;