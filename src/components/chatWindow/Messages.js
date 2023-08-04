import { useEffect, useState } from 'react';
import { getRoomsMsgRef } from '../../data/dbController';
import MessageItem from './MessageItem';
import { useContextSelector } from 'use-context-selector';
import { CurrentRoomContext } from '../../logic/contexts/CurrentRoomContext';
import { onValue} from 'firebase/database';
import { getObjectArrayFromData } from '../../logic/helper';

function ChatRoomMessages() {
  const chatRoomId = useContextSelector(
    CurrentRoomContext,
    room => room.roomKey
  );
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(
    () => {
      // const msgs = getMessages(chatRoomId);
      // console.log("Messages recieved ", msgs);
      // setMessages(msgs);

      try {
        const roomRef = getRoomsMsgRef(chatRoomId);
        onValue(roomRef, snapshot=>{
          const data =  getObjectArrayFromData( snapshot.val());
          console.log("dbController:: returning messages", data);
          setMessages(data);
        })
      } catch (error) {
        console.log('dbController:: getMessages: Error while updating chat room data', error);
      }



      //return ()=> unSubscribeRoomMsgs(chatId);
    },
    [chatRoomId]
  );

  return (
    <ul className="msg-list custom-scroll">
            {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && messages.map(msg => <MessageItem key={msg.createdAt} message={msg}/>)}
    </ul>
  );
}

export default ChatRoomMessages;
