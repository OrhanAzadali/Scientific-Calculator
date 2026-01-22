import { createBrowserRouter } from 'react-router-dom';
import Temperature from './pages/Temperature';
import CurrencyConverter from './pages/CurrencyConverter';
import ScientificCalculator from './pages/ScientificCalculator';
import AppLayout from './pages/AppLayout';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './pages/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ScientificCalculator /> },
      {
        path: 'temperature',
        element: (
          // <ProtectedRoute>
          <Temperature />
          // </ProtectedRoute>
        )
      }, {
        path: 'currency-converter',
        element: (
          // <ProtectedRoute>
          <CurrencyConverter />
          // </ProtectedRoute>
        )
      },
      // { path: 'login', element: <Login /> }
    ]
  }
]);