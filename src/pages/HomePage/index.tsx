import FeaturedCity from '../../components/FeaturedCity';
import FeaturedProperties from '../../components/FeaturedProperties';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MailList from '../../components/MailList';
import Navbar from '../../components/Navbar';
import PropertyList from '../../components/PropertyList';
import Box from '@mui/material/Box';
import styles from './HomePage.module.scss';
import BoxChat from '../../components/BoxChat';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import Navbar2 from '../../components/Navbar2';
import Header2 from '../../components/Header2'
import Slider from '../../components/Slider';
import PopularPlaces from '../../components/PopularPlaces';
import HighestScoreProperties from '../../components/HighestScoreProperties';
import NewestProperties from '../../components/NewestProperties';
import BecomeOwner from '../../components/BecomeOwner';
import Footer2 from '../../components/Footer2';
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

      <Navbar2 />
      <Header2 />
      <Slider display={true} />
      <PopularPlaces />
      <HighestScoreProperties />
      <NewestProperties />
      <BecomeOwner />
      <Footer2 />
      {/* <Navbar /> */}
      {/* <Header /> */}

      {/* {!openBoxChat &&
          <Box sx={{ position: 'absolute', bottom: 50, right: 50, zIndex: 1000 }} onClick={handleOpenBoxChat} >
            <Fab variant="extended" color="primary" sx={{fontWeight: 700}}>
              <MarkUnreadChatAltIcon sx={{ mr: 1 }} />
              Chat với Bot
            </Fab>
          </Box>}
        {openBoxChat && <BoxChat close={onClose} />} */}

      {/* <div className={styles['home-page__container']}>
        <div className={styles['home-page__container__property-list']}>
          <h1 className={styles['home-page__container__property-list__title']}>
            Browse by property type
          </h1>
          <PropertyList />
        </div>
        <FeaturedCity />
        <div className={styles['home-page__container__featured-properties']}>
          <h1
            className={
              styles['home-page__container__featured-properties__title']
            }
          >
            Stay at our top unique properties
          </h1>
          <span>
            {`From castles and villas to boats and igloos, we've got it all`}
          </span>
          <FeaturedProperties type="Apartment" />
        </div>
        <div className={styles['home-page__container__featured-properties']}>
          <h1
            className={
              styles['home-page__container__featured-properties__title']
            }
          >
            Home guests love
          </h1>
          <FeaturedProperties type="Hotel" />
        </div>
        {!openBoxChat &&
          <Box sx={{ position: 'absolute', bottom: 50, right: 50, zIndex: 1000 }} onClick={handleOpenBoxChat} >
            <Fab variant="extended" color="primary" sx={{fontWeight: 700}}>
              <MarkUnreadChatAltIcon sx={{ mr: 1 }} />
              Chat with Bot
            </Fab>
          </Box>}
        {openBoxChat && <BoxChat close={onClose} />}
        <MailList />
        <Footer />
      </div> */}
    </Box>
  );
};

export default HomePage;
