import { Box } from '@mui/material';
import { useState } from 'react';
import { BecomeOwnerComponent, FooterComponent, HeaderComponent, NavbarComponent, PopularPlacesComponent, SliderComponent, HighestScoreHotelComponent, NewestHotelComponent } from '../../components';

const HomePage = () => {
  const [openBoxChat, setOpenBotChat] = useState(false)
  const handleOpenBoxChat = () => {
    setOpenBotChat(true)
  }

  const onClose = () => {
    setOpenBotChat(false)
  }


  return (
    <Box>
      <NavbarComponent />
      <HeaderComponent />
      <SliderComponent display={true} />
      <PopularPlacesComponent />
      {/* <HighestScoreHotelComponent /> */}
      {/* <NewestHotelComponent /> */}
      <BecomeOwnerComponent />
      <FooterComponent />
    </Box>
  );
};

export default HomePage;
