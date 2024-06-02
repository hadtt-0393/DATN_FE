import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import HomePage from './pages/HomePage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import DetailHotel from './components/DetailHotel';
import SearchResultsPage from './components/ResultSearch';
import ReservationsPage from './components/ListReservations';
import BookingPage from './components/Booking';
import PaymentMethod from './components/PaymentMethod';
import { useScrollToTop } from './hook/use-hook-to-top';
import PaymentSuccess from './components/PaymentSuccess';

const App = () => {
  // useScrollToTop();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hotel/:id" element={<DetailHotel />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/city" element={<SearchResultsPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/select-payment-method" element={<PaymentMethod />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
