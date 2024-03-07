import { db, auth } from "./index.js";
import {
  getDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { logOutUser } from "./index.js";

const colRef = collection(db, "Account");
let currentUser;

let ALLDetails = [];

onAuthStateChanged(auth, async (user) => {
  // console.log({user});
  if (user) {
    currentUser = user;
    // Call the function to populate the transaction table
    populateTransactionTable();

  }
  await getCurrentUser(user.email);
});

async function getCurrentUser(email) {
  if (email) {
    const q = query(colRef, where("ref", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("no document with this email");
      return;
    }
    querySnapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id };
      console.log(data);
      balanceID.innerHTML = `$${data.balance}`;
      accountNumber.innerHTML = `${data.accountNumber}`;
    });
  }
}

logout.addEventListener("click", logOutUser);
// window.location.href = '.../index.html';

// Modal function

openModalBtn.addEventListener("click", displayFundAccModal);
function displayFundAccModal() {
  myModal.style.display = "block";
}

closeModalBtn.addEventListener("click", function () {
  myModal.style.display = "none";
});

// fund user account

fundAccountForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Parse amount to number
  const amount = parseFloat(fundAccountForm.amount.value);

  try {
    // Query Firestore to find the document with the user's account
    const querySnapshot = await getDocs(
      query(colRef, where("ref", "==", currentUser.email))
    );

    // Iterate through each document in the query result
    querySnapshot.forEach(async (account) => {
      try {
        // Get the reference to the document
        const docRef = doc(colRef, account.id);

        // Get the current balance from the document
        const currentBalance = parseFloat(account.data().balance);

        // Calculate new balance by adding the amount
        const newBalance = currentBalance + amount;

        // Update the document with the new balance
        await updateDoc(docRef, { balance: newBalance });

        console.log("Document updated successfully:", account.id);

        // Once balance has been updated, refresh page
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });
  } catch (error) {
    console.error("Error querying documents:", error);
  }
});

// transaction history




// Function to populate the transaction table
async function populateTransactionTable() {
  const transactionTableBody = document.getElementById("transactionTableBody");
  
  // Clear any existing rows
  transactionTableBody.innerHTML = "";
  const trancColRef = collection(db, 'Transactions')
  const transactions = await getDocs(query(trancColRef, where('senderEmail','==', currentUser.email)));
  if (transactions.empty) {
    const row = `
      <tr>
        <td colspan="3">No records found</td>
      </tr>
    `;
    // Append the row to the table body
    transactionTableBody.innerHTML += row;
    return
  }
  // Iterate through the transactions array and create table rows
  transactions.forEach((transaction) => {
    const actualTransactionData = transaction.data()
    console.log(actualTransactionData);
    const row = `
      <tr>
        <td>${actualTransactionData.transactionDate}</td>
        <td>${actualTransactionData.remark}</td>
        <td>${actualTransactionData.amount}</td>
      </tr>
    `;

    // Append the row to the table body
    transactionTableBody.innerHTML += row;
  });
}








// Side bar toggling of the sidebar
const toggleButton = document.querySelector(".toggle-button");
// const cancelBtn = document.querySelector(".cancel-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarBg = document.getElementById("sidebar-bg");
const content = document.querySelector(".content");
const toggleBtn = document.getElementById("toggleButton");
const sidebarLinks = document.querySelectorAll(".sidebar-Link");

try {
  toggleBtn.addEventListener("click", function () {
    if (toggleBtn.firstElementChild.classList.contains("fa-bars")) {
      toggleBtn.firstElementChild.classList.remove("fa-bars");
      toggleBtn.firstElementChild.classList.add("fa-times");
    } else {
      toggleBtn.firstElementChild.classList.remove("fa-times");
      toggleBtn.firstElementChild.classList.add("fa-bars");
    }
  });
  
} catch (error) {
console.log(error);  
}
try {
  sidebarBg.addEventListener("click", function () {
    sidebar.classList.remove("active");
    sidebarBg.style.display = "none";
    toggleBtn.firstElementChild.classList.remove("fa-times");
    toggleBtn.firstElementChild.classList.add("fa-bars");
  });
    
} catch (error) {
  console.log(error);
}
try {
  toggleButton.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    if (sidebarBg.style.display == "block") {
      sidebarBg.style.display = "none";
      return;
    }
    sidebarBg.style.display = "block";
  });
  
} catch (error) {
console.log(error);  
}