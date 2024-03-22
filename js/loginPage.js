// import { signInUser } from "./index.js";

// async function toLogin(e){
//     e.preventDefault()
//     const email = formData.email.value;
//     const password = formData.password.value
//     console.log(email, password);
//    try {
//     const res = await signInUser(email, password)
//    if (res.success === true) {
//     window.location.href = '../page/dashboard.html';
//     console.log(res.message);
//    }
//    else{
//     console.log(res.error);
//    }
//     // getAllDataFromDB()
//    } catch (error) {
//     console.log(error);
//    }
// }


// toLogInUser.addEventListener('submit', toLogin)


// import { signInUser } from "./index.js";

// async function toLogin(e) {
//     e.preventDefault();
//     const email = formData.email.value;
//     const password = formData.password.value;
//     console.log(email, password);
//     try {
//         const res = await signInUser(email, password);
//         if (res.success === true) {
//             window.location.href = '../page/dashboard.html';
//             console.log(res.message);
//         } else {
//             console.log(res.error);
//             // Display error message and clear after 3 seconds
//             const errorMessage = document.getElementById('error-message');
//             errorMessage.textContent = res.error;
//             errorMessage.style.display = 'block';
//             setTimeout(() => {
//                 errorMessage.textContent = '';
//                 errorMessage.style.display = 'none';
//             }, 3000);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// toLogInUser.addEventListener('submit', toLogin);





import { signInUser } from "./index.js";

async function toLogin(e) {
    e.preventDefault();
    const email = formData.email.value;
    const password = formData.password.value;
    console.log(email, password);
    
    // Display spinner while login is in progress
    const spinner = document.getElementById('spinner');
    // spinner.style.display = 'block';
    spinner.hidden = false
    // Set a timeout for 5 seconds (5000 milliseconds)
    const timeoutDuration = 5000;
    // const timeoutId = setTimeout(() => {
    //     // Hide spinner after timeout
    //     spinner.style.display = 'none';
    //     console.log('Timeout: Login took too long to respond.');
    // }, timeoutDuration);

    try {
        const res = await signInUser(email, password);
        if (res.success === true) {
            window.location.href = '../page/dashboard.html';
            console.log(res.message);
        } else {
            console.log(res.error);
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = res.error;
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.log(error);
    } finally {
        // Clear the timeout to prevent it from triggering after login completion
        clearTimeout(timeoutId);
        // Hide spinner after login process completes
        spinner.style.display = 'none';
    }
}

toLogInUser.addEventListener('submit', toLogin);
