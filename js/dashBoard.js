import { db, auth } from "./index.js";
import {
  getDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import {

  onAuthStateChanged,

} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { logOutUser } from "./index.js";

const colRef = collection(db, "Account");

let ALLDetails = [];


onAuthStateChanged(auth, async (user) => {
  // console.log({user});
  await getCurrentUser(user.email)
 
})

async function getCurrentUser(email){
 
  if (email) {
    const q = query(colRef, where("ref", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('no document with this email');
     return
    }
    querySnapshot.forEach((doc)=>{
      const data ={ ...doc.data(), id:doc.id}
      console.log(data);
      balanceID.innerHTML = `$${data.balance}`
      accountNumber.innerHTML = `${data.accountNumber}`
    })
  } 
}



logout.addEventListener("click", logOutUser);
  // window.location.href = '.../index.html';



// Side bar toggling of the sidebar
const toggleButton = document.querySelector(".toggle-button");
// const cancelBtn = document.querySelector(".cancel-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarBg = document.getElementById("sidebar-bg");
const content = document.querySelector(".content");
const toggleBtn = document.getElementById("toggleButton");
const sidebarLinks = document.querySelectorAll(".sidebar-Link");

toggleBtn.addEventListener('click', function() {
  if(toggleBtn.firstElementChild.classList.contains('fa-bars')) {
    toggleBtn.firstElementChild.classList.remove('fa-bars')
    toggleBtn.firstElementChild.classList.add('fa-times')
  } else {
    toggleBtn.firstElementChild.classList.remove('fa-times')
    toggleBtn.firstElementChild.classList.add('fa-bars')
  }
})

sidebarBg.addEventListener("click", function () {
  sidebar.classList.remove("active");
  sidebarBg.style.display = "none";
  toggleBtn.firstElementChild.classList.remove('fa-times')
  toggleBtn.firstElementChild.classList.add('fa-bars')
});

toggleButton.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  if(sidebarBg.style.display == "block") {
    sidebarBg.style.display = "none";
    return;
  }
  sidebarBg.style.display = "block";
});

