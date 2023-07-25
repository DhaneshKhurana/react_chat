import { useContext } from 'use-context-selector';
import { CurrentRoomContext } from '../../logic/contexts/CurrentRoomContext';

export default function ChatBottom() {
  const room = useContext(CurrentRoomContext);

  return (
    <div>
      <div>{room.roomName}</div>
      <div>
        <span>{room.roomId}</span> <span>{room.roomDesc}</span>
      </div>
    </div>
  );
}
