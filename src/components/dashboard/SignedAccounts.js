import { Button, Tag } from 'rsuite';
import { AiFillFacebook, AiFillGoogleCircle } from 'react-icons/ai';
import { Icon } from '@rsuite/icons';
import { useState } from 'react';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { isAccountConnected } from '../../data/dbController';
import { linkWithProvider, unlinkAccount } from '../../data/authController';

export const SignedAccounts = () => {
  const [accountsConnected, setAccountsConnected] = useState({
    google: isAccountConnected('google.com'),
    facebook: isAccountConnected('facebook.com'),
  });

  function onGoogleClose() {
    unlinkAccount('google.com');
    console.log('google account closed');
    setAccountsConnected({
      ...accountsConnected,
      google: false,
    });
  }

  function onFacebookClose() {
    unlinkAccount('facebook.com');
    console.log('facebook account closed');
    setAccountsConnected({
      ...accountsConnected,
      facebook: false,
    });
  }

  const linkWithFB = async () => {
    const success = await linkWithProvider(new FacebookAuthProvider());
    if (success) {
      setAccountsConnected({
        ...accountsConnected,
        facebook: true,
      });
    }
  };

  const linkWithGoogle = async () => {
    const success = await linkWithProvider(new GoogleAuthProvider());
    if (success) {
      setAccountsConnected({
        ...accountsConnected,
        google: true,
      });
    }
  };

  return (
    <div>
      <div>
        {accountsConnected['google'] && (
          <Tag closable color="red" onClose={onGoogleClose}>
            <Icon size="1.5em" as={AiFillGoogleCircle} className="mar5"></Icon>
            Google
          </Tag>
        )}
        {accountsConnected['facebook'] && (
          <Tag closable color="blue" onClose={onFacebookClose}>
            <Icon size="1.5em" className="mar5" as={AiFillFacebook}></Icon>
            Facebook
          </Tag>
        )}
      </div>
      <div className="mt-2">
        {!accountsConnected['facebook'] && (
          <Button
            color="blue"
            appearance="primary"
            startIcon={<FacebookOfficialIcon />}
            onClick={linkWithFB}
          >
            Link Facebook
          </Button>
        )}
        {!accountsConnected['google'] && (
          <Button
            color="red"
            appearance="primary"
            startIcon={<GooglePlusCircleIcon />}
            onClick={linkWithGoogle}
          >
            Link Google
          </Button>
        )}
      </div>
    </div>
  );
};
