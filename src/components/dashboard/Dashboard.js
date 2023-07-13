import { Drawer, Button, IconButton, Placeholder } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { useState } from 'react';
import { useProfile } from '../../logic/contexts/ProfileContext';
import { AvatarUpload } from './AvatarUploadIcon';
import { useMediaQuery } from '../../logic/customHooks';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const { profile } = useProfile();
  const isMobile = useMediaQuery('(max-width:992px)');

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
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
          <AvatarUpload />
          <Drawer.Title>Dashboard</Drawer.Title>

          {/* <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions> */}
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={8} />
          <Placeholder.Paragraph>{profile.name}</Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Button>Sign Out</Button>
          </Placeholder.Paragraph>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default Dashboard;
