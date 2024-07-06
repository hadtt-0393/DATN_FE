import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FooterComponent } from '../../components';
import Header from '../../components/Header/HeaderComponent';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import Navbar from '../../components/Navbar/NavbarComponent';
import { Form } from '../../models/Form';
import { getToken } from '../../services/token';
import Reservation from './Reservation';
const Image = styled.img`
    width: 100%;
    objectFit: cover;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    &:hover{
        transform: scale(1.1);
        cursor: pointer;
},`;

export default function ReservationsPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    const getForms = async () => {
      try {
        setLoading(true);
        const forms = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/form/getAllFormByUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setForms(forms.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getForms();
  }, []);

  const reFetch = () => {
    const token = getToken();
    const getForms = async () => {
      try {
        setLoading(true);
        const forms = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/form/getAllFormByUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setForms(forms.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getForms();
  };

  return (
    <Box>
      <Navbar />
      <Header />
      <Box width="100%" mt="150px" p={0}>
        <Box
          width="92%"
          maxWidth="1224px"
          m="30px auto"
          display="flex"
          gap={3}
          flexDirection="column"
        >
          {forms.length > 0 && (
            <Typography
              fontSize="20px"
              fontWeight="600"
              color="#18458B"
              mt="30px"
            >
              Danh sách phòng đã đặt
            </Typography>
          )}
          <Box width="100%" m="10px auto">
            <Grid container gap={5} maxWidth="1224px">
              {forms.length > 0 &&
                forms.map((form, key) => {
                  return (
                    <Reservation key={key} form={form} refetch={reFetch} />
                  );
                })}

              {forms.length === 0 && !loading && (
                <Box
                  display="flex"
                  width="100%"
                  m="0 auto"
                  border="1px solid #CCC"
                  borderRadius={'10px'}
                  height="500px"
                  flexDirection="column"
                  gap={5}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/5581/5581212.png"
                    style={{ width: '200px', height: '200px' }}
                  />
                  <Typography color="#18458B" fontSize="24px" fontWeight={600}>
                    Hiện bạn đang chưa đặt phòng nào
                  </Typography>
                </Box>
              )}
              {forms.length === 0 && loading && null}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Loading loading={loading} />
      {forms.length > 0 && <FooterComponent />}
    </Box>
  );
}
