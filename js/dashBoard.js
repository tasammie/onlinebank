    import{db, auth } from './index.js';
    import {
      getDoc,
      collection,
      doc,
      getDocs,
      query,
      where
    } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
    const colRef = collection(db, "Account");

    let AllBlogs = []
    async function getAllDataFromDB(){
        AllBlogs = []
        const res = await getDocs(colRef)
        console.log(res)
        res.forEach((item)=>{
            
            AllBlogs.push({...item.data(), id: item.id})
        })
        displayDataOnUi(AllBlogs)
        blogID = updateForm.blogs.value;


    }

    getAllDataFromDB()
    let blogID = ""

    function displayDataOnUi(data){
        show.innerHTML = ''
        console.log(data);
        data.forEach((item)=>{
            show.innerHTML +=`
                <div>
                    <h1>${item.title}</h1>    
                    <p>${item.author}</p>
                </div>
            `
          })
          getAllBtns()
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

      


