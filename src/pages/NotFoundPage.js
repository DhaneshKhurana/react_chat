import { useLocation } from 'react-router';

export default function NotFoundPage() {
  const path = useLocation();
  console.log('Path received in Not found page', path);
  return <div>It is a 404 Not found page</div>;
}
