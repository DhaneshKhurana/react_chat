import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  linkWithPopup,
  signInWithPopup,
  unlink,
} from 'firebase/auth';
import { fireAuth, fireDB } from './firebase';
import { ref, serverTimestamp, set } from 'firebase/database';
import { Message, toaster } from 'rsuite';

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
