import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Card, CardActionArea, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from '../../components/Footer/FooterComponent';
import Header from '../../components/Header/HeaderComponent';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import Navbar from '../../components/Navbar/NavbarComponent';
import SearchBar from '../../components/SearchBar';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import { Room } from '../../models/Room';
import { getToken } from '../../services/token';
import AnlysisHotel from './AnalysisHotel';
import DescriptionHotel from './DescriptionHotel';
import ImageHotel from './ImageHotel';
import ServicesHotel from './ServicesHotel';
import SubHeaderHotel from './SubHeaderHotel';
import { convertDate, convertTime } from '../../utils/convert';

interface FeedBackProps {
  data: Hotel;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      m: "5px", width: "45px", height: "45px"
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Image = styled.img`
    width: 100%;
    objectFit: cover;
    height: 100%;
    borderRadius:5px;
    transition: transform 0.5s ease-in-out;
    ZIndex:2;
    &:hover{
        transform: scale(1.1);
        cursor: pointer;
},`;

export default function FeedBack({ data }: FeedBackProps) {
  const getLabel = (value: number): string => {
    if (value >= 0 && value < 1) return 'Rất kém';
    if (value >= 1 && value < 2) return 'Kém';
    if (value >= 2 && value < 3) return 'Trung bình';
    if (value >= 3 && value < 4) return 'Khá';
    if (value >= 4 && value < 4.5) return 'Tốt';
    if (value >= 4.5 && value <= 5) return 'Rất tốt';
    return '';
  };
  return (
    <Box width="100%" bgcolor="white" mt="30px" borderRadius="5px" pb="30px">
      <Box
        m="0px 30px"
        width="100%"
        borderBottom="#EEE 1px solid"
        display="flex"
        flexDirection="row"
        gap={1}
      >
        <Typography
          fontWeight="600"
          color="#183C7D"
          fontSize="18px"
          padding="25px 0"
        >
          Nhận xét từ người dùng
        </Typography>
        <Typography
          fontWeight="600"
          color="#183C7D"
          fontSize="18px"
          padding="25px 0"
        >
          -
        </Typography>
        <Typography
          fontWeight="600"
          color="#3AACED"
          fontSize="18px"
          padding="25px 0"
        >
          {data.formsFeedback.length > 0
            ? data.formsFeedback.length
            : 'Hiện tại chưa có đánh giá nào'}
        </Typography>
      </Box>
      {data.formsFeedback.length > 0 && (
        <Box
          m="30px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            borderBottom="#EEE 1px solid"
            width="100%"
            paddingBottom="25px"
            flexDirection="row"
            display="flex"
          >
            <Box
              display="flex"
              flex={1}
              flexDirection="column"
              justifyContent="center"
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '5px',
                  fontSize: '13px',
                  textTransform: 'unset',
                  textWrap: 'nowrap',
                  borderRadius: '10px 10px 0px 10px',
                  height: '130px',
                  backgroundColor: '#18458B',
                  width: '160px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '34px',
                    color: 'white',
                    fontWeight: '600',
                  }}
                >
                  {Number.isInteger(data?.ratingAvg) ? data?.ratingAvg : data?.ratingAvg.toFixed(2)}
                </Typography>
                {data?.ratingAvg && (
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: 'white',
                      fontWeight: '600',
                      mt: '5px',
                    }}
                  >
                    {getLabel(data?.ratingAvg)}
                  </Typography>
                )}
              </Box>
              <Box width="160px" m="15px 5px">
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    backgroundColor: '#F9C941',
                    fontWeight: '600',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                      opacity: '0.8',
                      backgroundColor: '#F9C941',
                    },
                  }}
                >
                  Nhận xét
                </Button>
              </Box>
            </Box>
            <Box
              flex={4}
              display={'flex'}
              gap={3}
              flexDirection={'column'}
              justifyContent={'start'}
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                gap={10}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: '5px',
                    flex: '1',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '600',
                    }}
                  >
                    Vệ sinh
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <Slider
                      value={data.cleanlinessAvg}
                      style={{ pointerEvents: 'none' }}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      step={0.1}
                      min={0}
                      max={5}
                      sx={{
                        height: '12px',
                        color: '#3AACED',
                        p: '0',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: '#666',
                        fontWeight: '600',
                        mb: '6px',
                        width: "25px"
                      }}
                    >
                      {Number.isInteger(data.cleanlinessAvg) ? data.cleanlinessAvg : data.cleanlinessAvg.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: '5px',
                    flex: '1',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '600',
                    }}
                  >
                    Độ thoải mái
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <Slider
                      value={data.comfortableAvg}
                      style={{ pointerEvents: 'none' }}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      step={0.1}
                      min={0}
                      max={5}
                      sx={{
                        height: '12px',
                        color: '#3AACED',
                        p: '0',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: '#666',
                        fontWeight: '600',
                        mb: '6px',
                        width: "25px"
                      }}
                    >
                      {Number.isInteger(data.comfortableAvg) ? data.comfortableAvg : data.comfortableAvg.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                justifyContent="space-between"
                gap={10}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: '5px',
                    flex: '1',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '600',
                    }}
                  >
                    Thái độ nhân viên
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <Slider
                      value={data.serviceAvg || 0}
                      style={{ pointerEvents: 'none' }}
                      step={0.1}
                      min={0}
                      max={5}
                      sx={{
                        height: '12px',
                        color: '#3AACED',
                        p: '0',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: '#666',
                        fontWeight: '600',
                        mb: '6px',
                        width: "25px"
                      }}
                    >
                      {Number.isInteger(data.serviceAvg) ? data.serviceAvg : data.serviceAvg.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: '5px',
                    flex: '1',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '600',
                    }}
                  >
                    Cơ sở vật chất
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <Slider
                      value={data.facilitiesAvg}
                      style={{ pointerEvents: 'none' }}
                      step={0.1}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                      sx={{
                        height: '12px',
                        color: '#3AACED',
                        p: '0',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: '#666',
                        fontWeight: '600',
                        mb: '6px',
                        width: "25px"
                      }}
                    >
                      {Number.isInteger(data.facilitiesAvg) ? data.facilitiesAvg : data.facilitiesAvg.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => { }}
            onSlideChange={() => { }}
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '1224px',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '30px',
            }}
          >
            {data.formsFeedback.map((feedback) => {
              return (
                <SwiperSlide
                  style={{ marginBottom: '10px', marginTop: '30px' }}
                >
                  <Card
                    sx={{
                      ml: 0.5,
                      boxShadow: 'none',
                      border: '1px solid #EEE',
                      mr: 0.5,
                    }}
                  >
                    <CardActionArea sx={{}}>
                      <CardContent>
                        <Box
                          flex={1}
                          display="flex"
                          flexDirection="row"
                          justifyContent="start"
                          alignItems="center"
                          gap={2}
                        >
                          <Box
                            flex={1}
                            display="flex"
                            flexDirection="row"
                            gap={1}
                          >
                            <Avatar
                              {...stringAvatar(feedback.username)}
                              alt={feedback.username}
                            />
                            <Box display="flex" flexDirection="column">
                              <Typography
                                sx={{
                                  fontSize: '18px',
                                  color: '#333',
                                  fontWeight: '600',
                                }}
                              >
                                {feedback.username}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  color: '#666',
                                  fontWeight: '600',
                                }}
                              >
                                {convertTime(feedback.comment.created)}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex" justifyContent="end">
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '13px',
                                textTransform: 'unset',
                                textWrap: 'nowrap',
                                borderRadius: '10px 10px 10px 0px',
                                height: '60px',
                                backgroundColor: '#18458B',
                                width: '60px',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: '18px',
                                  color: 'white',
                                  fontWeight: '600',
                                }}
                              >
                                {Number.isInteger(feedback.rating) ? feedback.rating : feedback.rating.toFixed(2)}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  color: 'white',
                                  fontWeight: '600',
                                  mt: '5px',
                                }}
                              >
                                {getLabel(feedback.rating)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            border: '.5px  #CCC dashed',
                            mt: '15px',
                          }}
                        />
                        <Typography
                          sx={{
                            color: '#666',
                            fontSize: '14px',
                            mt: '15px',
                            mb: '12px',
                          }}
                        >
                          {feedback.comment.content}
                        </Typography>
                        <Box
                          sx={{
                            border: '.5px  #CCC dashed',
                            mt: '15px',
                          }}
                        />
                      </CardContent>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          overflow="hidden"
                          borderRadius="5px"
                          width="95%"
                          height="50%"
                          mb="10px"
                        >
                          <Image src={feedback.comment.image} />
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              );
            })}

            <Box
              className="swiper-button-prev"
              style={{ color: '#18458B' }}
            ></Box>
            <Box
              className="swiper-button-next"
              style={{ color: '#18458B' }}
            ></Box>
          </Swiper>
        </Box>
      )}
    </Box>
  );
}
