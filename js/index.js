// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  getDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxb9Oq5YaA5V2c87kfltG-WcD4d31TJHE",
  authDomain: "bank-app-56367.firebaseapp.com",
  projectId: "bank-app-56367",
  storageBucket: "bank-app-56367.appspot.com",
  messagingSenderId: "1070957467255",
  appId: "1:1070957467255:web:a81238f2ee02eded1f5872",
  measurementId: "G-6844P7CG07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const colRef = collection(db, "users");
export const auth = getAuth(app);
export const signInUser = async (email, password) => {
  const message = {
    success: "",
    message: "",
  };
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    message.success = true;
    message.message = "Successfully signed in";
    message.result = res;
    return message;
  } catch (error) {
    message.success = false;
    message.message = "failed to sign in";
    message.error = error;
    return message;
  }
};
export const sendResetEmail = async (email) => {
  sendPasswordResetEmail(auth, email);
};
export const logOutUser = async (email) => {
  signOut(auth, email);
  console.log("Logout successful!");
  // localStorage.removeItem("user");
};

onAuthStateChanged(auth, async (user) => {
  userDetails.innerHTML = "";
  if (user) {
    const q = query(colRef, where("email", "==", user?.email));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty)
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const data = docSnapshot.data();
      console.log(data)
      try {
        userDetails.innerHTML = data.firstName + " " + data.lastName;
      } catch (error) {
        return;
      }
    } else {
      userDetails.innerHTML = "";
      console.log("No user found with the email:", user.email);
    }
  }
});

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     const q = query(colRef, where("email", "==", user.email));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       const docSnapshot = querySnapshot.docs[0];
//       const data = docSnapshot.data();
//       console.log(data);
//       try {
//         userDetails.innerHTML = data.firstName + " " + data.lastName
//       } catch (error) {
//         return
//       }
//     } else {
//       console.log("No user found with the email:", user.email);
//     }
//   }
// });
