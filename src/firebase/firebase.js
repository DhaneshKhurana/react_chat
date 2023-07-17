// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  linkWithPopup,
  signInWithPopup,
  unlink,
} from 'firebase/auth';
import { getDatabase, ref, serverTimestamp, set } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { Message, toaster } from 'rsuite';

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
  databaseURL:
    'https://react-chat-app-92057-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireAuth = getAuth(app);
const fireDB = getDatabase(app);
const fireStorage = getStorage(app);

export const signInWithProvider = async provider => {
  try {
    const usrCred = await signInWithPopup(fireAuth, provider);
    const usrInfo = getAdditionalUserInfo(usrCred);

    if (usrInfo.isNewUser) {
      console.log('New user registered', usrInfo);
      await set(ref(fireDB, `/users/${usrCred.user.uid}`), {
        name: usrCred.user.displayName,
        createdAt: serverTimestamp(),
      });

      toaster.push(
        <Message type="success">
          Congratulations {usrCred.user.displayName}. You have been registered
          successfully
        </Message>,
        {
          duration: 4000,
          placement: 'topCenter',
        }
      );
    } else {
      toaster.push(
        <Message type="info">Welcome back {usrCred.user.displayName}.</Message>,
        {
          duration: 4000,
          placement: 'topCenter',
        }
      );
    }
  } catch (error) {
    toaster.push(
      <Message type="error">
        Sorry! An error has occurred. Error: {error.message}
      </Message>,
      {
        duration: 4000,
        placement: 'topCenter',
      }
    );
  }
};

export const onFBSignIn = () => {
  signInWithProvider(new FacebookAuthProvider());
};

export const onGoogleSignIn = () => {
  signInWithProvider(new GoogleAuthProvider());
};

export const linkWithProvider = async provider => {
  try {
    const usrCred = await linkWithPopup(fireAuth.currentUser, provider);
    console.log(`${provider} Account linked with return value :: ${usrCred}`);

    toaster.push(
      <Message type="success">
        {fireAuth.currentUser} Your account linked Successfully
      </Message>
    );
    return true;
  } catch (error) {
    toaster.push(
      <Message type="error">
        Sorry! An error has occurred. Error: {error.message}
      </Message>
    );
    return false;
  }
};

export async function unlinkAccount(providerId) {
  const user = await unlink(fireAuth.currentUser, providerId);
  console.log(`firebase:: account unlikned with user ${user}`);
}

export { fireAuth, fireDB, fireStorage };
