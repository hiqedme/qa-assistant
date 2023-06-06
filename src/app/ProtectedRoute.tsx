import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isSignedIn: boolean;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isSignedIn, children }: ProtectedRouteProps) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
