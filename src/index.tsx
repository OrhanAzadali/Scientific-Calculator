import ReactDOM from 'react-dom/client';
import App from './App';
import 'tailwindcss';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <App />
    );
}

