// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCPLaBHEzTFDFyaSJhhIumOEw0ksGOX_08',
  authDomain: 'react-chat-app-92057.firebaseapp.com',
  projectId: 'react-chat-app-92057',
  storageBucket: 'react-chat-app-92057.appspot.com',
  messagingSenderId: '167453474125',
  appId: '1:167453474125:web:0b2f3cc43aa0313a6e0b04',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireAuth = getAuth(app);
const fireDB = getDatabase(app);

export { fireAuth, fireDB };
