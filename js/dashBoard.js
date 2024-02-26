    import{db, auth } from './index.js';
    import {
      getDoc,
      collection,
      doc,
      getDocs,
      query,
      where
    } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
    // const colRef = collection(db, "Account");

    // let ALLDetails = []
    // async function getAllDataFromDB(){
    //   ALLDetails = []
    //     const res = await getDocs(colRef)
    //     console.log(res)
    //     res.forEach((info)=>{
            
    //       ALLDetails.push({...info.data(), id: info.id})
    //     })
    //     displayDataOnUi(ALLDetails)


    // }

    // getAllDataFromDB()
    // // let blogID = ""

    // function displayDataOnUi(data){
    //     show.innerHTML = ''
    //     console.log(data);
    //     data.forEach((info)=>{
    //         show.innerHTML +=`
    //             <div>
    //                 <h1>${info.accountNumber}</h1>    
    //                 <p>${info.ref}</p>
    //                 <p>${info.balance}</p>
    //             </div>
    //         `
    //       })

    // }


    const colRef = collection(db, "Account");
  
let ALLDetails = [];

async function getAllDataFromDB() {
  ALLDetails = [];
  const user = auth.currentUser;
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
  show.innerHTML = '';
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












    // Side bar toggling of the sidebar
    const toggleButton = document.querySelector(".toggle-button");
      const cancelBtn = document.querySelector(".cancel-btn");
      const sidebar = document.querySelector(".sidebar");
      const content = document.querySelector(".content");
      const sidebarLinks = document.querySelectorAll(".sidebar-Link");

      toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("active");
      });

      cancelBtn.addEventListener("click", function () {
        sidebar.classList.remove("active");
      });

      


