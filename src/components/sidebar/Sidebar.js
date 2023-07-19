import { useRef, useState, useEffect } from 'react';
import { Divider } from 'rsuite';
import Dashboard from '../dashboard/Dashboard';
import { CreateRoom } from '../chat-room/CreateRoom';
import ChatRoomItem from '../chat-room/CharRoomItem';
import ChatRoomList from '../chat-room/ChatRoomList';

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <Dashboard />
        <CreateRoom />
        <Divider style={{ margin: 0, padding: '30px 0' }}>
          Join conversation
        </Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
