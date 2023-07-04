import { Navigate } from 'react-router';
import HomePage from '../pages/HomePage';

function HomeRoute() {
  const signedIn = true;

  if (signedIn) {
    return <HomePage />;
  } else {
    return <Navigate to="/signIn" />;
  }
}

export default HomeRoute;
