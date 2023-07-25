import { Loader, Nav } from 'rsuite';
import ChatRoomItem from './CharRoomItem';
import { useContext, useState } from 'react';
import { RoomsContext } from '../../logic/contexts/RoomsContext';
import { getObjectArrayFromData } from '../../logic/helper';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

// const lnk = forwardRef(({ href, children, ...rest }, ref) => (
//   <NavLink ref={ref} to={href} {...rest}>
//     {children}
//   </NavLink>
// ));
// lnk.displayName = 'customNav';

export default function ChatRoomList({ aboveElHeight }) {
  const dataContext = useContext(RoomsContext);
  const chatRooms = getObjectArrayFromData(dataContext);
  const [active, setActive] = useState(null);
  const url = useLocation();

  const onRoomSelect = (ev, ev2) => {
    console.log('even I get from Nav', ev2);
    setActive(ev);
  };

  return (
    <Nav
      activeKey={active}
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
      onSelect={onRoomSelect}
    >
      {!dataContext && (
        <Loader speed="normal" center vertical content="Loading" size="md" />
      )}
      {chatRooms.length > 0 &&
        chatRooms.map(room => (
          <Nav.Item
            key={room.roomId}
            eventKey={`/chat/${room.roomId}`}
            active={url.pathname == `/chat/${room.roomId}`}
            as={Link}
            to={`/chat/${room.roomId}`}
          >
            <ChatRoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
}
