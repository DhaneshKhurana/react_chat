import TimeAgo from 'timeago-react';

export default function ChatRoomItem({ room }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{room.name}</h3>
        <TimeAgo datetime={new Date()} className="font-normal text-black-45" />
      </div>
      <div>
        <span>No message yet..</span>
      </div>
    </div>
  );
}
