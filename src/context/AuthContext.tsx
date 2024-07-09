import React, { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import { getToken } from '../services/token';
import axios from 'axios';

interface AuthContextProps {
  user: any;
  loading: boolean;
  error: any;
  dispatch?: React.Dispatch<any>;
}

const INITIAL_STATE: AuthContextProps = {
  user: null,
  loading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextProps>(INITIAL_STATE);

const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { user: null, loading: true, error: null };
    case 'LOGIN_SUCCESS': {
      return { user: action.payload, loading: false, error: null };
    }
    case 'LOGIN_FAIL': {
      return { user: null, loading: false, error: action.payload };
    }
    case 'LOGOUT': {
      localStorage.removeItem('accessToken');
      return { user: null, loading: false, error: null };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const getIsLogin = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/isLogin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
      }
      catch (err: any) {
        dispatch('LOGOUT');
      }
    }
    const token = getToken();
    if (!token) {
      dispatch('LOGOUT');
    }
    else {
      getIsLogin();
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
