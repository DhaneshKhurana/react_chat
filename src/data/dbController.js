import { ref as dbRef, onValue, push, set, update } from 'firebase/database';
import { fireAuth, fireDB } from './firebase';
import { Message, toaster } from 'rsuite';

export const updateData = async dataToUpdate => {
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

export function isAccountConnected(account) {
  return fireAuth.currentUser.providerData.some(
    data => data.providerId == account
  );
}

export async function createRoom(chatRoom) {
  try {
    console.log('data to be pushed', chatRoom);
    await set(push(dbRef(fireDB, `/chatRooms/${getUID()}`)), chatRoom);
    toaster.push(<Message type="info">ChatRoom updated successfully</Message>);
  } catch (error) {
    console.log('updateData:: Error while updating chat room data', error);
    toaster.push(
      <Message type="error">Chat-room Error: {error.message}</Message>
    );
  }
}

export function getRoomsRef() {
  const chatRoomsRef = dbRef(fireDB, `/chatRooms/${getUID()}/`);
  return chatRoomsRef;
}
