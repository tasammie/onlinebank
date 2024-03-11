// 

import {db, auth, storage} from "./index.js"
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const colRef = collection(db, "users")
const colAccRef = collection(db, "Account")

async function addDataToDatabase(e){
    e.preventDefault()
    const firstName = formData.firstName.value;
    const lastName = formData.lastName.value;
    const email = formData.email.value;
    const phone = formData.phone.value;
    const password = formData.password.value;
    const profileImage = formData['profile-image'].files[0]; // Get the uploaded file

    try {
        // Create user in auth
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        // Upload profile image to Firebase Storage
        const storageRef = ref(storage, 'profile-images/' + email + '/' + profileImage.name);
        await uploadBytes(storageRef, profileImage);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Collect user details to Firestore
        const res = await addDoc(colRef, { firstName, lastName, email, phone, password, profileImageURL: downloadURL });

        // Generate bank account number
        const AccountNumberGenerator = Math.floor(Math.random() * 9836484939);
        const resAc = await addDoc(colAccRef, { balance: 100, ref: email, accountNumber: AccountNumberGenerator });

        window.location.href = '../page/dashboard.html';

        console.log(res);
        console.log(resAc, 'bank account created for ' + firstName + ' ' + lastName);
    } catch (error) {
        console.log(error);
    }
}

onAuthStateChanged(auth, (user) => {
    console.log(auth);
    if (user) {
        if (user.email) {

        }

    }
})

formData.addEventListener('submit', addDataToDatabase);
