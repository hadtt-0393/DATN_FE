import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from '../../components/Footer/FooterComponent';
import Header from '../../components/Header/HeaderComponent';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import Navbar from '../../components/Navbar/NavbarComponent';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import { Room } from '../../models/Room';
import { getToken } from '../../services/token';
import AnlysisHotel from './AnalysisHotel';
import DescriptionHotel from './DescriptionHotel';
import FeedBack from './FeedBack';
import ImageHotel from './ImageHotel';
import SearchBarCustom from './SearchBar/SearchBar';
import ServicesHotel from './ServicesHotel';
import SubHeaderHotel from './SubHeaderHotel';
export interface DatesInterface {
  startDate: Date;
  endDate: Date;
  key: string;
}

const getLabel = (value: number): string => {
  if (value >= 0 && value < 1) return 'Rất kém';
  if (value >= 1 && value < 2) return 'Kém';
  if (value >= 2 && value < 3) return 'Tạm';
  if (value >= 3 && value < 4) return 'Khá';
  if (value >= 4 && value < 4.5) return 'Tốt';
  if (value >= 4.5 && value <= 5) return 'Rất tốt';
  return '';
};

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

export default function DetailHotel() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { state } = location;
  const id = location.pathname.split('/')[2];
  const { data, loading, error } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotel/${id}`,
  );

  const currentDate = new Date();
  const startDateDefault = currentDate.toLocaleDateString('en-US');
  const endDateDefault = new Date(
    currentDate.getTime() + 86400000,
  ).toLocaleDateString('en-US');
  const optionDefault = {
    adult: 2,
    children: 0,
    room: 1,
  };

  const start = state ? state.startDate : startDateDefault;
  const end = state ? state.endDate : endDateDefault;
  const adult = state ? state.adult : 2;
  const children = state ? state.children : 0;
  const room = state ? state.room : 1;
  const navigate = useNavigate();

  const [startDateFilter, setStartDateFilter] = useState(start);
  const [endDateFilter, setEndDateFilter] = useState(end);
  const [adultFilter, setAdultFilter] = useState(adult);
  const [childrenFilter, setChildrenFilter] = useState(children);
  const [roomNumberFilter, setRoomNumberFilter] = useState(room);
  const [load, setLoad] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomsSuggest, setRoomsSuggest] = useState<any[]>([]);
  const [totalPriceSuggest, setTotalPriceSuggest] = useState(0);
  const [cursor, setCursor] = useState('no-drop');

  const startDateProp = state ? new Date(state.startDate) : currentDate;
  const endDateProp = state
    ? new Date(state.endDate)
    : new Date(currentDate.getTime() + 86400000);
  const optionProp = state
    ? {
      adult: state.adult,
      children: state.children,
      room: state.room,
    }
    : optionDefault;

  const handleChangeData = (arg1, arg2) => {
    if (arg1 === 'date') {
      const stFilter = arg2[0].startDate.toLocaleDateString('en-US');
      const edFilter = arg2[0].endDate.toLocaleDateString('en-US');
      setStartDateFilter(stFilter);
      setEndDateFilter(edFilter);
    }
    if (arg1 === 'option') {
      setAdultFilter(arg2?.adult);
      setChildrenFilter(arg2?.children);
      setRoomNumberFilter(arg2?.room);
    }
  };

  useEffect(() => {
    setLoad(true);
    const getAllRoomAvailable = async () => {
      const Rooms = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomAvailable/${id}?startDate=${start}&endDate=${end}`,
      );
      const RoomsSuggest = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomFilter/${id}?startDate=${startDateFilter}&endDate=${endDateFilter}&adult=${adultFilter}&children=${childrenFilter}&roomNumber=${roomNumberFilter}`,
      );
      const updatedRooms = Rooms.data.map((room) => ({
        ...room,
        quantityChoose: 0,
      }));

      setRooms(updatedRooms);
      setRoomsSuggest(RoomsSuggest.data.rooms ?? []);
      setTotalPriceSuggest(RoomsSuggest.data.cost ?? 0);
      setLoad(false);
    };

    getAllRoomAvailable();
  }, []);

  const handleCheckRoomAvailable = async () => {
    setLoad(true);
    const RoomsSuggest = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomFilter/${id}?startDate=${startDateFilter}&endDate=${endDateFilter}&adult=${adultFilter}&children=${childrenFilter}&roomNumber=${roomNumberFilter}`,
    );
    const Rooms = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomAvailable/${id}?startDate=${start}&endDate=${end}`,
    );
    const updatedRooms = Rooms.data.map((room) => ({
      ...room,
      quantityChoose: 0,
    }));
    setRooms(updatedRooms);
    setRoomsSuggest(RoomsSuggest.data.rooms ?? []);
    setTotalPriceSuggest(RoomsSuggest.data.cost ?? 0);
    setLoad(false);
  };

  const handleBooking = async () => {
    const token = getToken();

    if (rooms.reduce((total, room) => total + room.quantityChoose, 0) === 0) {
      setCursor('no-drop');
      return;
    } else {
      setCursor('pointer');
    }

    try {
      const authUser = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/user/isLogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate(`/booking/${id}`, {
        state: {
          room: rooms,
          hotel: data,
          option: {
            adult: adultFilter,
            children: childrenFilter,
            room: roomNumberFilter,
            startDate: startDateFilter,
            endDate: endDateFilter,
          },
        },
      });
    } catch (error) {
      toast.warning('Vui lòng đăng nhập để đặt phòng', {
        autoClose: 2000,
        onClose: () => navigate('/signin'),
      });

      return;
    }
  };

  const handleChange = (event: any, Room) => {
    const selectedQuantity = event.target.value;
    const updatedRooms = rooms.map((room) => {
      if (room._id === Room._id) {
        return {
          ...room,
          quantityChoose: selectedQuantity,
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const handleChooseSuggest = (roomSuggests: any) => {
    let result = rooms.map((room) => {
      let updatedRoom = room; // Biến tạm thời để giữ phòng được cập nhật hoặc không
      for (let roomSuggest of roomSuggests) {
        if (room._id === roomSuggest._id) {
          updatedRoom = { ...room, quantityChoose: roomSuggest.quantity };
          break; // Thoát vòng lặp khi đã tìm thấy và cập nhật phòng
        }
      }
      return updatedRoom;
    });
    setRooms(result);
  };

  useEffect(() => {
    const totalRooms = rooms.reduce(
      (total, room) => total + room.quantityChoose,
      0,
    );
    setCursor(totalRooms === 0 ? 'no-drop' : 'pointer');
  }, [rooms]);

  const calculateDate = (start: string, end: string) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    let timeDiff = Math.abs(startDate.getTime() - endDate.getTime())
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  let DateDiff = calculateDate(startDateFilter, endDateFilter)

  return (
    <Box>
      <Navbar />
      <Header />
      {data && <SubHeaderHotel data={data} />}
      <Box bgcolor="#ECF6F8">
        <Box
          width="92%"
          bgcolor="#ECF6F8"
          maxWidth="1224px"
          m="30px auto"
          display="flex"
          gap={5}
          padding="50px 0"
        >
          <Box flex="2">
            {data && <ImageHotel images={data.images} />}
            {data && (
              <AnlysisHotel
                totalRooms={data.totalRooms}
                countForms={data.countForms}
                distance={data.distance}
              />
            )}
            {data && <DescriptionHotel description={data.description} />}
            {data && <ServicesHotel services={data.services} />}

            {roomsSuggest.length > 0 ? (
              <Box bgcolor="white" mt="30px" borderRadius="5px" pb="30px">
                <Box m="0px 30px">
                  <Typography
                    fontWeight="600"
                    color="#183C7D"
                    fontSize="18px"
                    padding="25px 0"
                  >
                    Được giới thiệu cho {adultFilter} người lớn
                    {childrenFilter !== 0 ? `, ${childrenFilter} trẻ em` : ''}
                  </Typography>
                </Box>
                <Box
                  m="0px 30px"
                  display="flex"
                  justifyContent="center"
                  flexDirection="row"
                  border="1px solid #DDD"
                  borderRadius="2px"
                >
                  <Box
                    flex={2.5}
                    display="flex"
                    flexDirection="column"
                    borderRight="1px solid #DDD"
                    borderRadius="2px"
                  >
                    {roomsSuggest.length > 0 &&
                      roomsSuggest.map((room, key) => {
                        return (
                          <Box
                            display="flex"
                            flexDirection="row"
                            borderBottom="1px solid #DDD"
                            key={key}
                          >
                            <Box
                              flex={1.5}
                              borderRight="1px solid #DDD"
                              flexDirection="column"
                              py={1}
                              px={2}
                            >
                              <Typography fontSize="14px" my={1}>
                                {room.quantity} x Phòng cho {room.maxPeople}{' '}
                                người
                              </Typography>
                              <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="center"
                                pb={1}
                              >
                                <Typography fontSize="14px" mr="10px">
                                  Giá cho :{' '}
                                </Typography>
                                <Box display="flex" alignItems="center">
                                  <PersonIcon sx={{ fontSize: '20px' }} />
                                  <Typography color="#18458B">
                                    x {room.maxPeople}
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography fontWeight={600} fontSize="14px">
                                Mỗi phòng có:
                              </Typography>
                              <Box display="flex" flexDirection="row" my={1}>
                                <Typography mr="10px" fontSize="14px">
                                  Giường:{' '}
                                </Typography>
                                <Box display="flex" flexDirection="row">
                                  {room.Beds.length > 0 && room.Beds.map((bed) => {
                                    return (
                                      <Typography
                                        mr="5px"
                                        fontSize="14px"
                                        key={key}
                                      >
                                        {bed.quantity} x {bed.bedName}
                                      </Typography>
                                    )
                                  })}
                                </Box>
                              </Box>
                              <Typography
                                fontWeight={600}
                                fontSize="14px"
                                pb={1}
                              >
                                Dịch vụ phòng
                              </Typography>
                              <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="center"
                                pb={2}
                                flexWrap="wrap"
                                gap={1}
                              >
                                {room.services.length > 0 &&
                                  room.services.map((service, key) => (
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      alignItems="center"
                                      key={key}
                                    >
                                      <CheckOutlinedIcon
                                        sx={{
                                          color: '#3AACEE',
                                          fontSize: '16px',
                                        }}
                                      />
                                      <Typography
                                        fontSize="14px"
                                        color="#000"
                                        ml="3px"
                                      >
                                        {service}
                                      </Typography>
                                    </Box>
                                  ))}
                              </Box>
                              <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="start"
                                pb={1}
                              >
                                <AvTimerIcon
                                  sx={{
                                    color: 'red',
                                    fontSize: '16px',
                                    mr: '5px',
                                  }}
                                />
                                <Typography color="red" fontSize="14px">
                                  Chỉ còn {room.quantityAvailable} phòng trên
                                  trang của chúng tôi
                                </Typography>
                              </Box>
                            </Box>
                            <Box flex={1} p={2}>
                              <Typography fontWeight={600}>
                                {(room.price * room.quantity)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                VND
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                  </Box>

                  <Box
                    flex={1}
                    display="flex"
                    justifyContent="flex-start"
                    flexDirection="column"
                    alignItems="flex-start"
                    p={2}
                  >
                    <Typography fontSize="12px" color="#666" mb={1}>
                      {' '}
                      {DateDiff} đêm , {adultFilter} người lớn{' '}
                      {childrenFilter !== 0 ? `, ${childrenFilter}` : ''}{' '}
                      {childrenFilter !== 0 ? ' Trẻ em' : ''}{' '}
                    </Typography>
                    <Typography fontWeight={600} mb={2}>
                      {(totalPriceSuggest * DateDiff)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                      VND
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: '600',
                        alignSelf: 'center',
                        width: '100%',
                      }}
                      onClick={() => handleChooseSuggest(roomsSuggest)}
                    >
                      Đặt các lựa chọn của bạn
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box width="100%" sx={{ backgroundColor: '#FFF' }} pb="30px">
                <Box m="0px 30px">
                  <Typography
                    fontWeight="600"
                    color="red"
                    fontSize="18px"
                    padding="25px 0"
                  >
                    Hiện tại, hệ thống chưa tìm được gợi ý nào phù hợp với yêu
                    cầu của quý khách
                  </Typography>
                </Box>
              </Box>
            )}
            <Box width="100%" sx={{ backgroundColor: '#FFF' }} pb="30px">
              <Box width="60%" mx="30px" mt="30px" pb="30px">
                <Typography
                  fontWeight="600"
                  color="#183C7D"
                  fontSize="18px"
                  padding="25px 0"
                >
                  Phòng trống
                </Typography>
                <SearchBarCustom
                  handleChangeData={handleChangeData}
                  onSearch={handleCheckRoomAvailable}
                  startDate={startDateProp}
                  endDate={endDateProp}
                  option={optionProp}
                />
              </Box>
              <Box mx="30px">
                <Typography fontWeight="600" pb={2}>
                  Tất cả các phòng còn trống
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  border="1px solid #5BBAFF"
                >
                  <Box flex={2} borderRight="1px solid #5BBAFF">
                    <Box
                      height="60px"
                      bgcolor="#18458B"
                      sx={{ opacity: '0.7' }}
                      display="flex"
                      justifyContent="center"
                      color="white"
                      alignItems="center"
                      fontWeight={600}
                    >
                      Loại phòng
                    </Box>
                  </Box>
                  <Box flex={1} borderRight="1px solid #5BBAFF">
                    <Box
                      height="60px"
                      bgcolor="#18458B"
                      sx={{ opacity: '0.7' }}
                      display="flex"
                      justifyContent="center"
                      color="white"
                      alignItems="center"
                      fontWeight={600}
                    >
                      Số lượng khách
                    </Box>
                  </Box>
                  <Box flex={1.5} borderRight="1px solid #5BBAFF">
                    <Box
                      height="60px"
                      bgcolor="#18458B"
                      display="flex"
                      justifyContent="center"
                      color="white"
                      alignItems="center"
                      fontWeight={600}
                    >
                      Giá phòng/Đêm
                    </Box>
                  </Box>
                  <Box flex={1} borderRight="1px solid #5BBAFF">
                    <Box
                      height="60px"
                      bgcolor="#18458B"
                      sx={{ opacity: '0.7' }}
                      display="flex"
                      justifyContent="center"
                      color="white"
                      alignItems="center"
                      fontWeight={600}
                    >
                      Chọn phòng
                    </Box>
                  </Box>
                  <Box flex={1.5}>
                    <Box
                      height="60px"
                      bgcolor="#18458B"
                      sx={{ opacity: '0.7' }}
                      display="flex"
                      justifyContent="center"
                      color="white"
                      alignItems="center"
                      fontWeight={600}
                    ></Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  border="1px solid #5BBAFF"
                  borderTop="none"
                >
                  <Box flex={5.5} display="flex" flexDirection="column">
                    {rooms.length > 0 &&
                      rooms.map((room, key) => {
                        return (
                          <Box
                            display="flex"
                            borderTop="1px solid #5BBAFF"
                            flexDirection={'row'}
                            key={key}
                          >
                            <Box flex={2} borderRight="1px solid #5BBAFF">
                              <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="start"
                                m={2}
                                flexDirection="column"
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  overflow="hidden"
                                  borderRadius="4px"
                                >
                                  <Image
                                    src={room.image}
                                    alt="room-image"
                                    style={{
                                      width: '100%',
                                      objectFit: 'contain',
                                      marginBottom: '20px',
                                    }}
                                  />
                                </Box>
                                <Typography
                                  color="#0083EB"
                                  fontWeight="600"
                                  mb={1}
                                >
                                  {room.roomType}
                                </Typography>
                                <Box display="flex" flexDirection="row">
                                  {room.Beds.length > 0 &&
                                    room.Beds.map((bed, key) => {
                                      return (
                                        <Typography
                                          mr="5px"
                                          fontSize="14px"
                                          key={key}
                                        >
                                          {bed.quantity} {bed.bedName}
                                        </Typography>
                                      );
                                    })}
                                </Box>
                                <Typography
                                  fontWeight={600}
                                  fontSize="14px"
                                  my={1}
                                >
                                  Dịch vụ phòng
                                </Typography>
                                <Box
                                  display="flex"
                                  justifyContent="start"
                                  alignItems="center"
                                  pb={2}
                                  flexWrap="wrap"
                                  gap={1}
                                >
                                  {room.services.length > 0 &&
                                    room.services.map((service, key) => (
                                      <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        key={key}
                                      >
                                        <CheckOutlinedIcon
                                          sx={{
                                            color: '#3AACEE',
                                            fontSize: '16px',
                                          }}
                                        />
                                        <Typography
                                          fontSize="14px"
                                          color="#000"
                                          ml="3px"
                                        >
                                          {service}
                                        </Typography>
                                      </Box>
                                    ))}
                                </Box>
                              </Box>
                            </Box>
                            <Box flex={1} borderRight="1px solid #5BBAFF">
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                m={2}
                              >
                                <PersonIcon sx={{ fontSize: '25px' }} />
                                <Typography color="#18458B">
                                  x {room.maxPeople}
                                </Typography>
                              </Box>
                            </Box>
                            <Box flex={1.5} borderRight="1px solid #5BBAFF">
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="start"
                                m={2}
                                fontWeight="700"
                              >
                                {room.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                VND
                              </Box>
                            </Box>
                            <Box flex={1} borderRight="1px solid #5BBAFF">
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="start"
                                m={2}
                              >
                                <FormControl>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={room.quantityChoose}
                                    onChange={(event) =>
                                      handleChange(event, room)
                                    }
                                    renderValue={() => room.quantityChoose}
                                    displayEmpty
                                    sx={{ height: '50px', width: '70px' }}
                                    MenuProps={{
                                      disableScrollLock: true,
                                    }}
                                  >
                                    {Array.from(
                                      { length: room.quantityAvailable + 1 },
                                      (_, num) => (
                                        <MenuItem key={num} value={num}>
                                          {num}
                                          {num > 0
                                            ? ` : ${(num * room.price)
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                '.',
                                              )} VND`
                                            : ''}
                                        </MenuItem>
                                      ),
                                    )}
                                  </Select>
                                </FormControl>
                              </Box>
                            </Box>
                          </Box>
                        );
                      })}
                  </Box>

                  <Box
                    flex={1.5}
                    borderTop="1px solid #5BBAFF"
                    bgcolor={
                      rooms.reduce(
                        (total, room) => total + room.quantityChoose,
                        0,
                      ) > 0
                        ? '#ebf3ff'
                        : '#FFF'
                    }
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="start"
                      m={2}
                      flexDirection="column"
                      gap={3}
                    >
                      {rooms.reduce(
                        (total, room) => total + room.quantityChoose,
                        0,
                      ) > 0 && (
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Typography fontWeight={600}>
                              Giá tổng{' '}
                              {rooms.reduce(
                                (total, room) => total + room.quantityChoose,
                                0,
                              )}{' '}
                              phòng/{DateDiff}{' '}đêm
                            </Typography>
                            <Typography fontWeight={600} color="#18458B">
                              {(rooms
                                .reduce(
                                  (total, room) =>
                                    total + room.price * room.quantityChoose,
                                  0,
                                ) * DateDiff)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                              VND
                            </Typography>
                          </Box>
                        )}

                      <Button
                        variant="contained"
                        sx={{
                          fontWeight: '600',
                          alignSelf: 'center',
                          width: '100%',
                          '&:hover': { cursor: cursor },
                        }}
                        onClick={handleBooking}
                      >
                        Tôi sẽ đặt
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            {data && <FeedBack data={data} />}
          </Box>
        </Box>
      </Box>
      <Loading loading={load} />
      <Footer />
    </Box>
  );
}
