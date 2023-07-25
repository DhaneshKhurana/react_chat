import { useContextSelector } from 'use-context-selector';
import { CurrentRoomContext } from '../../logic/contexts/CurrentRoomContext';
import { useMediaQuery } from '../../logic/customHooks';
import { IconButton } from 'rsuite';
import { AiFillLeftCircle } from 'react-icons/ai';
import { RoomInfoButton } from './RoomInfoButton';
import { Link } from 'react-router-dom';

export default function ChatTop() {
  const roomName = useContextSelector(
    CurrentRoomContext,
    room => room.roomName
  );
  const isMobile = useMediaQuery('(max-width:692px)');

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          {isMobile && (
            <IconButton
              as={Link}
              to="/"
              icon={<AiFillLeftCircle />}
              className="d-inline-block p-0 mr-2 text-blue link-unstyled"
            />
          )}
          <span className="text-disappear">{roomName}</span>
          <div className="d-flex justify-content-between align-items-center">
            <RoomInfoButton />
          </div>
        </h4>
      </div>
    </div>
  );
}
