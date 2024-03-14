import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Navbar.module.scss';
import logo from '../../logo.png';
import { mt } from 'date-fns/locale';
interface NavbarProps {
  type?: string;
}

const Navbar = ({ type }: NavbarProps) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    dispatch && dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  console.log(process.env.REACT_APP_API_ENDPOINT);

  const [width, setWidth] = useState(
    window.innerWidth > 768 ? 'laptop' : 'mobile',
  );
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth > 768 ? 'laptop' : 'mobile');
    };

    window.addEventListener('resize', handleResize);
  }, [window.innerWidth]);

  return (
    <div className={styles['navbar']}>
      <div className={styles['navbar__container']}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          {/* <span className={styles['navbar__container__logo']}>BestBooking</span> */}
          <img
            src={logo}
            className={styles['navbar__container__logo']}
            style={{
              width: '250px',
              marginLeft: '-50px',
            }}
          />
        </Link>
        {user ? (
          <div className={styles['navbar__container__items']}>
            <button
              className={styles['navbar__container__items__info-btn']}
              onClick={() => navigate('/')}
            >
              {width === 'laptop' ? (
                'List your reservations'
              ) : (
                <FontAwesomeIcon icon={faHouseChimney} />
              )}
            </button>
            {user.username}
            <button
              className={styles['navbar__container__items__btn']}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className={styles['navbar__container__items']}>
            {type !== 'login' && type !== 'register' && (
              <>
                <button
                  className={styles['navbar__container__items__btn']}
                  onClick={handleRegister}
                >
                  Register
                </button>
                <button
                  className={styles['navbar__container__items__btn']}
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
