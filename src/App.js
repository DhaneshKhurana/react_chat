import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRoute from './components/HomeRoute';
import SignInRoute from './components/SignInRoute';
import NotFoundRoute from './components/NotFoundRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/signIn" element={<SignInRoute />} />
        <Route path="/*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
