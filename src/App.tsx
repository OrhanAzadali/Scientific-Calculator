import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

function App() {

  return (
    <RouterProvider router={router} />
  );
}


export default App; 