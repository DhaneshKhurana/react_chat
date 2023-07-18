import { forwardRef } from 'react';
import { useState } from 'react';
import { Button, Form, Input, Modal } from 'rsuite';
import { createRoom } from '../../data/dbController';
const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));
Textarea.displayName = 'Textarea';

export const CreateRoom = () => {
  const [showModal, setShowModal] = useState(false);
  const [formModel, setformModel] = useState({});

  const onCreateRoomClicked = () => {
    console.log('The value of form :: ', formModel);
    //const chatRoom = { room: formModel.roomName, desc: formModel.roomDesc };
    //console.log('chat room object', chatRoom);
    createRoom(formModel);
    setShowModal(false);
  };

  return (
    <div>
      <Button
        block
        color="green"
        className="mt-3"
        onClick={() => setShowModal(true)}
      >
        Create Room
      </Button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Create Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            formValue={formModel}
            layout="horizontal"
            fluid
            onChange={setformModel}
          >
            <Form.Group>
              <Form.ControlLabel>Room Name</Form.ControlLabel>
              <Form.Control name="roomName" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Room Description</Form.ControlLabel>
              <Form.Control name="roomDesc" accepter={Textarea} rows={8} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={onCreateRoomClicked}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
