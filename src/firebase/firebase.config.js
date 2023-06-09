// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgmS3sqjq5d-XHq_xKLbplUme8QIPQ9oM",
  authDomain: "mappify-mind-client.firebaseapp.com",
  projectId: "mappify-mind-client",
  storageBucket: "mappify-mind-client.appspot.com",
  messagingSenderId: "408789295629",
  appId: "1:408789295629:web:c8597ab8f40d0d9085eb44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;