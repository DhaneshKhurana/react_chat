import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button, Modal } from 'rsuite';
import { uploadImage } from '../../firebase/uploadData';
import { getUserInfoPath } from '../../logic/helper';
import { updateData } from '../../firebase/firedb';

export const AvatarUpload = () => {
  const [open, setOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const avatarEditorRef = useRef();

  const fileInputTypes = '.png, .jpeg, .jpg';
  const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
  const isValidFile = file => acceptedFileTypes.includes(file.type);

  function onInputChanged(event) {
    console.log('Avatar Upload:: oninutchanged event', event);
    const file = event.target.files ? event.target.files[0] : null;
    if (file && isValidFile(file)) {
      console.log('AvatarUpload:: Valid file received::', file);
      setAvatarImage(file);
      setOpen(true);
    }
  }

  const getBlob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        if (file) resolve(file);
        else reject(new Error('Unable to process file '));
      });
    });
  };

  const uploadAvatarImage = async event => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    const blobFile = await getBlob(canvas);
    console.log('teh blob file received from getBlob', blobFile);
    const path = getUserInfoPath('avatar');
    const downloadURL = await uploadImage(blobFile, getUserInfoPath('avatar'));
    updateData({ [path]: downloadURL });
    setOpen(false);
  };

  return (
    <div>
      <label className="d-block cursor-pointer padded">
        Select Avatar
        <input
          type="file"
          className="d-none"
          accept={fileInputTypes}
          onChange={onInputChanged}
        />
      </label>
      <Modal backdrop={true} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Choose Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center h-100">
            <AvatarEditor
              ref={avatarEditorRef}
              image={avatarImage}
              width={225}
              height={225}
              border={25}
              borderRadius={150}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={uploadAvatarImage}>
            Upload Image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
