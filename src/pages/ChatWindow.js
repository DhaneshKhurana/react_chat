import { useContext } from 'react';
import { RoomsContext } from '../logic/contexts/RoomsContext';
import { CurrentRoomProvider } from '../logic/contexts/CurrentRoomContext';
import ChatTop from '../components/chatWindow/ChatTop';
import ChatRoomMessages from '../components/chatWindow/Messages';
import ChatBottom from '../components/chatWindow/ChatBottom';
import { Loader } from 'rsuite';
import { useParams } from 'react-router';

export const ChatWindow = () => {
  const { chatId } = useParams();
  const chatRooms = useContext(RoomsContext);

  if (!chatRooms) {
    return <Loader size="md" circle />;
  }

  // const myChatRoom = {
  //   ...chatRoom,

  // }
  const chatRoom = chatRooms.find(room => room.roomId == chatId);

  if (!chatRoom) {
    return (
      <div className="text-center mt-page">
        {' '}
        NO Chat room found with id :: {chatId}
      </div>
    );
  }

  return (
    <CurrentRoomProvider data={chatRoom}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <ChatRoomMessages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};
