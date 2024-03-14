import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ReserveContextProvider } from './context/ReserveContext';
import { SearchContextProvider } from './context/SearchContext';
import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <ReserveContextProvider>
          <App />
        </ReserveContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
