import { initializeApp, intializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWIthPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  AuthErrorCodes,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6vu78v_j-A_rB98vfBqghI_f56j4MxeE",
  authDomain: "airbnb-clone-4289d.firebaseapp.com",
  projectId: "airbnb-clone-4289d",
  storageBucket: "airbnb-clone-4289d.appspot.com",
  messagingSenderId: "251391481617",
  appId: "1:251391481617:web:fdc742c155e6d807fe5eb0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
// connectAuthEmulator(auth, "http://localhost:9099");

const authErrorMessage = (error) => {
  if (error === AuthErrorCodes.INVALID_DISPLAY_NAME) {
    console.log("Name cannot be blank");
  } else if (error === AuthErrorCodes.INVALID_EMAIL) {
    console.log("Invalid email");
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // console.log("Logged in!");
  } catch (err) {
    console.log(err);

    // console.log(err.message);
    // authErrorMessage(err);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("success!!!!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logOut = () => {
  signOut(auth);
};

