const firebaseConfig = {
    apiKey: "AIzaSyAE0Yay0rV5y2wzYPeuHpxPe83XKADLGuI",
    authDomain: "eagle-mkt.firebaseapp.com",
    databaseURL: "https://eagle-mkt-default-rtdb.firebaseio.com",
    projectId: "eagle-mkt",
    storageBucket: "eagle-mkt.appspot.com",
    messagingSenderId: "860642405488",
    appId: "1:860642405488:web:bad9dcb259bed304d158b5",
    measurementId: "G-G4LSNERB8C"
};

// Importações modulares do Firebase v9+
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
// Exporta as instâncias dos serviços do Firebase que você vai usar
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();