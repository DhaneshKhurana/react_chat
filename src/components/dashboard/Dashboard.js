import { Drawer, Button, IconButton, Placeholder, Divider } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { useState } from 'react';
import { useProfile } from '../../logic/contexts/ProfileContext';
import { AvatarUpload } from './AvatarUploadIcon';
import { useMediaQuery } from '../../logic/customHooks';
import { getUserInfoPath, signOutUser } from '../../logic/helper';
import { EditableInput } from '../customUI/EditableInput';
import { updateData } from '../../firebase/firedb';
import { SignedAccounts } from './SignedAccounts';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const { profile } = useProfile();
  const isMobile = useMediaQuery('(max-width:992px)');

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };

  const nickNameChanged = newName => {
    console.log('Dashboard:: New Nick name selected', newName);
    const dataToUpdate = {};
    const userInfoPath = getUserInfoPath('nickName');
    dataToUpdate[userInfoPath] = newName;
    updateData(dataToUpdate);
  };

  return (
    <div className="h-100 pt-2">
      <div>
        <IconButton icon={<DashboardIcon />} onClick={() => handleOpen('left')}>
          Open Dashboard
        </IconButton>
      </div>
      <Drawer
        size={isMobile ? 'full' : 'sm'}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          {/* <AvatarUpload /> */}
          <Drawer.Title>Hi, {profile ? profile.name : ''}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <SignedAccounts />
          <Divider />
          <EditableInput initVal="radha" onSave={nickNameChanged} />

          <div className="bottomDiv">
            <Button
              appearance="primary"
              block={true}
              color="red"
              onClick={signOutUser}
            >
              Sign Out
            </Button>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default Dashboard;