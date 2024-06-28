import BoyIcon from '@mui/icons-material/Boy';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import PaidIcon from '@mui/icons-material/Paid';
import RoomIcon from '@mui/icons-material/Room';
import TodayIcon from '@mui/icons-material/Today';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/HeaderComponent';
import Navbar from '../../components/Navbar/NavbarComponent';
import { Form } from '../../models/Form';
import { getToken } from '../../services/token';
import { Button } from '@mui/material';
import CommentComponent from '../../components/Comment/CommentComponent';
import { FooterComponent } from '../../components';
const Image = styled.img`
    width: 100%;
    objectFit: cover;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    &:hover{
        transform: scale(1.1);
        cursor: pointer;
},`


export default function ReservationsPage() {
    const [forms, setForms] = useState<Form[]>([]);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const token = getToken();
        const getForms = async () => {
            try {
                const forms = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/form/getAllFormByUser`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setForms(forms.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getForms();
    }, [])

    return (
        <Box>
            <Navbar />
            <Header />
            <Box width="100%" mt="150px" p={0}>
                <Box width="92%" maxWidth="1224px" m="30px auto" display="flex" gap={3} flexDirection="column"  >
                    {forms.length > 0 && <Typography fontSize="20px" fontWeight="600" color="#18458B" mt="30px">Danh sách phòng đã đặt</Typography>}
                    <Box width="100%" m="10px auto">
                        <Grid container gap={5} maxWidth="1224px">
                            {forms.length > 0 && forms.map((form, key) => {
                                return (
                                    <Grid item xs={12} key={key}>
                                        <Box border="1px solid #A3D7FC" borderRadius="10px" display="flex" alignItems="start" justifyContent="space-between" bgcolor="#FFF" height="100%">
                                            <Box flex={1.5} overflow="hidden" borderRadius="10px" margin="auto 15px" borderRight="1px solid #DDD" display="flex" alignItems="center" justifyContent="center">
                                                <Image src={form.hotel.images[0]} />
                                            </Box>
                                            <Box flex={2} border="1px dashed #DDD" borderTop="none" borderBottom="none" height="100%">
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <HouseIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                                    <Typography color="#999" fontSize="18px" ml="15px" >{form.hotel.hotelName}</Typography>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <PersonIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                                    <Typography color="#999" fontSize="18px" ml="15px">{form.name}</Typography>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <RoomIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                                    <Typography color="#999" fontSize="18px" ml="15px">{form.address}</Typography>
                                                </Box>

                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="start">
                                                    <DoorBackIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />

                                                    <Box borderRadius="5px" ml="15px">
                                                        {form.Rooms.map(room => {
                                                            return (
                                                                <Typography color="#999" fontSize="18px" mb={form.Rooms.length > 1 ? "10px" : "0px"}>{room.quantity} x {room.roomName}</Typography>
                                                            )
                                                        })}
                                                    </Box>

                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <PaidIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                                    <Typography color="#999" fontSize="18px" ml="15px" >{form?.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</Typography>
                                                </Box>
                                            </Box>
                                            <Box flex={2}>
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                        <BoyIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                        <Typography color="#999" fontSize="18px" ml="20px" >Người lớn: {form.adults}</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" justifyContent="start" ml="30px" alignItems="center">
                                                        <ChildCareIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                        <Typography color="#999" fontSize="18px" ml="20px" >Trẻ em : {form.children}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <TodayIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                    <Typography color="#999" fontSize="18px" ml="20px" >Ngày nhận phòng: {(new Date(form.startDate)).toLocaleDateString('en-GB')}</Typography>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <InsertInvitationIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                    <Typography color="#999" fontSize="18px" ml="20px" >Ngày trả phòng: {(new Date(form.endDate)).toLocaleDateString('en-GB')}</Typography>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <EditCalendarIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                    <Typography color="#999" fontSize="18px" ml="20px" >Ngày đặt phòng: {(new Date(form.updatedAt)).toLocaleString('en-GB')}</Typography>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                                    <PaidIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                    <Box bgcolor={form?.paymentStatus === "Thanh toán khi trả phòng" ? "#F1C40F" : "#3AACED"} borderRadius="5px" padding="4px 8px" ml="20px">
                                                        <Typography color="#FFF" fontSize="18px" fontWeight="600" >{form?.paymentStatus}</Typography>
                                                    </Box>
                                                </Box>

                                                <Box display="flex" flexDirection="row" justifyContent="end" m="20px" alignItems="center">
                                                    <Button variant='outlined' sx={{ bgcolor: "", fontWeight: "600" }} onClick={() => {
                                                        setOpenModal(true), console.log("aaaaaa");
                                                    }}> Đánh giá tại đây</Button>
                                                    <CommentComponent open={openModal} onClose={() => setOpenModal(false)} />
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })}

                            {forms.length === 0 &&
                                <Box display="flex" width="100%" m="0 auto" border="1px solid #CCC" borderRadius={"10px"} height="500px" flexDirection="column" gap={5} justifyContent={'center'} alignItems={'center'}>
                                    <Image src='https://cdn-icons-png.flaticon.com/512/5581/5581212.png' style={{ width:"200px", height:"200px"}}/>
                                    <Typography color="#18458B" fontSize="24px" fontWeight={600}>Hiện bạn đang chưa đặt phòng nào</Typography>
                                </Box>}
                        </Grid>

                    </Box>

                </Box>

            </Box>
            <FooterComponent />

        </Box>
    )
}