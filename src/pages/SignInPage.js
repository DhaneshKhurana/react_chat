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
  Message,
  Panel,
  Row,
  toaster,
} from 'rsuite';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import { fireAuth, fireDB } from '../firebase/firebase';
import { ref, serverTimestamp, set } from 'firebase/database';
import '../styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';

export default function SignInPage() {
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
