import { Message, toaster } from 'rsuite';
import { fireAuth } from '../data/firebase';
import { getUID } from '../data/dbController';

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

export function getNameInitials(name) {
  const nameArray = name.toUpperCase().split(' ');
  let initials = '';
  for (const nm of nameArray) {
    initials += nm[0];
  }
  return initials;
}

export function getObjectArrayFromData(data) {
  const retVal = [];
  for (const key in data) {
    retVal.push(data[key]);
  }
  return retVal;
}
