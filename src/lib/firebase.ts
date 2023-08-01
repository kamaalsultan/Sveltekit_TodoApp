import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBC8U3UNUUYXBh-oM4dIH56YbiPpD8ksSc",
    authDomain: "todoapp-0728.firebaseapp.com",
    databaseURL: "https://todoapp-0728-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todoapp-0728",
    storageBucket: "todoapp-0728.appspot.com",
    messagingSenderId: "237229524940",
    appId: "1:237229524940:web:c177c746f4a93829c9ff69",
    measurementId: "G-47275DNC32"
};

let firebaseApp!: FirebaseApp;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
}

const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, firebaseAuth, db };
