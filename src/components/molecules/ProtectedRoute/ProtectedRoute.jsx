import { useAuth } from '@/hooks/context/useAuth';
import { LucideLoader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  console.log('isLoading', auth?.isLoading);

  if (auth?.isLoading) {
    return (
      <div>
        <LucideLoader2 className="animate-spin mx-auto mt-10" />
        <span className="flex items-center justify-center">Loading...</span>
      </div>
    );
  }

  if (!auth?.user || !auth?.token) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};
