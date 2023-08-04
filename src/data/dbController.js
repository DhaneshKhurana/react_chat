import { ref as dbRef, off, onValue, orderByKey, push, query, set, update } from 'firebase/database';
import { fireAuth, fireDB } from './firebase';
import { Message, toaster } from 'rsuite';
import { getObjectArrayFromData } from '../logic/helper';

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

    const ref = dbRef(fireDB, `/chatRooms/${getUID()}`);
    const pushRef = await push(ref);
    chatRoom['roomKey'] = pushRef.key;
    await set(pushRef, chatRoom);
    console.log(
      'dbController:: ref , pushref, chatroom, key.key',
      ref,
      pushRef,
      chatRoom,
      pushRef.key
    );
    toaster.push(<Message type="info">ChatRoom updated successfully</Message>);
  } catch (error) {
    console.log('updateData:: Error while updating chat room data', error);
    toaster.push(
      <Message type="error">Chat-room Error: {error.message}</Message>
    );
  }
}

export function getMessages(chatRoomId) {
  try {
    console.log('msgs to be get for roomKey', chatRoomId);
    
    const roomRef = query(dbRef(fireDB, `/messages/${getUID()}/${chatRoomId}`), orderByKey());
    onValue(roomRef, snapshot=>{
      console.log("msgs received ", snapshot.val());
      const data =  getObjectArrayFromData( snapshot.val());
      console.log("dbController:: returning messages", data);
      return data;
    })
    
  } catch (error) {
    console.log('dbController:: getMessages: Error while updating chat room data', error);
  }
}

export async function unSubscribeRoomMsgs(chatRoomId) {
  try {
    console.log('Unsubscribing for path', chatRoomId);
    off(`/chatRooms/${getUID()}/${chatRoomId}`);    
  } catch (error) {
    console.log('Some erroe while unsubscribing', error);
  }
}

export async function sendMessage(message, chatRoomId) {
  try {
    console.log('chat msg to be pushed, in room', message, chatRoomId);
    await set(
      push(dbRef(fireDB, `/messages/${getUID()}/${chatRoomId}`)),
      message
    );
    updateData({
      [`/chatRooms/${getUID()}/${chatRoomId}/lastMessage`]: {
        text: message.text,
        createdAt: message.createdAt,
      },
    });
    toaster.push(<Message type="info">Message sent successfully</Message>);
  } catch (error) {
    console.log('dbController:: sendMessage Error: ', error);
    toaster.push(
      <Message type="error">Send Message Error: {error.message}</Message>
    );
  }
}

export function getRoomsRef() {
  const chatRoomsRef = dbRef(fireDB, `/chatRooms/${getUID()}`);
  return chatRoomsRef;
}

export function getRoomsMsgRef(chatRoomId) {
  const roomMsgRef = query(dbRef(fireDB, `/messages/${getUID()}/${chatRoomId}`), orderByKey());
  return roomMsgRef;
}
