import {
  Button,
  Col,
  Container,
  Grid,
  Loader,
  Panel,
  Placeholder,
  Row,
} from 'rsuite';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import { onFBSignIn, onGoogleSignIn } from '../data/authController';
import '../styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';
import { useProfile } from '../logic/contexts/ProfileContext';

export default function SignInPage() {
  const { isLoading } = useProfile();

  if (isLoading) {
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
