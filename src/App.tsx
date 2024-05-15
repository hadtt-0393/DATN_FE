import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import HomePage from './pages/HomePage';
import HotelItem from './pages/HotelItem';
import HotelList from './pages/HotelList';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ReservePage from './pages/ReservePage';
import AllHotelPage from './pages/AllHotelPage';
import UserReservationsPage from './pages/UserReservationsPage';
import UserReservationDetails from './pages/UserReservationDetails';
import Login from './pages/Login_ver2';
import DetailHotel from './components/DetailHotel';
import SearchResults from './components/ResultSearch';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<HotelItem />} />
        <Route path="/reserve/:id" element={<ReservePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reservations" element={<UserReservationsPage />} />
        <Route path="/reservations/:id" element={<UserReservationDetails />} />
        <Route path="/detail-hotel" element={<DetailHotel />} />
        <Route path="/all-hotels" element={<AllHotelPage type={'Hotel'} />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route
          path="/all-apartments"
          element={<AllHotelPage type={'Apartment'} />}
        />
        <Route path="/all-resorts" element={<AllHotelPage type={'Resort'} />} />
        <Route path="/all-villas" element={<AllHotelPage type={'Villa'} />} />
        <Route path="/all-cabins" element={<AllHotelPage type={'Cabin'} />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
