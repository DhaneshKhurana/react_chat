import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRoute from './components/HomeRoute';
import SignInRoute from './components/SignInRoute';
import NotFoundRoute from './components/NotFoundRoute';
import { ProfileProvider } from './logic/contexts/ProfileContext';

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
