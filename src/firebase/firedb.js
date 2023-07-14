import { ref as dbRef, update } from 'firebase/database';
import { fireAuth, fireDB } from './firebase';
import { Message, toaster } from 'rsuite';

export const updateData = async dataToUpdate => {
  console.log('datatobeupdated ', dataToUpdate);
  try {
    await update(dbRef(fireDB), dataToUpdate);
    console.log('Data updated successfully');
  } catch (error) {
    console.log('updateData:: Error while updating data', error);
  }
};

export const getUID = () => {
  try {
    if (fireAuth && fireAuth.currentUser) {
      return fireAuth.currentUser.uid;
    }
    toaster.push(<Message type="info">UID not found</Message>);
  } catch (error) {
    toaster.push(
      <Message type="error">UID Not Found! Error: {error.message}</Message>
    );
  }
  return null;
};
