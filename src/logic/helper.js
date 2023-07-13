import { getUID } from '../firebase/firedb';

export const getUserInfoPath = fileName => {
  const uid = getUID();
  if (uid) {
    return `/users/${uid}/${fileName}`;
  }
  return null;
};
