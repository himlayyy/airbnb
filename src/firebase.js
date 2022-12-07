import {initializeApp, intializeApp} from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWIthPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    connectAuthEmulator
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
// connectAuthEmulator(auth, "http://localhost:9099");

export const registerWithEmailAndPassword = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user= res.user;
        await addDoc(collection(db, "users"),{
            uid:user.uid,
            name, 
            authProvider:"local",
            email,
        });
        console.log("Registered!");
    }catch(err){
        console.error(err);
        alert(err.message);
    }
};

// export const logout = () => {
    
// }

