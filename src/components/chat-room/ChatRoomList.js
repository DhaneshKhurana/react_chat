import { Nav } from 'rsuite';
import ChatRoomItem from './CharRoomItem';

export default function ChatRoomList({ aboveElHeight }) {
  return (
    <Nav
      appearance="subtle"
      vertical
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
    >
      <Nav.Item>
        <ChatRoomItem room={{ name: 'DemoRoom', desc: 'No Description' }} />
      </Nav.Item>
    </Nav>
  );
}
