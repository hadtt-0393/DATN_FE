import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Avatar, Rating } from "@mui/material";
import TextField from "@mui/material//TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Footer from "../../components/Footer/FooterComponent";
import Header from '../../components/Header/HeaderComponent';
import Loading from "../../components/LoadingComponent/LoadingComponent";
import Navbar from '../../components/Navbar/NavbarComponent';
import SearchBar from '../../components/SearchBar';
import { AuthContext } from '../../context/AuthContext';
import useFetch from "../../hooks/useFetch";
import { Hotel } from "../../models/Hotel";
import { getToken } from '../../services/token';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import PersonIcon from '@mui/icons-material/Person';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Room } from '../../models/Room';
import { toast } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export interface DatesInterface {
    startDate: Date;
    endDate: Date;
    key: string;
}

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Tốt',
    4: 'Rất Tốt',
    4.5: 'Xuất Sắc',
    5: 'Rất Xuất Sắc',
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
},`


export default function DetailHotel() {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { state } = location
    const id = location.pathname.split('/')[2];
    const { data, loading, error } = useFetch<Hotel>(
        `${process.env.REACT_APP_API_ENDPOINT}/hotel/${id}`,
    );

    const currentDate = new Date();
    const startDateDefault = currentDate.toLocaleDateString('en-US');
    const endDateDefault = (new Date(currentDate.getTime() + 86400000)).toLocaleDateString('en-US');

    const start = state ? state.startDate : startDateDefault;
    const end = state ? state.endDate : endDateDefault;
    const adult = state ? state.adult : 2;
    const children = state ? state.children : 0;
    const room = state ? state.room : 1;
    const value = 4;
    const navigate = useNavigate()

    const [startDateFilter, setStartDateFilter] = useState(start);
    const [endDateFilter, setEndDateFilter] = useState(end);
    const [adultFilter, setAdultFilter] = useState(adult);
    const [childrenFilter, setChildrenFilter] = useState(children);
    const [roomNumberFilter, setRoomNumberFilter] = useState(room);
    const [load, setLoad] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomsSuggest, setRoomsSuggest] = useState<any[]>([]);
    const [totalPriceSuggest, setTotalPriceSuggest] = useState(0);
    const [cursor, setCursor] = useState('no-drop')


    const handleChangeData = (arg1, arg2) => {
        if (arg1 === 'date') {
            const stFilter = arg2[0].startDate.toLocaleDateString('en-US')
            const edFilter = arg2[0].endDate.toLocaleDateString('en-US')
            setStartDateFilter(stFilter)
            setEndDateFilter(edFilter)
        }
        if (arg1 === 'option') {
            setAdultFilter(arg2?.adult)
            setChildrenFilter(arg2?.children)
            setRoomNumberFilter(arg2?.room)
        }
    }

    useEffect(() => {
        setLoad(true);
        const getAllRoomAvailable = async () => {
            const Rooms = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomAvailable/${id}?startDate=${start}&endDate=${end}`)
            const RoomsSuggest = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomFilter/${id}?startDate=${startDateFilter}&endDate=${endDateFilter}&adult=${adultFilter}&children=${childrenFilter}&roomNumber=${roomNumberFilter}`)
            const updatedRooms = Rooms.data.map(room => ({
                ...room,
                quantityChoose: 0,
            }));

            setRooms(updatedRooms);
            setRoomsSuggest(RoomsSuggest.data.rooms ?? []);
            setTotalPriceSuggest(RoomsSuggest.data.cost ?? 0)
            setLoad(false);
        }

        getAllRoomAvailable();
    }, [])

    const handleCheckRoomAvailable = async () => {
        setLoad(true);
        const RoomsSuggest = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomFilter/${id}?startDate=${startDateFilter}&endDate=${endDateFilter}&adult=${adultFilter}&children=${childrenFilter}&roomNumber=${roomNumberFilter}`)
        const Rooms = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomAvailable/${id}?startDate=${start}&endDate=${end}`)
        const updatedRooms = Rooms.data.map(room => ({
            ...room,
            quantityChoose: 0,
        }));
        setRooms(updatedRooms);
        setRoomsSuggest(RoomsSuggest.data.rooms ?? []);
        setTotalPriceSuggest(RoomsSuggest.data.cost ?? 0)
        setLoad(false);
    }

    const handleBooking = async () => {
        const token = getToken();

        if (rooms.reduce((total, room) => (total + room.quantityChoose), 0) === 0) {
            setCursor('no-drop')
            return
        } else {
            setCursor('pointer')

        }

        try {
            const authUser = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/isLogin`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
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
                    }

                }
            })
        } catch (error) {
            toast.warning('Vui lòng đăng nhập để đặt phòng',
                { autoClose: 2000, onClose: () => navigate('/signin') })

            return;
        }
    }

    const handleChange = (event: any, Room) => {
        const selectedQuantity = event.target.value;
        const updatedRooms = rooms.map(room => {
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
        let result = rooms.map(room => {
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
    }

    useEffect(() => {
        const totalRooms = rooms.reduce((total, room) => total + room.quantityChoose, 0);
        setCursor(totalRooms === 0 ? 'no-drop' : 'pointer');
      }, [rooms]);

    return (
        <Box>
            <Navbar />
            <Header />
            {data && (
                <Box sx={{ mt: "110px", height: "600px", width: "100%", position: "relative" }}>
                    <img src={data.images[0]} alt="slider-image" style={{ width: "100%", height: "600px", objectFit: "cover" }} />
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        width: " 100%",
                        height: "600px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "end"
                    }}>
                        <Box width="92%" height="50%" display="flex" alignItems="center" margin="0 auto" maxWidth="1224px" justifyContent="end" flexDirection="column" sx={{ maxWidth: "1224px" }}>
                            <Box
                                border="1px #999 solid"
                                borderLeft="none"
                                borderRight="none"
                                borderTop="none"
                                p="20px 0px"
                                flexDirection="row"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: "60%",
                                    m: 2,
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Box>
                                    {data.ratingAvg !== 0 && (
                                        <Rating
                                            name="text-feedback"
                                            value={value}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarBorderOutlinedIcon style={{ color: "#FAC73F", fontSize: "18px" }} />}
                                            sx={{ fontSize: "18px", color: "#FAC73F" }}
                                        />
                                    )}

                                    <Typography sx={{ color: "#FEFEFE", fontSize: "44px", fontWeight: "600", mt: "20px" }}>{data.hotelName}</Typography>
                                    <Box width="5%" bgcolor="#3AACED" height="4px" borderRadius="2px" m="20px 0" />
                                    <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2} width="100%" padding="20px 0">
                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                            <EmailOutlinedIcon sx={{ color: "#3A9FC3", mr: "10px" }} />
                                            <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Email:  </Typography>
                                            <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>{data.email}</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                            <RoomOutlinedIcon sx={{ color: "#3A9FC3", mr: "10px" }} />
                                            <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Địa chỉ:  </Typography>
                                            <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>{data.address}</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                            <PhoneOutlinedIcon sx={{ color: "#3A9FC3", mr: "10px" }} />
                                            <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Hotline:  </Typography>
                                            <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>{data.hotline}</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box >
                                    {data.ratingAvg !== 0 ? (
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'end',
                                                m: 1,
                                                flexDirection: "column"
                                            }}>
                                                <Typography sx={{ color: "#FEFEFE", fontSize: "13px", fontWeight: "600" }}>{labels[value]}</Typography>
                                                <Typography sx={{ color: "#FEFEFE", fontSize: "11px", mt: "10px" }}>10 bình luận</Typography>

                                            </Box>
                                            <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "80px", backgroundColor: "#18458B", width: "80px", alignItems: "center", justifyContent: "center" }} >
                                                    <Typography sx={{ fontSize: "20px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                        :
                                        (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'start',
                                                }}
                                            >
                                                <Typography sx={{ color: "#CCC", fontSize: "20px", fontWeight: "600", margin: "10px" }}>Chưa có đánh giá</Typography>

                                            </Box>
                                        )
                                    }
                                </Box>

                            </Box>

                        </Box>

                        <Box width="92%" maxWidth="1224px" display="flex" m="20px auto">
                            <Box flex="1">
                                {
                                    data.discount !== 0 && (
                                        <Box width="160px" height="44px" sx={{ display: "flex", backgroundColor: "#5ECFB1", margin: "20px 20px 10px 0px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "600", }}>Giảm giá {data.discount}%</Typography>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box >
            )}

            <Box bgcolor="#ECF6F8" >
                <Box width="92%" bgcolor="#ECF6F8" maxWidth="1224px" m="30px auto" display="flex" gap={5} padding="50px 0">
                    <Box flex="2" >
                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}>
                            {data?.images.map((image, index) => (
                                <Box
                                    sx={{
                                        width: "33%"
                                    }}
                                    key={index}
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "250px",
                                            objectFit: "cover",
                                            cursor: "pointer"
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box display="flex" flexDirection="row" bgcolor="#FFF" height="105px" mt="50px" justifyContent="space-between" alignItems="center" borderRadius="5px">
                            <Box flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                                <HotelOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                                <Typography color="#999EA5" fontSize="12px" fontWeight="600">{data?.roomIds.length} Phòng</Typography>
                            </Box>
                            <Box borderLeft="#E2E2E2 solid 1px" flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                                <GroupsOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                                <Typography color="#999EA5" fontSize="12px" fontWeight="600">{"1000".replace(/\B(?=(\d{3})+(?!\d))/g, '.')} Lượt đặt phòng</Typography>
                            </Box>
                            <Box borderLeft="#E2E2E2 solid 1px" flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                                <DirectionsCarOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                                <Typography color="#999EA5" fontSize="12px" fontWeight="600">Cách Trung Tâm Thành Phố {data?.distance} Km</Typography>
                            </Box>
                        </Box>
                        <Box bgcolor="white" mt="30px" borderRadius="5px">
                            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Về khách sạn
                                </Typography>
                            </Box>
                            <Box m="0px 30px" >
                                <Typography color="#878C9F" fontSize="13px" padding="25px 0">
                                    {data?.description}
                                </Typography>

                            </Box>
                        </Box>
                        <Box bgcolor="white" mt="30px" borderRadius="5px">
                            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Dịch vụ
                                </Typography>
                            </Box>
                            <Box m="30px" display="flex" justifyContent="start" alignItems="center" pb="30px" flexWrap="wrap" gap={3}>
                                {data?.services && data?.services.map((item, key) => (
                                    <Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" key={key}>
                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                        <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px" >{item}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        {roomsSuggest.length > 0 ?
                            <Box bgcolor="white" mt="30px" borderRadius="5px" pb="30px">
                                <Box m="0px 30px">
                                    <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                        Được giới thiệu cho {adultFilter} người lớn{childrenFilter !== 0 ? `,${childrenFilter} trẻ em` : ''}
                                    </Typography>
                                </Box>
                                <Box m="0px 30px" display="flex" justifyContent="center" flexDirection="row" border="1px solid #DDD" borderRadius="2px" >
                                    <Box flex={2.5} display="flex" flexDirection="column" borderRight="1px solid #DDD" borderRadius="2px" >
                                        {roomsSuggest.length > 0 && roomsSuggest.map((room, key) => {
                                            return (
                                                <Box display="flex" flexDirection="row" borderBottom="1px solid #DDD" key={key}>
                                                    <Box flex={1.5} borderRight="1px solid #DDD" flexDirection="column" py={1} px={2} >
                                                        <Typography fontSize="14px" my={1}>{room.quantity} x Phòng cho {room.maxPeople} người</Typography>
                                                        <Box display="flex" justifyContent="start" alignItems="center" pb={1}>
                                                            <Typography fontSize="14px" mr="10px">Giá cho : </Typography>
                                                            <Box display="flex" alignItems="center" >
                                                                <PersonIcon sx={{ fontSize: "20px" }} />
                                                                <Typography color="#18458B">x {room.maxPeople}</Typography>
                                                            </Box>
                                                        </Box>
                                                        <Typography fontWeight={600} fontSize="14px">Mỗi phòng có:</Typography>
                                                        <Box display="flex" flexDirection="row" my={1}>
                                                            <Typography mr="10px" fontSize="14px">Giường: </Typography>
                                                            <Box display="flex" flexDirection="row" >
                                                                {room.Beds.length > 0 && room.Beds.map((bed, key) => {
                                                                    return (
                                                                        <Typography mr="5px" fontSize="14px" key={key} >{bed.quantity} {bed.bedName},</Typography>
                                                                    )
                                                                })}
                                                            </Box>
                                                        </Box>
                                                        <Typography fontWeight={600} fontSize="14px" pb={1}>Dịch vụ phòng</Typography>
                                                        <Box display="flex" justifyContent="start" alignItems="center" pb={2} flexWrap="wrap" gap={1}>
                                                            {room.services.length > 0 && room.services.map((service, key) => (
                                                                <Box display="flex" flexDirection="row" alignItems="center" key={key} >
                                                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                                    <Typography fontSize="14px" color="#000" ml="3px">{service}</Typography>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start" pb={1}>
                                                            <AvTimerIcon sx={{ color: "red", fontSize: "16px", mr: "5px" }} />
                                                            <Typography color="red" fontSize="14px" >Chỉ còn {room.quantityAvailable} phòng trên trang của chúng tôi</Typography>

                                                        </Box>

                                                    </Box>
                                                    <Box flex={1} p={2}>
                                                        <Typography fontWeight={600}>
                                                            {(room.price * room.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </Box>

                                    <Box flex={1} display="flex" justifyContent="flex-start" flexDirection="column" alignItems="flex-start" p={2}>
                                        <Typography fontSize="12px" color="#666" mb={1}> 1 đêm, {adultFilter} người lớn, {childrenFilter !== 0 ? childrenFilter : ""} {childrenFilter !== 0 ? "Trẻ em" : ""} </Typography>
                                        <Typography fontWeight={600} mb={2}>
                                            {totalPriceSuggest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
                                        </Typography>
                                        <Button variant='contained' sx={{ fontWeight: "600", alignSelf: "center", width: "100%" }} onClick={() => handleChooseSuggest(roomsSuggest)}>
                                            Đặt các lựa chọn của bạn
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            :
                            <Box width="100%" sx={{ backgroundColor: "#FFF" }} pb="30px">
                                <Box m="0px 30px">
                                    <Typography fontWeight="600" color="red" fontSize="18px" padding="25px 0">
                                        Hiện tại, hệ thống chưa tìm được gợi ý nào phù hợp với yêu cầu của quý khách
                                    </Typography>
                                </Box>
                            </Box>
                        }
                        <Box width="100%" sx={{ backgroundColor: "#FFF" }} pb="30px">
                            <Box width="60%" mx="30px" mt="30px" pb="30px">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Phòng trống
                                </Typography>
                                <SearchBar component='HotelItem' display handleChangeData={handleChangeData} destinations='fake-destination' onSearch={handleCheckRoomAvailable} />
                            </Box>
                            <Box mx="30px">
                                <Typography fontWeight="600" pb={2}>Tất cả các phòng còn trống</Typography>
                                <Box display="flex" flexDirection="row" border="1px solid #5BBAFF">
                                    <Box flex={2} borderRight="1px solid #5BBAFF" >
                                        <Box height="60px" bgcolor="#18458B" sx={{ opacity: "0.7" }} display="flex" justifyContent="center" color="white" alignItems="center" fontWeight={600}>
                                            Loại phòng
                                        </Box>

                                    </Box>
                                    <Box flex={1} borderRight="1px solid #5BBAFF" >
                                        <Box height="60px" bgcolor="#18458B" sx={{ opacity: "0.7" }} display="flex" justifyContent="center" color="white" alignItems="center" fontWeight={600}>
                                            Số lượng khách
                                        </Box>

                                    </Box>
                                    <Box flex={1.5} borderRight="1px solid #5BBAFF" >
                                        <Box height="60px" bgcolor="#18458B" display="flex" justifyContent="center" color="white" alignItems="center" fontWeight={600}>
                                            Giá phòng
                                        </Box>

                                    </Box>
                                    <Box flex={1} borderRight="1px solid #5BBAFF" >
                                        <Box height="60px" bgcolor="#18458B" sx={{ opacity: "0.7" }} display="flex" justifyContent="center" color="white" alignItems="center" fontWeight={600}>
                                            Chọn phòng
                                        </Box>

                                    </Box>
                                    <Box flex={1.5} >
                                        <Box height="60px" bgcolor="#18458B" sx={{ opacity: "0.7" }} display="flex" justifyContent="center" color="white" alignItems="center" fontWeight={600}>

                                        </Box>

                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="row" border="1px solid #5BBAFF" borderTop="none">
                                    <Box flex={5.5} display="flex" flexDirection="column">
                                        {rooms.length > 0 && rooms.map((room, key) => {
                                            return (
                                                <Box display="flex" borderTop="1px solid #5BBAFF" flexDirection={'row'} key={key}>
                                                    <Box flex={2} borderRight="1px solid #5BBAFF" >
                                                        <Box display="flex" justifyContent="start" alignItems="start" m={2} flexDirection='column' >
                                                            <Box display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="4px">
                                                                <Image src={room.image} alt="room-image" style={{ width: "100%", objectFit: "contain", marginBottom: "20px" }} />
                                                            </Box>
                                                            <Typography color="#0083EB" fontWeight="600" mb={1}>{room.roomType}</Typography>
                                                            <Box display="flex" flexDirection="row" >
                                                                {room.Beds.length > 0 && room.Beds.map((bed, key) => {
                                                                    return (
                                                                        <Typography mr="5px" fontSize="14px" key={key}>{bed.quantity} {bed.bedName},</Typography>
                                                                    )
                                                                })}
                                                            </Box>
                                                            <Typography fontWeight={600} fontSize="14px" my={1}>Dịch vụ phòng</Typography>
                                                            <Box display="flex" justifyContent="start" alignItems="center" pb={2} flexWrap="wrap" gap={1}>
                                                                {room.services.length > 0 && room.services.map((service, key) => (
                                                                    <Box display="flex" flexDirection="row" alignItems="center" key={key} >
                                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                                        <Typography fontSize="14px" color="#000" ml="3px">{service}</Typography>
                                                                    </Box>
                                                                ))}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Box flex={1} borderRight="1px solid #5BBAFF" >
                                                        <Box display="flex" justifyContent="center" alignItems="center" m={2} >
                                                            <PersonIcon sx={{ fontSize: "25px" }} />
                                                            <Typography color="#18458B">x {room.maxPeople}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box flex={1.5} borderRight="1px solid #5BBAFF" >
                                                        <Box display="flex" justifyContent="center" alignItems="start" m={2} fontWeight="700" >
                                                            {room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
                                                        </Box>
                                                    </Box>
                                                    <Box flex={1} borderRight="1px solid #5BBAFF" >
                                                        <Box display="flex" justifyContent="center" alignItems="start" m={2} >
                                                            <FormControl>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={room.quantityChoose}
                                                                    onChange={(event) => handleChange(event, room)}
                                                                    renderValue={() => room.quantityChoose}
                                                                    displayEmpty
                                                                    sx={{ height: "50px", width: "70px" }}
                                                                    MenuProps={{
                                                                        disableScrollLock: true,
                                                                    }}
                                                                >
                                                                    {Array.from({ length: room.quantityAvailable + 1 }, (_, num) => (
                                                                        <MenuItem key={num} value={num}>
                                                                            {num}{num > 0 ? ` : ${(num * room.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND` : ""}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </Box>

                                    <Box flex={1.5} borderTop="1px solid #5BBAFF" bgcolor={rooms.reduce((total, room) => (total + room.quantityChoose), 0) > 0 ? "#ebf3ff" : "#FFF"}>
                                        <Box display="flex" justifyContent="center" alignItems="start" m={2} flexDirection="column" gap={3}>

                                            {rooms.reduce((total, room) => (total + room.quantityChoose), 0) > 0 && <Box display="flex" flexDirection="column" gap={2}>
                                                <Typography fontWeight={600}>
                                                    Giá tổng  {rooms.reduce((total, room) => total + room.quantityChoose, 0)} phòng
                                                </Typography>
                                                <Typography fontWeight={600} color="#18458B" >
                                                    {rooms.reduce((total, room) => total + room.price * room.quantityChoose, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
                                                </Typography>
                                            </Box>
                                            }

                                            <Button variant='contained' sx={{ fontWeight: "600", alignSelf: "center", width: "100%", "&:hover": { cursor: cursor } }} onClick={handleBooking} >
                                                Tôi sẽ đặt
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box bgcolor="white" mt="30px" borderRadius="5px" pb="30px">
                            <Box m="0px 30px" borderBottom="#EEE 1px solid" display="flex" flexDirection="row" gap={1}>
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Nhận xét từ người dùng
                                </Typography>
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    -
                                </Typography>
                                <Typography fontWeight="600" color="#3AACED" fontSize="18px" padding="25px 0">
                                    10
                                </Typography>
                            </Box>
                            <Box m="30px" display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                                <Box borderBottom="#EEE 1px solid" width="100%" paddingBottom="25px" flexDirection="row" gap={1} display="flex">
                                    <Box display="flex" flex={1} flexDirection="column" justifyContent="center"  >
                                        <Box sx={{ display: "flex", flexDirection: "column", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 0px 10px", height: "130px", backgroundColor: "#18458B", width: "160px", alignItems: "center", justifyContent: "center" }} >
                                            <Typography sx={{ fontSize: "34px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                            <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "600", mt: "5px" }}>Tốt</Typography>
                                        </Box>
                                        <Box width="160px" m="15px 5px">
                                            <Button variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} >Nhận xét</Button>
                                        </Box>
                                    </Box>
                                    <Box flex={2.8}>
                                        <Box sx={{ display: "flex", flexDirection: "column", mt: "5px" }}>
                                            <Typography sx={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>Vệ sinh</Typography>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
                                                <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} marks step={0.1} sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                                                <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px" }}>4.5</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", mt: "5px" }}>
                                            <Typography sx={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>Độ thoải mái</Typography>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
                                                <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} marks step={0.1} sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                                                <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px" }}>4.5</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", mt: "5px" }}>
                                            <Typography sx={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>Thái độ nhân viên</Typography>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
                                                <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} marks step={0.1} sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                                                <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px" }}>4.5</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", mt: "5px" }}>
                                            <Typography sx={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>Cơ sở vật chất</Typography>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
                                                <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} marks step={0.1} sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                                                <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px" }}>4.5</Typography>
                                            </Box>
                                        </Box>


                                    </Box>
                                </Box>
                                <Box borderBottom="#CCC 1px dashed">
                                    <Box display="flex" flexDirection="row" m="30px 0px" width="100%" padding="20px 0px" bgcolor="#ECF6F8" borderRadius="10px">
                                        <Box flex={1} display="flex" flexDirection="column" justifyContent="start" alignItems="center" gap={2}>
                                            <Avatar sx={{ width: "80px", height: "80px", m: "5px" }} />
                                            <Typography sx={{ fontSize: "18px", color: "#333", fontWeight: "600", }}>Thu Ha</Typography>
                                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", }}>11/01/2024</Typography>
                                        </Box>
                                        <Box flex={3} display="flex" flexDirection="column" >
                                            <Box display="flex" flexDirection="row" alignItems="start" justifyContent="space-between">
                                                <Box>
                                                    <Typography sx={{ fontSize: "14px", color: "#878CB8", mt: "5px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere convallis purus non cursus. Cras metus neque, gravida sodales massa ut. </Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="end">
                                                    <Box sx={{ display: "flex", flexDirection: "column", margin: "5px 30px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "60px", backgroundColor: "#18458B", width: "60px", alignItems: "center", justifyContent: "center" }} >
                                                        <Typography sx={{ fontSize: "18px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                        <Typography sx={{ fontSize: "12px", color: "white", fontWeight: "600", mt: "5px" }}>Tốt</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box display="flex" justifyContent="start" alignItems="center" mt="20px">
                                                <Box width="200px" overflow="hidden" borderRadius="10px" >
                                                    <Image src="https://static.vecteezy.com/system/resources/previews/023/506/852/non_2x/cute-kawaii-mushroom-chibi-mascot-cartoon-style-vector.jpg" alt="image-comment" />
                                                </Box>
                                            </Box>

                                        </Box>
                                    </Box>
                                </Box>

                                <Box borderBottom="#CCC 1px dashed">
                                    <Box display="flex" flexDirection="row" m="30px 0px" width="100%" padding="20px 0px" bgcolor="#ECF6F8" borderRadius="10px">
                                        <Box flex={1} display="flex" flexDirection="column" justifyContent="start" alignItems="center" gap={2}>
                                            <Avatar sx={{ width: "80px", height: "80px", m: "5px" }} />
                                            <Typography sx={{ fontSize: "18px", color: "#333", fontWeight: "600", }}>Thu Hà</Typography>
                                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", }}>27/06/2024</Typography>
                                        </Box>
                                        <Box flex={3} display="flex" flexDirection="column" >
                                            <Box display="flex" flexDirection="row" alignItems="start" justifyContent="space-between">
                                                <Box>
                                                    <Typography sx={{ fontSize: "14px", color: "#878CB8", mt: "5px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere convallis purus non cursus. Cras metus neque, gravida sodales massa ut. </Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="end">
                                                    <Box sx={{ display: "flex", flexDirection: "column", margin: "5px 30px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "60px", backgroundColor: "#18458B", width: "60px", alignItems: "center", justifyContent: "center" }} >
                                                        <Typography sx={{ fontSize: "18px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                        <Typography sx={{ fontSize: "12px", color: "white", fontWeight: "600", mt: "5px" }}>Tốt</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box display="flex" justifyContent="start" alignItems="center" mt="20px">
                                                <Box width="200px" overflow="hidden" borderRadius="10px" >
                                                    <Image src="https://static.vecteezy.com/system/resources/previews/023/506/852/non_2x/cute-kawaii-mushroom-chibi-mascot-cartoon-style-vector.jpg" alt="image-comment" />
                                                </Box>
                                            </Box>

                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                    </Box >
                </Box >
            </Box >
            <Loading loading={load} />
            <Footer />
        </Box >

    )
}