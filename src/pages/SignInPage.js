import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from 'firebase/auth';
import {
  Button,
  Col,
  Container,
  Grid,
  Loader,
  Message,
  Panel,
  Placeholder,
  Row,
  toaster,
} from 'rsuite';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import { fireAuth, fireDB } from '../firebase/firebase';
import { ref, serverTimestamp, set } from 'firebase/database';
import '../styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';
import { useProfile } from '../logic/contexts/ProfileContext';
import { Navigate } from 'react-router';

export default function SignInPage() {
  const { profile, isLoading } = useProfile();

  const signInWithProvider = async provider => {
    try {
      const usrCred = await signInWithPopup(fireAuth, provider);
      const usrInfo = getAdditionalUserInfo(usrCred);

      if (usrInfo.isNewUser) {
        console.log('New user registered', usrInfo);
        await set(ref(fireDB, `/users/${usrCred.user.uid}`), {
          name: usrCred.user.displayName,
          createdAt: serverTimestamp(),
        });

        toaster.push(
          <Message type="success">
            Congratulations {usrCred.user.displayName}. You have been registered
            successfully
          </Message>,
          {
            duration: 4000,
            placement: 'topCenter',
          }
        );
      } else {
        toaster.push(
          <Message type="info">
            Welcome back {usrCred.user.displayName}.
          </Message>,
          {
            duration: 4000,
            placement: 'topCenter',
          }
        );
      }
    } catch (error) {
      toaster.push(
        <Message type="error">
          Sorry! An error has occurred. Error: {error.message}
        </Message>,
        {
          duration: 4000,
          placement: 'topCenter',
        }
      );
    }
  };

  const onFBSignIn = () => {
    signInWithProvider(new FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new GoogleAuthProvider());
  };

  if (profile) {
    return <Navigate to="/" />;
  } else if (isLoading) {
    return (
      <div>
        <Placeholder.Paragraph rows={8} />
        <Loader backdrop content="loading..." vertical />
      </div>
    );
  } else {
    return (
      <Container>
        <Grid className="mt-page">
          <Row>
            <Col xs={24} md={12} mdOffset={6}>
              <Panel>
                <div className="text-center">
                  <h2> Welcome to NavGun Chat App</h2>
                  <p>Our Motto: Sharing is caring</p>
                </div>
                <div className="mt-3 text-center">
                  <Button
                    color="blue"
                    appearance="primary"
                    startIcon={<FacebookOfficialIcon />}
                    onClick={onFBSignIn}
                  >
                    Login with Facebook
                  </Button>
                </div>
                <div className="mt-3 text-center">
                  <Button
                    color="red"
                    appearance="primary"
                    startIcon={<GooglePlusCircleIcon />}
                    onClick={onGoogleSignIn}
                  >
                    Login with Google
                  </Button>
                </div>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}
