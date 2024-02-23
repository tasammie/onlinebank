import {db, auth} from "./index.js"
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'

const colRef = collection(db, "users")
const colAccRef = collection(db, "Account")
async function addDataToDatabase(e){
    e.preventDefault()
    const firstName = formData.firstName.value;
    const lastName = formData.lastName.value;
    const email = formData.email.value;
    const phone = formData.phone.value
    const password = formData.password.value
   
   try {
    // create user to out auth
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredentials);
    //  colect user deyails to forestiore
    const res = await addDoc(colRef, { firstName, lastName, email,phone,password })

    const AccountNumberGenerator = Math.floor(Math.random() * 9836484939)
    const resAc = await addDoc(colAccRef,{balance: 0, ref: email, accountNumber: AccountNumberGenerator  })

    console.log(res);
    console.log(res.Acc, 'bank account created for ' + firstName + ' ' + lastName);
    // getAllDataFromDB()
   } catch (error) {
    console.log(error);
   }
}

onAuthStateChanged(auth,(user)=>{
    console.log(auth);
    if (user) {
        if (user.email) {
            // window.location.href = './index.html'
        }

    }
})


formData.addEventListener('submit', addDataToDatabase )