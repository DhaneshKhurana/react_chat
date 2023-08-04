import { Button, Modal } from 'rsuite';
import { AvatarIcon } from '../dashboard/AvatarIcon';
import { useState } from 'react';

const ProfileInfoBtnModal = ({ author, children, ...btnProps }) => {
    const [isOpen, setOpen] = useState(false);
    const { name, avatar, createdAt } = author;

  const shortName = name.split(' ')[0];
  console.log("ProfileModal:: author", author);
console.log("ProfileModal:: created date fot author", createdAt);
  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <Button {...btnProps} onClick={()=> setOpen(true)}>
        {shortName}
      </Button>
      <Modal show={isOpen} onClose={()=> setOpen(false)} open={isOpen}>
        <Modal.Header>
          <Modal.Title>{shortName} profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <AvatarIcon
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />

          <h4 className="mt-2">{name}</h4>

          <p>Member since {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          {children}
          <Button block onClick={()=> setOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;