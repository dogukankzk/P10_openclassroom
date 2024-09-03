import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import du Provider
import store from './store/store';  // Import du store Redux
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>  {/* Enveloppe App dans Provider */}
    <App />
  </Provider>
);
