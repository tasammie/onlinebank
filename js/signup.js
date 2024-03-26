import { db, auth, storage } from "./index.js";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const colRef = collection(db, "users");
const colAccRef = collection(db, "Account");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const passwordInp = document.getElementById("password");
// Regex patterns for each character requirement
const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;
const numberRegex = /(?=.*\d)/;

// Regex pattern for minimum length of 8 characters
const minLengthRegex = /.{8,}/;

const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercaseRegex");
const specialCharEl = document.getElementById("specialCharRegex");
const numberEl = document.getElementById("numberRegex");
const minLengthEl = document.getElementById("minLengthRegex");

const regexItems = document.querySelectorAll("li");
const passwordInput = document.getElementById("password");


const regexArray = [
  {
    name: "lowercase",
    regex: lowercaseRegex,
    element: lowercaseEl,
  },
  {
    name: "uppercase",
    regex: uppercaseRegex,
    element: uppercaseEl,
  },
  {
    name: "specialChar",
    regex: specialCharRegex,
    element: specialCharEl,
  },
  {
    name: "number",
    regex: numberRegex,
    element: numberEl,
  },
  {
    name: "minLength",
    regex: minLengthRegex,
    element: minLengthEl,
  },
];

function testRegex() {
  regexArray.forEach((regex) => {
    let test = regex.regex.test(passwordInput.value);

    if (test) {
      regex.element.classList.add("valid");
      regex.element.classList.remove("invalid");
    } else {
      regex.element.classList.remove("valid");
      regex.element.classList.add("invalid");
    }
  });
}

// Add oninput event listener to the password input field
passwordInput.addEventListener("input", function () {
  //   validatePassword(this);
  testRegex();
});

async function addDataToDatabase(e) {
  e.preventDefault();
  const firstName = formData.firstName.value;
  const lastName = formData.lastName.value;
  const email = formData.email.value;
  const phone = formData.phone.value;
  const password = formData.password.value;
  

  if (!passwordRegex.test(password)) {
    errorPass.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    errorPass.style.color = 'red';

    console.log("Password does not meet requirements");
    return;
  }
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Upload profile image to Firebase Storage
    // const storageRef = ref(storage, 'profile-images/' + email + '/' + profileImage.name);
    // await uploadBytes(storageRef, profileImage);

    // Get the download URL of the uploaded image
    // const downloadURL = await getDownloadURL(storageRef);

    // Collect user details to Firestore
    const res = await addDoc(colRef, {
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    // Generate bank account number
    const AccountNumberGenerator = Math.floor(Math.random() * 9836484939);
    const resAc = await addDoc(colAccRef, {
      balance: 100,
      ref: email,
      accountNumber: AccountNumberGenerator,
    });

    window.location.href = "../page/dashboard.html";

    console.log(res);
    console.log(
      resAc,
      "bank account created for " + firstName + " " + lastName
    );
  } catch (error) {
    console.log(error);
  }
}

// onAuthStateChanged(auth, (user) => {
//     console.log(auth);
//     if (user) {
//         if (user.email) {

//         }

//     }
// })

formData.addEventListener("submit", addDataToDatabase);

togglePasswordEyeMain.addEventListener("click", () => {
  let passwordInput = document.getElementById("password");
  let eyeIcon = document.querySelector(".eye-icon i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.add("fa-eye");
    eyeIcon.classList.remove("fa-eye-slash");
  }
});

togglePasswordEyeConfirm.addEventListener("click", () => {
  let passwordInput = document.getElementById("confirm-password");
  let eyeIcon = document.querySelector(".eyeConfirm i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.add("fa-eye");
    eyeIcon.classList.remove("fa-eye-slash");
  }
});
