import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../components/sidebar/Sidebar';
import { RoomsProvider } from '../logic/contexts/RoomsContext';

export default function HomePage() {
  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col xs={24} md={8} className="h-100">
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </RoomsProvider>
  );
}
