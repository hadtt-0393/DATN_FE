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

const images = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    }
]

function ImagesList() {
    return (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
        }}>
            {images.map((photo, index) => (
                <Box
                    sx={{
                        width: "33%"
                    }}
                    key={index}
                >
                    <img
                        src={photo.img}
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
    );
}

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


    const [startDateFilter, setStartDateFilter] = useState(currentDate.toLocaleDateString('en-US'));
    const [endDateFilter, setEndDateFilter] = useState((new Date(currentDate.getTime() + 86400000)).toLocaleDateString('en-US'));
    const [adultFilter, setAdultFilter] = useState(11);
    const [childrenFilter, setChildrenFilter] = useState(0);
    const [roomNumberFilter, setRoomNumberFilter] = useState(3);
    const [openDate, setOpenDate] = useState(false);
    const [room, setRoom] = useState('0: 0 VND');
    const [displayValue, setDisplayValue] = useState("0");

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const getAllRoomAvailable = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomAvailable/${id}?startDate=${start}&endDate=${end}`)
            setRooms(res.data)
        }
        getAllRoomAvailable();
    }, [])


    const handleChange = (event: SelectChangeEvent) => {
        const selectedRoom = event.target.value;
        const roomNumber = selectedRoom.split(':')[0].trim();
        setRoom(selectedRoom);
        setDisplayValue(roomNumber);
    };



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

    const [roomAvailable, setRoomAvailable] = useState<any>();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
        const getFilterRoomDefault = async () => {
            const Response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomFilter/${id}?startDate=${startDateFilter}&endDate=${endDateFilter}&adult=${adultFilter}&children=${childrenFilter}&roomNumber=${roomNumberFilter}`)
            setRoomAvailable(Response.data)
            setLoad(false);
        }
        getFilterRoomDefault()
    }, [])

    const handleCheckRoomAvailable = async () => {
        setLoad(true);
        const checkRoomAvailable = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/room/getAllRoomFilter/${id}?startDate=${startDateFilter}&endDate=${endDateFilter}&adult=${adultFilter}&children=${childrenFilter}&roomNumber=${roomNumberFilter}`)
        setRoomAvailable(checkRoomAvailable.data)
        setLoad(false);
    }

    const [roomChoose, setRoomChoose] = useState<any>([]);

    const handleChooseRoom = (event, roomIsChoose) => {
        if (event.target.checked) {
            setRoomChoose((prevRooms) => [...prevRooms, roomIsChoose]);
        }
        if (!event.target.checked) {
            setRoomChoose((prevRooms) => prevRooms.filter((room) => room.roomNumber !== roomIsChoose.roomNumber));
        }
    }

    const handleBooking = async () => {
        if (!user) {
            alert('Vui lòng đăng nhập để đặt phòng')
            navigate('/signin')
            return;
        }
        const token = getToken();
        try {
            const authUser = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/isLogin`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            navigate('/booking', {
                state: {
                    roomChoose: roomChoose,
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
            alert('Vui lòng đăng nhập để đặt phòng')
            navigate('/signin')
            return;
        }

    }

    const value = 4;
    const navigate = useNavigate()
    return (
        <Box>
            <Navbar />
            <Header />
            {data && (
                <Box sx={{ mt: "110px", height: "600px", width: "100%", position: "relative" }}>
                    <img src="http://res.cloudinary.com/di7a7sbbn/image/upload/v1668414040/upload/prirsonreuc6vkcjmxfi.jpg" alt="slider-image" style={{ width: "100%", height: "600px", objectFit: "cover" }} />
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
                            <Box sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }} alignSelf="end">
                                <Typography sx={{ fontSize: "14px", textTransform: "uppercase", color: "white", fontWeight: "600" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                                <Typography sx={{ fontSize: "24px", color: "#5ECFB1", fontWeight: "600", marginLeft: "20px" }}>{data.cheapestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}VND</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box >
            )}

            <Box bgcolor="#ECF6F8" >
                <Box width="92%" bgcolor="#ECF6F8" maxWidth="1224px" m="30px auto" display="flex" gap={5} padding="50px 0">
                    <Box flex="2" >
                        <ImagesList />
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
                                {data?.services && data?.services.map((item) => (
                                    <Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                        <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">{item}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Box bgcolor="white" mt="30px" borderRadius="5px" pb="30px">
                            <Box m="0px 30px">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Được giới thiệu cho {adultFilter} người lớn
                                </Typography>
                            </Box>
                            <Box m="0px 30px" display="flex" justifyContent="center" flexDirection="row" border="1px solid #DDD" borderRadius="2px" >
                                {/* {roomAvailable && roomAvailable.rooms.map((room) => {
                                    return (
                                        <Box borderBottom="#EEE 1px solid" width="100%" p="30px 0 0 0" display="flex" alignItems="start" justifyContent="space-between">
                                            <Box flex={2} margin="0 20px" display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="10px">
                                                <Image src={room.image} alt="room-image" style={{ width: "400px", objectFit: "contain" }} />
                                            </Box>
                                            <Box flex={3} display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" padding="0 15px" width="100%">
                                                <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                                                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" width="100%" height="65px" paddingBottom="15px" borderBottom="#CCC 1px dashed">
                                                        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%">
                                                            <Typography color="#334E6F" fontSize="19px" fontWeight="600" flex={1}>{room.type}</Typography>
                                                            <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" flex={1}>
                                                                <Typography color="#F9B90F" fontSize="13px" fontWeight="600" mr="5px">Số người tối đa:</Typography>
                                                                <Typography color="#3AACED" fontSize="13px" fontWeight="600">{room.maxPeople} người</Typography>
                                                            </Box>

                                                        </Box>
                                                        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%" >
                                                            <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center"  >
                                                                <Typography color="#73D1B6" fontSize="19px" fontWeight="600">{room.price}VND</Typography>
                                                                <Typography color="#999EA5" fontSize="14px" fontWeight="600">/Đêm</Typography>
                                                            </Box>
                                                            <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center">
                                                                <Typography color="#666" fontSize="14px" fontWeight="600" mr="10px">x{room.quantity} phòng</Typography>
                                                                <Box bgcolor="orange" borderRadius="5px" padding="2px 8px">
                                                                    <Typography color="#FFF" fontSize="14px" fontWeight="600">{room.roomNumber}</Typography>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Box width="100%" padding="20px 0" borderBottom="#CCC 1px dashed">
                                                        <Typography color="#888" fontSize="15px">phong dep</Typography>

                                                    </Box>
                                                    <Box borderBottom="#CCC 1px dashed" padding="20px 0" width="100%">

                                                        <Box display="flex" justifyContent="start" alignItems="center" flexWrap="wrap" gap={2}  >
                                                            <Typography color="#666" fontSize="15px" fontWeight="600"> Dịch vụ: </Typography>
                                                            {room.services.map((service) => {
                                                                return (
                                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">{service}</Typography>
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Box>
                                                    </Box>

                                                    <Box width="100%" m="20px 0px 20px 0px ">
                                                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flex: 1 }}>
                                                            <FormControlLabel control={
                                                                <Checkbox onChange={(e) => handleChooseRoom(e, {
                                                                    roomNumber: room.roomNumber,
                                                                    price: room.price
                                                                })} />
                                                            }
                                                                label="Chọn phòng" />
                                                        </Box>
                                                    </Box>

                                                </Box>

                                            </Box>
                                        </Box>
                                    )
                                })} */}

                                <Box flex={2.5} display="flex" flexDirection="column" borderRight="1px solid #DDD" borderRadius="2px" >
                                    <Box display="flex" flexDirection="row" borderBottom="1px solid #DDD">
                                        <Box flex={1.5} borderRight="1px solid #DDD" flexDirection="column" py={1} px={2} >
                                            <Typography fontSize="14px" my={1}>1 x Phòng cho 3 người</Typography>
                                            <Box display="flex" justifyContent="start" alignItems="center" pb={1}>
                                                <Typography fontSize="14px" mr="10px">Giá cho : </Typography>
                                                <Box display="flex" alignItems="center" >
                                                    <PersonIcon sx={{ fontSize: "20px" }} />
                                                    <Typography color="#18458B">x 3</Typography>
                                                </Box>
                                            </Box>
                                            <Typography fontWeight={600} fontSize="14px">Mỗi phòng có:</Typography>
                                            <Box display="flex" flexDirection="row" my={1}>
                                                <Typography mr="10px" fontSize="14px">Giường: </Typography>
                                                <Box display="flex" flexDirection="row" >
                                                    <Typography mr="5px" fontSize="14px" > 1 Giường đơn,</Typography>
                                                    <Typography fontSize="14px" >1 Giường đôi</Typography>
                                                </Box>
                                            </Box>
                                            <Typography fontWeight={600} fontSize="14px" pb={1}>Dịch vụ phòng</Typography>
                                            <Box display="flex" justifyContent="start" alignItems="center" pb={2} flexWrap="wrap" gap={1}>
                                                {data?.services && data?.services.map((item) => (
                                                    <Box display="flex" flexDirection="row" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#000" ml="3px">{item}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start" pb={1}>
                                                <AvTimerIcon sx={{ color: "red", fontSize: "16px", mr: "5px" }} />
                                                <Typography color="red" fontSize="14px" >Chỉ còn 3 phòng trên trang của chúng tôi</Typography>

                                            </Box>

                                        </Box>
                                        <Box flex={1} p={2}>
                                            <Typography fontWeight={600}>
                                                1.000.000 VND
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="row">
                                        <Box flex={1.5} borderRight="1px solid #DDD" flexDirection="column" py={1} px={2} >
                                            <Typography fontSize="14px" my={1}>1 x Phòng cho 3 người</Typography>
                                            <Box display="flex" justifyContent="start" alignItems="center" pb={1}>
                                                <Typography fontSize="14px" mr="10px">Giá cho : </Typography>
                                                <Box display="flex" alignItems="center" >
                                                    <PersonIcon sx={{ fontSize: "20px" }} />
                                                    <Typography color="#18458B">x 3</Typography>
                                                </Box>
                                            </Box>
                                            <Typography fontWeight={600} fontSize="14px">Mỗi phòng có:</Typography>
                                            <Box display="flex" flexDirection="row" my={1}>
                                                <Typography mr="10px" fontSize="14px">Giường: </Typography>
                                                <Box display="flex" flexDirection="row" >
                                                    <Typography mr="5px" fontSize="14px" > 1 Giường đơn,</Typography>
                                                    <Typography fontSize="14px" >1 Giường đôi</Typography>
                                                </Box>
                                            </Box>
                                            <Typography fontWeight={600} fontSize="14px" pb={1}>Dịch vụ phòng</Typography>
                                            <Box display="flex" justifyContent="start" alignItems="center" pb={2} flexWrap="wrap" gap={1}>
                                                {data?.services && data?.services.map((item) => (
                                                    <Box display="flex" flexDirection="row" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#000" ml="3px">{item}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start" pb={1}>
                                                <AvTimerIcon sx={{ color: "red", fontSize: "16px", mr: "5px" }} />
                                                <Typography color="red" fontSize="14px" >Chỉ còn 3 phòng trên trang của chúng tôi</Typography>

                                            </Box>

                                        </Box>
                                        <Box flex={1} p={2}>
                                            <Typography fontWeight={600}>
                                                1.000.000 VND
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box flex={1} display="flex" justifyContent="flex-start" flexDirection="column" alignItems="flex-start" p={2}>
                                    <Typography fontSize="12px" color="#666" mb={1}> 1 đêm, 10 người lớn, 2 trẻ em </Typography>
                                    <Typography fontWeight={600} mb={2}>
                                        1.000.000 VND
                                    </Typography>
                                    <Button variant='contained' sx={{ fontWeight: "600", alignSelf: "center", width: "100%" }}>
                                        Đặt các lựa chọn của bạn
                                    </Button>
                                </Box>
                            </Box>

                        </Box>
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
                                        {rooms.length > 0 && rooms.map(room => {
                                            return (
                                                <Box display="flex" borderTop="1px solid #5BBAFF" flexDirection={'row'}>
                                                    <Box flex={2} borderRight="1px solid #5BBAFF" >
                                                        <Box display="flex" justifyContent="start" alignItems="start" m={2} flexDirection='column' >
                                                            <Box display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="4px">
                                                                <Image src="https://cf2.bstatic.com/xdata/images/hotel/max1024x768/505672726.jpg?k=086af04426447cf784343fc4bad2ffec76dcf9a47cb16d14886a4a1907de9714&o=&hp=1" alt="room-image" style={{ width: "100%", objectFit: "contain", marginBottom: "20px" }} />
                                                            </Box>
                                                            <Typography color="#0083EB" fontWeight="600" mb={1}>{room.roomType}</Typography>
                                                            <Box display="flex" flexDirection="row" >
                                                                {room.Beds.length > 0 && room.Beds.map(bed => {
                                                                    return (
                                                                        <Typography mr="5px" fontSize="14px" >{bed.quantity} {bed.bedName},</Typography>
                                                                    )
                                                                })}
                                                            </Box>
                                                            <Typography fontWeight={600} fontSize="14px" my={1}>Dịch vụ phòng</Typography>
                                                            <Box display="flex" justifyContent="start" alignItems="center" pb={2} flexWrap="wrap" gap={1}>
                                                                {room.services.length > 0 && room.services.map((service) => (
                                                                    <Box display="flex" flexDirection="row" alignItems="center" >
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
                                                                    // value={room}
                                                                    onChange={handleChange}
                                                                    renderValue={() => displayValue}
                                                                    displayEmpty
                                                                    sx={{ height: "50px", width: "70px" }}
                                                                    MenuProps={{
                                                                        disableScrollLock: true,
                                                                    }}
                                                                >
                                                                    <MenuItem value="0: 0 VND" >0</MenuItem>
                                                                    <MenuItem value="1 : 499.000 VND">1 : 499.000 VND</MenuItem>
                                                                    <MenuItem value="2 : 989.000 VND">2 : 989.000 VND</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </Box>

                                    <Box flex={1.5} borderTop="1px solid #5BBAFF">
                                        <Box display="flex" justifyContent="center" alignItems="start" m={2} >
                                            <Button variant='contained' sx={{ fontWeight: "600", alignSelf: "center", width: "100%" }}>
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
                            </Box>

                        </Box>
                        <Box bgcolor="white" mt="30px" borderRadius="5px" pb="30px">
                            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Nhận xét của bạn
                                </Typography>
                            </Box>
                            <Box m="30px " display="flex" justifyContent="center" alignItems="center" gap={5} height="100%" borderBottom="#DDD 1px dashed" paddingBottom="20px">
                                <Box width="100%" flex={2} display="flex" gap={2} flexDirection="column"  >
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                                        <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px", whiteSpace: "nowrap", minWidth: "125px" }}>Vệ sinh</Typography>
                                        <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} step={1} marks sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                                        <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px", whiteSpace: "nowrap", minWidth: "125px" }}>Độ thoải mái</Typography>
                                        <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} step={1} marks sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                                        <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px", whiteSpace: "nowrap", minWidth: "125px" }}>Thái độ nhân viên</Typography>
                                        <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} step={1} marks sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                                        <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px", whiteSpace: "nowrap", minWidth: "125px" }}>Cơ sở vật chất</Typography>
                                        <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} step={1} marks sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                                    </Box>
                                </Box>
                                <Box display="flex" flex={1} height="150px">
                                    <Box bgcolor={"#f7f9fb"} height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" width="100%" border="#EEE 1px solid" borderRadius="10px">
                                        <Typography color="#3AACED" fontSize="25px" fontWeight="600">4.5</Typography>
                                        <Typography color="#66686B" fontSize="15px" fontWeight="600" mt="10px">Điểm của bạn</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box m="30px" sx={{ textAlign: "center" }} borderBottom="#DDD 1px dashed" pb="30px">
                                <TextField minRows={4} sx={{ width: "100%" }} placeholder="Nhập nhận xét của bạn" multiline />
                            </Box>
                            <Box sx={{ textAlign: "center" }} borderBottom="#DDD 1px dashed" pb="15px">
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ mb: 2, backgroundColor: "#3AACED", fontWeight: 600, fontSize: "14px", "&:hover": { backgroundColor: "#3AACED", opacity: "0.8" } }}
                                    size='large'

                                >
                                    Chọn ảnh
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Box width="200px" m="30px 0 0 0" >
                                    <Button variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", fontSize: "16px", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} >Gửi nhận xét</Button>
                                </Box>
                            </Box>

                        </Box>
                    </Box >
                    {/* <Box flex="1" width="350px" >
                        <Box bgcolor="white" borderRadius="5px" p="10px 0" >
                            <Box m="20px 30px">
                                <Box paddingBottom="20px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" >
                                    <Typography fontSize="16px" fontWeight="600" color="#183C7D">Đặt phòng khách sạn</Typography>
                                </Box>
                                <Box paddingBottom="20px"  mt="20px" >
                                    <FilterOption handleChangeData={handleChangeData} />
                                </Box>
                                {roomChoose.length > 0 &&
                                    <Box paddingBottom="20px" borderBottom="1px solid #EEEEEE" mt="20px" >
                                        <Box display="flex" flexDirection="column" gap={2} flex={1} >
                                            <Typography fontSize="13px" color="#878C9F" minWidth="64px" >Danh sách phòng đã chọn: </Typography>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mx={3}>
                                                <Typography fontSize="12px" color="#878C9F">Tên phòng</Typography>
                                                <Typography fontSize="12px" color="#878C9F">Giá phòng</Typography>
                                            </Box>
                                            {roomChoose.length > 0 && roomChoose.map((room: any) => {
                                                return (
                                                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mx={3}>
                                                        <Box bgcolor="orange" borderRadius="5px" padding="2px 8px" >
                                                            <Typography color="#FFF" fontSize="13px" fontWeight="600" >{room.roomNumber}</Typography>
                                                        </Box>
                                                        <Typography fontSize="12px" color="#878C9F">{room.price} VND</Typography>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                }
                                {roomChoose.length > 0 &&
                                    <Box padding="20px 0" display="flex" justifyContent="space-between" alignItems="center" >
                                        <Typography fontSize="14px" fontWeight="600" color="#878C9F">Tổng thanh toán</Typography>
                                        <Typography color="#3AACED" fontWeight="600" fontSize="19px">
                                            {roomChoose.reduce((total, room) => total + room.price, 0)} VND</Typography>
                                    </Box>
                                }
                                <Box display="flex">
                                    <Box flex="1"></Box>
                                    <Button onClick={handleCheckRoomAvailable} variant="contained" sx={{ backgroundColor: "#3AACED", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#3AACED" } }}  >Kiểm tra phòng hợp lệ</Button>

                                </Box>
                                <Box width="100%" m="30px 0px 20px 0px ">
                                    <Button variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} onClick={handleBooking}>Đặt phòng</Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box bgcolor="white" mt="50px" borderRadius="5px" p="10px 0">
                            <Box m="20px 30px">
                                <Box paddingBottom="20px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" >
                                    <Typography fontSize="16px" fontWeight="600" color="#183C7D"> Khoảng giá</Typography>
                                </Box>
                                <Box borderBottom="1px solid #EEEEEE"  >
                                    <Box padding="20px 0" display="flex" justifyContent="start" alignItems="center" >
                                        <Typography fontSize="14px" fontWeight="600" color="#878C9F">Giá:</Typography>
                                        <Typography color="#5ECFB3" fontWeight="600" fontSize="14px" ml="30px"> {data?.cheapestPrice} VND - {data?.highestPrice} VND</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box bgcolor="white" mt="50px" borderRadius="5px" p="10px 0">
                            <Box m="20px 30px">
                                <Box paddingBottom="20px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" >
                                    <Typography fontSize="16px" fontWeight="600" color="#183C7D"> Thời gian: Nhận phòng - Trả phòng</Typography>
                                </Box>
                                <Box borderBottom="1px solid #EEEEEE"  >
                                    <Box padding="20px 0" display="flex" justifyContent="start" alignItems="center" >
                                        <Typography fontSize="14px" fontWeight="600" color="#878C9F" minWidth="116px">Giờ nhận phòng:</Typography>
                                        <Typography color="#5ECFB3" fontWeight="600" fontSize="14px" ml="10px"> 12 giờ trưa ngày nhận phòng </Typography>
                                    </Box>
                                    <Box padding="20px 0" display="flex" justifyContent="start" alignItems="center" >
                                        <Typography fontSize="14px" fontWeight="600" color="#878C9F" minWidth="116px">Giờ trả phòng:</Typography>
                                        <Typography color="#5ECFB3" fontWeight="600" fontSize="14px" ml="10px">10h sáng ngày trả phòng</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box> */}
                </Box >
            </Box >
            <Loading loading={load} />
            <Footer />
        </Box >

    )
}