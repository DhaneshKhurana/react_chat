import { Drawer, Button, IconButton, Divider } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { useState } from 'react';
import { useProfile } from '../../logic/contexts/ProfileContext';
import { useMediaQuery } from '../../logic/customHooks';
import { getUserInfoPath, signOutUser } from '../../logic/helper';
import { EditableInput } from '../customUI/EditableInput';
import { SignedAccounts } from './SignedAccounts';
import { AvatarUpload } from './AvatarUpload';
import { updateData } from '../../data/dbController';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const { profile } = useProfile();
  const isMobile = useMediaQuery('(max-width:692px)');

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };

  const nickNameChanged = newName => {
    const userInfoPath = getUserInfoPath('nickName');
    const dataToUpdate = { [userInfoPath]: newName };
    updateData(dataToUpdate);
  };

  return (
    <div className="h-100 pt-2">
      <div>
        <IconButton
          appearance="primary"
          block
          icon={<DashboardIcon />}
          onClick={() => handleOpen('left')}
        >
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
          <Drawer.Title>{profile.name}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <SignedAccounts />
          <Divider />
          <EditableInput
            initVal={profile.nickName ? profile.nickName : profile.name}
            onSave={nickNameChanged}
          />
          <AvatarUpload name={profile.name} avatar={profile.avatar} />

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
