// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkfImB80_k2Hk6TTD2Bry8UbL91yXW9z8",
  authDomain: "chamados-3224b.firebaseapp.com",
  projectId: "chamados-3224b",
  storageBucket: "chamados-3224b.appspot.com",
  messagingSenderId: "443587172426",
  appId: "1:443587172426:web:70f7f92705964358af2eb3",
  measurementId: "G-4QQ6RCEFYS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth , db , storage};