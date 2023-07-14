import SignInPage from '../../pages/SignInPage';
import HomePage from '../../pages/HomePage';
import { Loader, Placeholder } from 'rsuite';
import { useProfile } from '../../logic/contexts/ProfileContext';

export function SignInRoute() {
  const { profile, isLoading } = useProfile();

  if (profile && !isLoading) {
    return <HomePage />;
  } else if (isLoading) {
    return (
      <div>
        <Placeholder.Paragraph rows={8} />
        <Loader backdrop content="loading..." vertical />
      </div>
    );
  } else {
    return <SignInPage />;
  }
}
