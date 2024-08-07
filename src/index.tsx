import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import './styles/global.scss';

ReactDOM.render(
    <AuthContextProvider>
          <App />
    </AuthContextProvider>,
  document.getElementById('root'),
);
