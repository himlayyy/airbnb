import {intializeApp} from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWIthPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    connectEmulator
} from "firebase/auth";
import {
    getFirestore,
    query, 
    getDocs,
    collection,
    where,
    addDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6vu78v_j-A_rB98vfBqghI_f56j4MxeE",
    authDomain: "airbnb-clone-4289d.firebaseapp.com",
    projectId: "airbnb-clone-4289d",
    storageBucket: "airbnb-clone-4289d.appspot.com",
    messagingSenderId: "251391481617",
    appId: "1:251391481617:web:fdc742c155e6d807fe5eb0"
};

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");
