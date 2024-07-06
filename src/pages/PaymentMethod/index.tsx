import { Box, Button, Input, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/NavbarComponent";
import Header from "../../components/Header/HeaderComponent";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoneyIcon from '@mui/icons-material/Money';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getToken } from "../../services/token";
import axios from 'axios';
import { checkout } from "../../services/checkout";
import { loadStripe } from '@stripe/stripe-js';
import FooterComponent from "../../components/Footer/FooterComponent";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

export default function PaymentMethod() {
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split('/')[2];
    const state = location.state;
    useEffect(() => {
        if (!state) {
            navigate('/')
        }
    }, [])

    const { name, phoneNumber, address, note, option, hotel, room, email } = state || { name: '', phoneNumber: '', address: '', note: '', option: {}, hotel: {}, room: [], email: '' }
    const roomChoose = room.filter(Room => Room.quantityChoose > 0)
    const startDate = option.startDate
    const endDate = option.endDate
    const [value, setValue] = useState('after');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const calTotalPrice = () => {
        let total = roomChoose.reduce((total, room) => total + room.price * room.quantityChoose, 0)
        return total;
    }
    const handlePayment = async () => {
        const token = getToken();
        try {
            const Response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/form/createForm`, {
                name,
                hotelId: id,
                email,
                phoneNumber,
                address,
                note,
                cost: calTotalPrice(),
                adults: option.adult,
                chldren: option.chldren,
                rooms: roomChoose,
                startDate,
                endDate,
                paymentStatus: 'Thanh toán khi trả phòng'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })

            toast.success('Đặt phòng thành công!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                // onClose: () => navigate('/payment-success/')
                onClose: () => navigate('/reservations')
            });
        } catch (err) {
            console.log(err);
        }
    };

    
    const handleReserve = async () => {
        try {
            const token = getToken();
    
          // Redirect to Stripe
          const lineItems: any = [];
          lineItems.push({
            price: "price_1PW1E2P3mxqok9yXzYvQvJ1L",
            quantity: 1,
          }),
            checkout({
              lineItems
            });
    
          toast.success('Chuyển hướng sang thanh toán', );

          const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/form/createForm`, {
                name,
                hotelId: id,
                email,
                phoneNumber,
                address,
                note,
                cost: calTotalPrice(),
                adults: option.adult,
                children: option.children,
                rooms: roomChoose,
                startDate,
                endDate,
                paymentStatus: 'Thanh toán qua thẻ',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            
        } catch (err) {
          console.log('Có xảy ra lỗi', err);
        }
      };
    

    return (
        <Box>
            <Navbar />
            <Header />
            <Box marginTop="150px" height="100vh" >
                <Box width="92%" maxWidth="1224px" m="0 auto" >
                    <Box display="flex" flexDirection="row" justifyContent="start" gap={2} pb="20px" borderBottom="1px #EEE solid" border="none" >
                        <Typography fontSize="20px" fontWeight="600" color="#888FA9">Thông tin đặt phòng</Typography>
                    </Box>
                    <Box display="flex" gap={3}>
                        <Box flex={2} bgcolor="#F7F9FB" border="1px #EEE solid" borderRadius="5px" height="">
                            <Box m="20px 30px"  >
                                <Box paddingBottom="20px" paddingTop="10px" border="1px solid #DDD" borderTop="none" borderLeft="none" borderRight="none">
                                    <Typography fontSize="20px" fontWeight="600" color="#183C7D">Chọn phương thức thanh toán</Typography>
                                </Box>
                                <Box display="flex" flexDirection="column" gap={4} >
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={value}
                                            onChange={handleChange}

                                        >
                                            <Box sx={{ display: "flex", gap: "3" }} mt="30px" pb="30px" borderBottom="1px #DDD dashed">
                                                <FormControlLabel value="after" control={<Radio />} label="Thanh toán khi trả phòng" sx={{ minWidth: "250px" }} />
                                                <MoneyIcon sx={{ color: "#F9B90F", fontSize: "50px", ml: "30px" }} />
                                            </Box>
                                            <Box sx={{ display: "flex", gap: "3" }} mt="30px" pb="30px" borderBottom="1px #DDD solid" flexDirection="row" justifyContent="flex-start" alignItems="center">
                                                <FormControlLabel value="before" control={<Radio />} label="Thanh toán qua thẻ" sx={{ minWidth: "250px" }} />
                                                < AccountBalanceIcon sx={{ color: "#336699", fontSize: "50px", ml: "30px" }} />
                                            </Box>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box mt="30px" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" pb="10px">
                                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" bgcolor="#F1C40F" padding="0 20px" borderRadius="5px" onClick={() => navigate(-1)}>
                                        <KeyboardReturnIcon sx={{ color: "white" }} />
                                        <Button variant="contained" sx={{ bgcolor: "#F1C40F", boxShadow: "none", fontWeight: "600", "&:hover": { opacity: "0.8", bgcolor: "#F1C40F", boxShadow: "none", fontWeight: "600" } }}>Quay lại</Button>
                                    </Box>

                                    {/* Redirect Stripe */}
                                    <Button variant="contained" sx={{ boxShadow: "none", fontWeight: "600", "&:hover": { fontWeight: "600", boxShadow: "none" } }} onClick={()=>{value === "after" ? handlePayment(): handleReserve() } }>Thanh toán</Button>
                                    {/* <ToastContainer /> */}
                                    
                                </Box>
                            </Box>
                        </Box>
                        <Box flex="1" width="350px" >
                            <Box bgcolor="#F5F7EC" borderRadius="5px" p="10px 0" border="1px #EEE solid" >
                                <Box m="20px 30px">
                                    <Box paddingBottom="20px" border="1px solid #DDD" borderTop="none" borderLeft="none" borderRight="none" >
                                        <Typography fontSize="16px" fontWeight="600" color="#183C7D">Thông tin phòng</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="start" alignItems="start" flexDirection="row" mt="20px" pb="15px" gap={2} borderBottom="1px solid #DDD">
                                        <Box flex={1}>
                                            <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/12/10.jpg" alt="image-hotel" width="100px" style={{ borderRadius: "5px", objectFit: "cover" }} height="70px" />
                                        </Box>
                                        <Box display="flex" flexDirection="column" flex={2}>
                                            <Typography fontSize="13px" mb="10px" >{hotel.hotelName}</Typography>
                                            <Box display="flex" justifyContent="start" alignItems="start" flexDirection="row">
                                                <LocationOnOutlinedIcon sx={{ fontSize: "13px", mr: "10px", color: "#F9B90F", mt: "2px" }} />
                                                <Typography fontSize="12px" color="#999">{hotel.address}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt="20px" sx={{ flexWrap: "wrap" }}>
                                        <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2}>
                                            <Typography fontSize="13px" color="#878C9F" minWidth="64px" >Người lớn: </Typography>
                                            <Typography fontSize="13px" color="black" mr="10px">{option.adult}</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2}>
                                            <Typography fontSize="13px" color="#878C9F" >Trẻ em: </Typography>
                                            <Typography fontSize="13px" color="black" mr="10px">{option.children}</Typography>
                                        </Box>

                                        <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2} >
                                            <Typography fontSize="13px" color="#878C9F" >Phòng: </Typography>
                                            <Typography fontSize="13px" color="black" >{option.room}</Typography>
                                        </Box>
                                    </Box>

                                    <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" mt="20px" sx={{ flexWrap: "wrap" }}>
                                        <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2}>
                                            <Typography fontSize="13px" color="#878C9F" minWidth="64px">Ngày nhận phòng: </Typography>
                                            <Typography fontSize="13px" color="black" mr="10px">{option.startDate}</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" mt="20px" sx={{ flexWrap: "wrap" }}>
                                        <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2}>
                                            <Typography fontSize="13px" color="#878C9F" minWidth="64px" >Ngày trả phòng: </Typography>
                                            <Typography fontSize="13px" color="black" mr="10px">{option.endDate}</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="row" flex={1} mt="20px" sx={{ flexWrap: "wrap" }} borderBottom="1px solid #DDD" pb="20px">
                                        <Box display="flex" flexDirection="column" gap={2} flex={1} >
                                            <Typography fontSize="13px" color="#878C9F" minWidth="64px" >Danh sách phòng đặt: </Typography>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mx={3}>
                                                <Typography fontSize="12px" color="#878C9F">Phòng</Typography>
                                                <Typography fontSize="12px" color="#878C9F">Giá phòng</Typography>
                                            </Box>
                                            {roomChoose.map((room, key) => {
                                                return (
                                                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mx={3} key={key}>
                                                        <Box bgcolor="orange" borderRadius="5px" padding="2px 8px" >
                                                            <Typography color="#FFF" fontSize="13px" fontWeight="600" >{room.quantityChoose} x {room.roomType}</Typography>
                                                        </Box>
                                                        <Typography fontSize="12px" color="#878C9F">{calTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}VND</Typography>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                    <Box mt="30px" display="flex" justifyContent="space-between" alignItems="center" >
                                        <Typography fontSize="16px" fontWeight="600" color="#878C9F">Tổng thanh toán</Typography>
                                        <Typography color="#3AACED" fontWeight="600" fontSize="19px"> {roomChoose.reduce((total, room) => total + room.price * room.quantityChoose, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box bgcolor="#ECF6F8" mt="50px" borderRadius="5px" p="10px 0" border="1px #EEE solid">
                                <Box m="20px 30px">
                                    <Box paddingBottom="20px" border="1px solid #DDD" borderTop="none" borderLeft="none" borderRight="none" >
                                        <Typography fontSize="16px" fontWeight="600" color="#183C7D"> Thời gian: Nhận phòng - Trả phòng</Typography>
                                    </Box>
                                    <Box borderBottom="1px solid #EEEEEE"  >
                                        <Box padding="20px 0" display="flex" justifyContent="start" alignItems="center" >
                                            <Typography fontSize="14px" fontWeight="600" color="#878C9F" minWidth="116px">Giờ nhận phòng:</Typography>
                                            <Typography color="#5ECFB3" fontWeight="600" fontSize="14px" ml="10px"> 12 giờ trưa ngày nhận phòng </Typography>
                                        </Box>
                                        <Box padding="10px 0" display="flex" justifyContent="start" alignItems="center" >
                                            <Typography fontSize="14px" fontWeight="600" color="#878C9F" minWidth="116px">Giờ trả phòng:</Typography>
                                            <Typography color="#5ECFB3" fontWeight="600" fontSize="14px" ml="10px">10h sáng ngày trả phòng</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <FooterComponent/>
        </Box>
    )
}