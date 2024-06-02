import React, { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { toast } from 'react-toastify';

interface AuthContextProps {
  user: any;
  loading: boolean;
  error: any;
  dispatch?: React.Dispatch<any>;
}

const INITIAL_STATE: AuthContextProps = {
  user: JSON.parse((localStorage as any).getItem('user')) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext<AuthContextProps>(INITIAL_STATE);

const AuthReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'LOGIN_START':
      console.log('start')
      return { user: null, loading: true, error: null };
    case 'LOGIN_SUCCESS': {
      toast.success('Đăng nhập thành công', { toastId: 'LOGIN_SUCCESS' });
      return { user: action.payload, loading: false, error: null };
    }
    case 'LOGIN_FAIL': {
      return { user: null, loading: false, error: action.payload };
    }
    case 'LOGOUT': {
      toast.success('Đăng ký thành công', { toastId: 'LOGOUT' });
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
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

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
