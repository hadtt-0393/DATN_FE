import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ReserveContextProvider } from './context/ReserveContext';
import { SearchContextProvider } from './context/SearchContext';
import './styles/global.scss';

ReactDOM.render(
    <AuthContextProvider>
      <SearchContextProvider>
        <ReserveContextProvider>
          <App />
        </ReserveContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>,
  document.getElementById('root'),
);
