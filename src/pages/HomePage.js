import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../components/sidebar/Sidebar';
import { RoomsProvider } from '../logic/contexts/RoomsContext';
import { useMediaQuery } from '../logic/customHooks';
import { Route, Routes, useMatch } from 'react-router';
import { ChatWindow } from './ChatWindow';

export default function HomePage() {
  const isMobile = useMediaQuery('(max-width:692px)');
  const match = useMatch('/chat/:chatId');
  // const url = window.location.href;
  // const match = url.match(/\/chat\/([^/?]+)/);
  const showSidebar = !isMobile || !match;
  console.log('Value of match object is ', match);
  console.log('Value of isMobile is  ', isMobile);
  console.log('Value of showSidebar is  ', showSidebar);
  return (
    <div>
      <RoomsProvider>
        <Grid fluid className="h-100">
          <Row className="h-100">
            {showSidebar && (
              <Col xs={24} md={8} className="h-100">
                <Sidebar />
              </Col>
            )}
            <Col xs={24} md={16} className="h-100">
              <Routes>
                <Route exact path="/chat/:chatId" element={<ChatWindow />} />
              </Routes>
              {!match && <div>Please select a chat room to show chats.</div>}
            </Col>
          </Row>
        </Grid>
      </RoomsProvider>
    </div>
  );
}
