import styles from './HomePage.module.scss';
import BoxChat from '../../components/BoxChat';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import Footer from '../../components/Footer';
import PopularPlaces from '../../components/PopularPlaces';
import HighestScoreProperties from '../../components/HighestScoreProperties';
import NewestProperties from '../../components/NewestProperties';
import BecomeOwner from '../../components/BecomeOwner';
import { Box } from '@mui/material';
import { useScrollToTop } from '../../hook/use-hook-to-top';

const HomePage = () => {
  const [openBoxChat, setOpenBotChat] = useState(false)
  const handleOpenBoxChat = () => {
    setOpenBotChat(true)
  }

  const onClose = () => {
    setOpenBotChat(false)
  }

  useScrollToTop();

  return (
    <Box>
      <Navbar />
      <Header />
      <Slider display={true} />
      <PopularPlaces />
      <HighestScoreProperties />
      <NewestProperties />
      <BecomeOwner />
      <Footer />
    </Box>
  );
};

export default HomePage;
