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
  updateDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const colRef = collection(db, "Account");
const userColRef= collection(db, "users");

// const user = auth.currentUser;
sendMoneyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const receiverAccountNumber = accountNo.value;
  console.log(receiverAccountNumber);
  const amount = parseFloat(sendMoneyForm.amount.value);
  console.log(amount);
  const notes = sendMoneyForm.notes.value;
  transferMoney(receiverAccountNumber, amount, notes);
});

async function transferMoney(receiverAccountNumber, amount, notes) {
  try {
    console.log("Transfer initiated");
    const senderQuerySnapshot = await getDocs(
      query(colRef, where("ref", "==", auth.currentUser.email))
    );

    senderQuerySnapshot.forEach(async (senderAccount) => {
      try {
        console.log("Sender account found:", senderAccount.id);
        const senderDocRef = doc(colRef, senderAccount.id);
        const currentBalance = parseFloat(senderAccount.data().balance);

        if (currentBalance >= amount) {
          const newSenderBalance = currentBalance - amount;
          await updateDoc(senderDocRef, { balance: newSenderBalance });
          const q = query(
            colRef,
            where("accountNumber", "==", Number(receiverAccountNumber))
          );
          console.log(receiverAccountNumber);
          const receiverQuerySnapshot = await getDocs(q);
            console.log(receiverQuerySnapshot, 'receiverQuerySnapshot');
            console.log(receiverQuerySnapshot.empty)
          if (!receiverQuerySnapshot.empty) {
            console.log("Receiver account found");
            receiverQuerySnapshot.forEach(async (receiverAccount) => {
              try {
                const receiverDocRef = doc(colRef, receiverAccount.id);
                const receiverCurrentBalance = parseFloat(
                  receiverAccount.data().balance
                );
                const receiverNewBalance = receiverCurrentBalance + amount;
                    console.log(receiverNewBalance, 'receiverNewBalance');
                await updateDoc(receiverDocRef, {
                  balance: receiverNewBalance,
                });
                console.log("Transaction was successful");
                const transactioncolRef = collection(db, 'Transactions')
                const senderSnapshot = await getDocs(query(userColRef, where('email', '==', auth.currentUser.email)))
                let senderName;
                let senderEmail;
                senderSnapshot.forEach((senderAcc)=>{
                  senderEmail = senderAcc.data().email
                   senderName = senderAcc.data().firstName + ' ' + senderAcc.data().lastName
                })
                const receiverSnapshot = await getDocs(query(userColRef, where('email', '==', receiverAccount.data().ref)))
                let receiverName;
                receiverSnapshot.forEach((receiverAcc)=>{
                  receiverName = receiverAcc.data().firstName + ' ' + receiverAcc.data().lastName
                })
                const transaction = {
                  sender: senderName,
                  senderEmail,
                  receiver: receiverName,
                  amount,
                  remark: notes,
                  
                  transactionDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
                }
                const transactionSnapshot = await addDoc(transactioncolRef, transaction)
                alert("Transaction was successful");

              } catch (error) {
                console.error("Error updating receiver document:", error);
              }
            });
          } else {
            console.log("Receiver account not found");
            alert("Receiver account not found");
            // Rollback sender's balance
            await updateDoc(senderDocRef, { balance: currentBalance });
          }
        } else {
          console.log("Insufficient balance");
          alert("Insufficient balance");
        }
      } catch (error) {
        console.error("Error updating sender document:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching sender accounts:", error);
  }
}
