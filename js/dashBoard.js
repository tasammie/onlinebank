import { db, auth } from "./index.js";
import {
  getDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { logOutUser } from "./index.js";

const colRef = collection(db, "Account");

let ALLDetails = [];

async function getAllDataFromDB() {
  ALLDetails = [];
  const user = auth.currentUser;
  console.log(user);
  if (user) {
    const userId = user.uid;
    const q = query(colRef, where("userId", "==", userId));
    const res = await getDocs(q);
    res.forEach((doc) => {
      ALLDetails.push({ ...doc.data(), id: doc.id });
    });
    displayDataOnUi(ALLDetails);
  } else {
    console.log("No user is currently signed in.");
  }
}

getAllDataFromDB();

function displayDataOnUi(data) {
  const show = document.getElementById("show");
  show.innerHTML = "";
  data.forEach((info) => {
    show.innerHTML += `
      <div>
        <h1>${info.accountNumber}</h1>    
        <p>${info.ref}</p>
        <p>${info.balance}</p>
      </div>
    `;
  });
}

logout.addEventListener("click", logOutUser);

// Side bar toggling of the sidebar
const toggleButton = document.querySelector(".toggle-button");
const cancelBtn = document.querySelector(".cancel-btn");
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

cancelBtn.addEventListener("click", function () {
  sidebar.classList.remove("active");
  sidebarBg.style.display = "none";
});
