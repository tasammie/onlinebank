import { signInUser } from "./index.js";

async function toLogin(e){
    e.preventDefault()
    const email = formData.email.value;
    const password = formData.password.value
    console.log(email, password);
   try {
    const res = await signInUser(email, password)
   if (res.success === true) {
    window.location.href = '../page/dashboard.html';
    console.log(res.message);
   }
   else{
    console.log(res.error);
   }
    // getAllDataFromDB()
   } catch (error) {
    console.log(error);
   }
}


toLogInUser.addEventListener('submit', toLogin)
