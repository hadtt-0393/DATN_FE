import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import HomePage from './pages/HomePage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import DetailHotel from './pages/DetailHotel';
import SearchResultsPage from './pages/ResultSearch';
import ReservationsPage from './pages/ListReservations';
import BookingPage from './pages//Booking';
import PaymentMethod from './pages/PaymentMethod';
import { useScrollToTop } from './hook/use-hook-to-top';
import PaymentSuccess from './pages/PaymentSuccess';
import { lazy, Suspense, useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  // const navigate = useNavigate();
  // const { pathname } = useLocation();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const res = await axios.get<{ isLogin: boolean }>('/staff/isLogin');
  //       const isLogin = res.data.isLogin;
  //       const isAuthRoute = [...pathname.matchAll(new RegExp("signin|signup", "g"))].length;
  //       if (!isLogin && !isAuthRoute) {
  //         navigate('/signin');
  //       }
  //       if (isLogin && isAuthRoute) {
  //         navigate('/');
  //       }
  //     } catch (_) {
  //       navigate('/signin');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   checkUser();
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hotel/:id" element={<DetailHotel />} />
        <Route path="/city/:city" element={<SearchResultsPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/booking-confirm/:id" element={<PaymentMethod />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
