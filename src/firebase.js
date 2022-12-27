import {initializeApp, intializeApp} from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWIthPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    AuthErrorCodes
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
export const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
// connectAuthEmulator(auth, "http://localhost:9099");

const authErrorMessage = (error) => {
    if(error === AuthErrorCodes.INVALID_DISPLAY_NAME){
        return("Name cannot be blank");
    }
    else if(error === AuthErrorCodes.INVALID_EMAIL){
        return("Invalid email");
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try{
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        console.log("Logged in!");

    }catch(err){
        console.log(err.message);
        return err;
    }
};

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
        return "success";
    }catch(error){
        console.log(error.message);
        let err = authErrorMessage(error.message);
        return err;
    }
};

export const logOut = () =>{
    signOut(auth);
};


// export const logout = () => {
    
// }

