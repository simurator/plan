import React from 'react';
import ReactDOM from 'react-dom/client'; // Nowe API w React 18
import App from './App';
import { Provider } from 'react-redux';
import store from './components/Store'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
