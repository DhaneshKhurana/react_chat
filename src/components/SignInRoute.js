import SignInPage from '../pages/SignInPage';
import HomePage from '../pages/HomePage';

function SignInRoute() {
  const signedIn = false;

  if (!signedIn) {
    return <SignInPage />;
  } else {
    return <HomePage />;
  }
}

export default SignInRoute;
