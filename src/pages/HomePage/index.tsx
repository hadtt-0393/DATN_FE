import FeaturedCity from '../../components/FeaturedCity';
import FeaturedProperties from '../../components/FeaturedProperties';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MailList from '../../components/MailList';
import Navbar from '../../components/Navbar';
import PropertyList from '../../components/PropertyList';
import Box from '@mui/material/Box';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import styles from './HomePage.module.scss';
import BoxChat from '../../components/BoxChat';
import { useState } from 'react';

const HomePage = () => {
  const [openBoxChat, setOpenBotChat] = useState(false)
  const handleOpenBoxChat = () => {
    setOpenBotChat(true)
  }

  const onClose = () => {
    setOpenBotChat(false)
  }

  return (
    <div className='homepage'>
      <Navbar />
      <Header />
      <div className={styles['home-page__container']}>
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
            {/* <ChatOutlinedIcon/> */}
            <img src="https://img.icons8.com/bubbles/500w/facebook-messenger.png" alt="icon_chat" style={{ width: "100px" }} />
          </Box>}
        {openBoxChat && <BoxChat close={onClose} />}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
