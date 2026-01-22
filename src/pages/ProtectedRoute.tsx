import { Navigate } from 'react-router-dom';
import { JSX } from 'react'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuth = false; // replace with real auth

  return isAuth
    ? children
    : <Navigate to={'/login'} replace />;
}


