import { fireStorage } from './firebase';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';

export const uploadImage = async (blobFile, path, cacheDays = 10) => {
  const imageRef = storageRef(fireStorage, path);
  await uploadBytes(imageRef, blobFile, {
    cacheControl: `public, max-age=${3600 * 24 * cacheDays}`,
  });
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};
