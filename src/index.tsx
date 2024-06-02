import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ReserveContextProvider } from './context/ReserveContext';
import './styles/global.scss';

ReactDOM.render(
    <AuthContextProvider>
        <ReserveContextProvider>
          <App />
        </ReserveContextProvider>
    </AuthContextProvider>,
  document.getElementById('root'),
);
