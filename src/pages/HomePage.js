import { Col, Grid, Row } from 'rsuite';
import Dashboard from '../components/dashboard/Dashboard';
import { CreateRoom } from '../components/chat-room/CreateRoom';

export default function HomeRoute() {
  return (
    <Grid fluid className="h-100">
      <Row>
        <Col xs={24} md={8}>
          <Dashboard />
          <CreateRoom />
        </Col>
      </Row>
    </Grid>
  );
}
