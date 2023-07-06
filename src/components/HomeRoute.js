import { Navigate } from 'react-router';
import HomePage from '../pages/HomePage';
import { useProfile } from '../logic/contexts/ProfileContext';
import { Loader, Placeholder } from 'rsuite';

function HomeRoute() {
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
    return <Navigate to="/signIn" />;
  }
}

export default HomeRoute;
