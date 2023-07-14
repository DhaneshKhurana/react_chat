import { Message, toaster } from 'rsuite';
import { fireAuth } from '../firebase/firebase';
import { getUID } from '../firebase/firedb';

export const getUserInfoPath = fileName => {
  const uid = getUID();
  if (uid) {
    return `/users/${uid}/${fileName}`;
  }
  return null;
};

export const signOutUser = () => {
  try {
    fireAuth.signOut();
    toaster.push(<Message type="success">Signed Out successfully</Message>);
  } catch (err) {
    toaster.push(<Message type="error">{err.message}</Message>);
  }
};
