import { sendResetEmail } from "./index.js";

const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementsByClassName('close')[0];
// forgetPasswordForm.addEventListener('submit',async(e) =>{
//     e.preventDefault()
//     const email = forgetPasswordForm.email.value;
//     console.log(email);
    
//     try {
//         sendResetEmail(email)
//     // const res = await sendPasswordResetEmail(auth, email)    
//     } catch (error) {
//     console.log(error);
//     }

// })

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

forgetPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = forgetPasswordForm.email.value;

  try {
    sendResetEmail(email)
    alert('Password reset email sent successfully!');
    modal.style.display = 'none';
    // Redirect or show success message to the user
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    // Handle error: show error message to the user
  }
});
