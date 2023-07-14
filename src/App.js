import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProfileProvider } from './logic/contexts/ProfileContext';
import HomeRoute from './components/routes/HomeRoute';
import { SignInRoute } from './components/routes/SignInRoute';
import NotFoundRoute from './components/routes/NotFoundRoute';
import './styles/main.scss';

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/signIn" element={<SignInRoute />} />
          <Route path="/*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
