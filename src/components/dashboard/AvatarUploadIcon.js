import { Uploader, Message, Loader, useToaster } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { useState } from 'react';
import { uploadImage } from '../../firebase/uploadData';
import { getUserInfoPath } from '../../logic/helper';
import { updateData } from '../../firebase/firedb';
import { useProfile } from '../../logic/contexts/ProfileContext';

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export const AvatarUpload = () => {
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const onFileUpload = async file => {
    if (file) {
      console.log(
        'file name, key, url, status:: ',
        file.name,
        file.fileKey,
        file.url,
        file.status
      );
      const userInfoPath = getUserInfoPath(file.name);
      console.log('userinfo path :: ', userInfoPath);
      setUploading(true);
      previewFile(file.blobFile, value => {
        setFileInfo(value);
      });
      const downloadURL = await uploadImage(file.blobFile, userInfoPath);
      const dataToUpdate = {};
      dataToUpdate[`${userInfoPath}/downloadURL`] = downloadURL;

      await updateData(dataToUpdate);
    } else {
      console.log('File of User infopath is null');
      console.log('File:: ', file);
    }
  };

  const { profile } = useProfile();
  console.log('AvatarUpload:: profile recvd', profile);
  if (profile && profile.downloadURL) {
    setFileInfo(profile.downloadURL);
  }

  return (
    <Uploader
      fileListVisible={false}
      listType="picture"
      action="//jsonplaceholder.typicode.com/posts/"
      onUpload={file => onFileUpload(file)}
      onSuccess={(response, file) => {
        setUploading(false);
        console.log(response);
      }}
      onError={err => {
        setUploading(false);
        console.log(err);
      }}
    >
      <button style={{ width: 100, height: 100 }}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" />
        ) : (
          <AvatarIcon style={{ fontSize: 80 }} />
        )}
      </button>
    </Uploader>
  );
};
