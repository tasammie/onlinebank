    // import { signInUser } from "./index.js";

    // async function toLogin(e){
    //     e.preventDefault()
    //     const email = formData.email.value;
    //     const password = formData.password.value
    //     console.log(email, password);
    // try {
    //     const res = await signInUser(email, password)
    // if (res.success === true) {
    //     window.location.href = '../page/dashboard.html';
    //     console.log(res.message);
    // }
    // else{
    //     console.log(res.error);
    // }
    //     // getAllDataFromDB()
    // } catch (error) {
    //     console.log(error);
    // }
    // }


    // toLogInUser.addEventListener('submit', toLogin)



import { signInUser } from "./index.js";

async function toLogin(e) {
    e.preventDefault();
    const email = formData.email.value;
    const password = formData.password.value;
    console.log(email, password);
    
   
    const spinner = document.getElementById('spinner');
   
    spinner.hidden = false
    const timeoutDuration = 5000;
    const timeoutId = setTimeout(() => {
        spinner.style.display = 'none';
        // console.log('Timeout: Login took too long to respond.');
    }, timeoutDuration);

    try {
        const res = await signInUser(email, password);
        if (res.success === true) {
            const errorMessage = document.getElementById('error-message');
            errorMessage.style.color = 'green';
            errorMessage.textContent = 'login successfully!';
            window.location.href = '../page/dashboard.html';
            console.log(res.message);
        } else {
            console.log(res.error);
            const errorMessage = document.getElementById('error-message');
            // errorMessage.textContent = res.error;
            errorMessage.textContent = 'Invalid name or password'
            errorMessage.style.color = 'red';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.log(error);
    } finally {
        clearTimeout(timeoutId);
        spinner.style.display = 'none';
    }
}

toLogInUser.addEventListener('submit', toLogin);
