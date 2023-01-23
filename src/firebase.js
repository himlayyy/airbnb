import { initializeApp } from "firebase/app";
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
  initializeFirestore,
  getFirestore,
  query,
  getDoc,
  getDocs,
  collection,
  where,
  addDoc,
  onSnapshot,
  writeBatch,
  doc, 
  updateDoc,
  arrayUnion,
  setDoc
} from "firebase/firestore";
import {
  ref,
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { GiCootieCatcher } from "react-icons/gi";
import { eachDayOfInterval } from "date-fns";
// import {docsArray, roomsIdObj}  from "./new";

const firebaseConfig = { apiKey: "AIzaSyC6vu78v_j-A_rB98vfBqghI_f56j4MxeE",
authDomain: "airbnb-clone-4289d.firebaseapp.com",
projectId: "airbnb-clone-4289d",
storageBucket: "airbnb-clone-4289d.appspot.com",
messagingSenderId: "251391481617",
appId: "1:251391481617:web:fdc742c155e6d807fe5eb0", };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const db = getFirestore(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling:true
});
const storage = getStorage();
const storageRef = ref(storage);

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

export const getRoomsInCountry = async (country) => {
  console.log(country);
  try{
    let rooms = [];
    const querySnapshot = await getDocs(collection(db, country));
    
    
    querySnapshot.forEach((doc) => {
      rooms.push({...doc.data(), id:doc.id})
    });
    console.log("successss!!!!");
    return rooms;
  }
  catch (err) {
    console.error(err);
  }
};

export const getRoomInCountry = async (country, id) => {

  try{
    const docRef = doc(db, country, id);
    const docSnap = await getDoc(docRef);
    
    return docSnap.data();


  }catch(err){
    console.log(err);
  }
}



// Get a new write batch
// const batch = writeBatch(db);
// // Set the value of 'NYC'
// const nycRef = doc(db, "cities", "NYC");
// batch.set(nycRef, {name: "New York City"});
// // Update the population of 'SF'
// const sfRef = doc(db, "cities", "SF");
// batch.update(sfRef, {"population": 1000000});
// // Delete the city 'LA'
// const laRef = doc(db, "cities", "LA");
// batch.delete(laRef);
// // Commit the batch
// await batch.commit();

export const batchWrite = async (docsObj) => {
  // try{
    console.log("In batchWrite");
    const batch = writeBatch(db);
    const idsArr = Object.keys(docsObj);
    const itemsArr = Object.values(docsObj);

    console.log("idsArr ", idsArr);
    console.log("itemsArr", itemsArr);

    Object.entries(docsObj).forEach(([key,value]) => {
        const docRef = getDoc(db,"philippines",key);
      console.log(docRef);
      console.log(value);
        batch.update(docRef, value);
      }
    )

    //   const docRef = doc(db, country, id);
    // const docSnap = await getDoc(docRef);
    
    
    // idsArr.forEach((id) => {
    //     const docRef = doc(colelction(db, "philippines", id));
    //     batch.set(docRef, itemsArr[id])

    // })

    // Object.keys(docsObj).forEach((id) => {
    //   const docRef = doc(collection(db, "philippines/"));
    //   batch.set(docRef, item);
    // });
    // await batch.commit();   
    console.log("Done!")
  // }catch(err){
  //   console.log(err)
  // }
}

const uploadFile = async (fileRef, file) => {
  const uploadTask = await uploadBytesResumable(fileRef, file);

  uploadTask.on('state_changed', (snapshot) => {
    // Get task progress
    const progress =  (snapshot.bytesTransferred / snapshot.totalBytes);
    console.log(`Upload is ${progress}% done`);

    switch(snapshot.state){
      case 'paused':
        console.log("Upload is paused");
        break;
      case 'running':
        console.log("Upload is running");
        break;
      default:
        console.log("In default");
    }
  },
  (error) => {
    console.log(error)
    switch(error.code){
      case "storage/unauthorized":
        break;
      case "storage/cancelled":
        break; 
      default:
        break;
    }
  },
  () => {
    let fileURL = getDownloadURL(uploadTask.snapshot.ref);
    console.log(fileURL);
    return fileURL;
  });
};


const addImgRefsToDoc = async (docRef, imgArr) => {
  try{
    const batch = writeBatch(db);
    const docRef = doc(collection(db, docRef));
    batch.update(docRef, {"images": imgArr});
    await batch.commit();
    console.log(`${docRef} image array added`)
  }catch(err){
    console.log(err);
  }
};


const updateStayDetails = async (details, field, data) => {

}

const getDocAndUpdate = async (docRef, field, data) => {
  console.log(field);
  try{
    console.log("getting doc")
    const doc = await getDoc(docRef);

    // Check if field exists, if true update field
    if(Object.keys(doc.data).includes(`${field}`)){
      await setDoc(docRef, {field: arrayUnion(data)}, {merge:true});
    }
    // Field does not exist, create field and add data
    else{
       console.log(`${field} does not exist!...creating ${field}`);
      await setDoc(docRef, {[`${field}`]:[data]}, {merge:true});
    }
    console.log("A New Document Field has been added to an existing document");

  }catch(err){
    console.log("In getDocAndUpdate", err);
  }
};

export const bookStay =  async (details, userId) => {
  console.log("in book stay");

  try{

    // Get matching stay document
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const querySnapshot = await getDocs(q);
    console.log(q);

    // Add booking details to user 
    try{
      console.log(querySnapshot)
      querySnapshot.forEach((res) => {
        const docRef = doc(db, "users", res.id);
        getDocAndUpdate(docRef, "bookings", details)
      }); 
    }catch(err){
      console.log(err)
    }

    // Add booking details to stay
    try{
      const docRef = doc(db, details.country, details.stayId);
      const data = details.stayDates;
      getDocAndUpdate(docRef, "bookings", data);
    }catch(err){
      console.log("Error in adding booking details to stay", err);
    }

  }catch(err){
    console.log("Error in adding booking details", err);
  }

  // Add booking details to stay
  
};

// export const createDocImgFolderAndUpload = async (country) => {
//   try{
//     let docsIdArr = [];
//     const roomsInCountryImgsFolderRef = ref(storage, `images/${country}`);
//     // const imagesRef = ref(storage, "images/country/")
//     const docs = await getDocs(collection(db, country));
//     docs.forEach((doc) => docsIdArr.push(doc.id));

//     docsIdArr.forEach((id) => {
//       let imgArr = [];
//       const roomFolderRef = ref(roomsInCountryImgsFolderRef, `${id}`);
//       roomsIdObj[id].forEach((img, i) =>
//         {
//           const imgInFolderRef = ref(roomFolderRef, `0${i+1}`);
          // const imgStorageRef =  uploadFile(imgInFolderRef, img);
          // console.log(`Image ref: ${imgStorageRef}`);
          // imgArr.push(imgStorageRef);

//           uploadFile(imgInFolderRef, img).then((url ) => imgArr.push(url));

//         }
//       );
      
      // console.log(imgArr);
      // Promise.all(imgArr);
//       console.log(imgArr);
//       addImgRefsToDoc(id, imgArr);
//     });
//   }catch(err){
//     console.log(err);
//   }
// };

