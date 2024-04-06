import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Register.module.scss';
import Navbar from '../../components/Navbar';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChangeUsername = (e:any) => {
    setUsername(() => e.target.value);
  };
  const handleInputChangePassword = (e:any) => {
    setPassword(() => e.target.value);
  }
  const handleInputChangeEmail = (e:any) => {
    setEmail(() => e.target.value);
  }
  const handleInputChangeCountry = (e:any) => {
    setCountry(() => e.target.value);
  }
  const handleInputChangeCity = (e:any) => {
    setCity(() => e.target.value);
  }
  const handleInputChangePhone = (e:any) => {
    setPhone(() => e.target.value);
  }

  const handleRegister = async (e:any) => {
    e.preventDefault();//co can khong
    setIsLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/register`,
        {
          username: username,
          password: password,
          email: email,
          country: country,
          city: city,
          phone: phone,
        },
      );

      navigate('/login');
      setIsLoading(false);
      toast.success('Registered account succeeded');
    } catch (err: any) {
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar type="register" />
      <div className={styles['register']}>
        {step === 1 && (
          <div className={styles['register__container']}>
            <div className={styles['register__container__header']}>
              Create an account
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChangeEmail}
              className={styles['register__container__input']}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChangePassword}
              className={styles['register__container__input']}
            />
            <button
              onClick={() => setStep(2)}
              className={styles['register__container__next-btn']}
            >
              Next
            </button>
            <span className={styles['login-btn']} onClick={handleNavigate}>
              Sign in to an account
            </span>
          </div>
        )}
        {step === 2 && (
          <div className={styles['register__container']}>
            <div className={styles['register__container__header']}>
              Your Basic Informations
            </div>
            <input
              type="text"
              placeholder="Full Name *"
              value={username}
              onChange={handleInputChangeUsername}
              className={styles['register__container__input']}
            />
            <input
              type="text"
              placeholder="Country *"
              value={country}
              onChange={handleInputChangeCountry}
              className={styles['register__container__input']}
            />
            <input
              type="text"
              placeholder="City *"
              value={city}
              onChange={handleInputChangeCity}
              className={styles['register__container__input']}
            />
            <input
              type="number"
              placeholder="Phone Number *"
              value={phone}
              onChange={handleInputChangePhone}
              className={styles['register__container__input']}
            />
            <button
              onClick={() => setStep(1)}
              className={styles['register__container__previous-btn']}
            >
              Previous
            </button>
            <button
              className={styles['register__container__register-btn']}
              onClick={handleRegister}
              disabled={
                isLoading ||
                !username ||
                !password ||
                !email ||
                !country ||
                !city ||
                !phone
              }
            >
              Register
            </button>
            <span className={styles['login-btn']} onClick={handleNavigate}>
              Sign in to an account
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
