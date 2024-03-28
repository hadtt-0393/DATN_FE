import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import styles from './Login.module.scss';
import Navbar from '../../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputChangeEmail = (e:any) => {
    setEmail(() => e.target.value);
  };

  const handleInputChangePassword = (e:any) => {
    setPassword(() => e.target.value);
  };

  const handleLogin = async (e:any) => {
    dispatch && dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/login/`,
        {
          email: email,
          password: password,
        }
      );
      dispatch &&
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      navigate('/');
    } catch (err: any) {
      dispatch &&
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  if (error) {
    toast.error(`${error.message}`, { toastId: 'LOGIN_FAILURE' });
  }

  return (
    <>
      <Navbar type="login" />
      <div className={styles['login']}>
        <div className={styles['login__container']}>
          <div className={styles['login__container__header']}>Sign in</div>
          <input
            type="text"
            placeholder="Email"
            onChange={handleInputChangeEmail}
            className={styles['login__container__input']}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleInputChangePassword}
            className={styles['login__container__input']}
          />
          <button
            className={styles['login__container__login-btn']}
            onClick={handleLogin}
            disabled={loading}
          >
            Sign in
          </button>
          <span className={styles['signup-btn']} onClick={handleRegister}>
            Create a new account
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
