import { Loader, Nav } from 'rsuite';
import ChatRoomItem from './CharRoomItem';
import { useContext } from 'react';
import { RoomsContext } from '../../logic/contexts/RoomsContext';
import { getObjectArrayFromData } from '../../logic/helper';

export default function ChatRoomList({ aboveElHeight }) {
  const dataContext = useContext(RoomsContext);
  const chatRooms = getObjectArrayFromData(dataContext);
  console.log('chatrooms::', chatRooms);

  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
    >
      {!dataContext && (
        <Loader speed="normal" center vertical content="Loading" size="md" />
      )}
      {chatRooms.length > 0 &&
        chatRooms.map(room => (
          <Nav.Item key={room.roomId}>
            <ChatRoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
}
