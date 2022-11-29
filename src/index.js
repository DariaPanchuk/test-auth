// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO11oR33t-VMPXIdPhVdKy-YV2hVS0eQA",
  authDomain: "authentication-ecaf1.firebaseapp.com",
  databaseURL: "https://authentication-ecaf1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authentication-ecaf1",
  storageBucket: "authentication-ecaf1.appspot.com",
  messagingSenderId: "753823341746",
  appId: "1:753823341746:web:910a9a2a4acbc8f7223dab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const button = document.querySelector('#signUp');

button.addEventListener('click', onSignUp);

function onSignUp(e) {
    e.preventDefault();
    const name = document.querySelector('.username').value;
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        
            set(ref(database, 'users/' + user.uid), {
                username: name,
                useremail: email,
                password: password,
            });
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });
}