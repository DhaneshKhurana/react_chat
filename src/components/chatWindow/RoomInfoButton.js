import { useState } from 'react';
import { Button, Modal } from 'rsuite';
import { useContextSelector } from 'use-context-selector';
import { CurrentRoomContext } from '../../logic/contexts/CurrentRoomContext';

export const RoomInfoButton = () => {
  const { open, setOpen } = useState(false);
  const description = useContextSelector(
    CurrentRoomContext,
    room => room.roomDesc
  );
  const name = useContextSelector(CurrentRoomContext, room => room.roomName);

  return (
    <>
      <Button appearance="link" className="px-0" onClick={() => setOpen(true)}>
        Room information
      </Button>
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
