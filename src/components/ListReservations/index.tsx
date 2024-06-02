import BoyIcon from '@mui/icons-material/Boy';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HouseIcon from '@mui/icons-material/House';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import KingBedIcon from '@mui/icons-material/KingBed';
import PaidIcon from '@mui/icons-material/Paid';
import RoomIcon from '@mui/icons-material/Room';
import TodayIcon from '@mui/icons-material/Today';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import styled from 'styled-components';
import Header2 from '../Header';
import Navbar2 from '../Navbar';
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
    const value = 4
    return (
        <Box>
            <Navbar2 />
            <Header2 />
            <Box width="100%" mt="150px" p={0} bgcolor="#ECF6F8">
                <Box width="92%" maxWidth="1224px" m="30px auto" display="flex" gap={3} flexDirection="column"  >
                    <Typography fontSize="20px" fontWeight="600" color="#958DA0" mt="30px">Danh sách phòng đã đặt</Typography>
                    <Box width="100%" m="10px auto">
                        <Grid container gap={5} maxWidth="1224px">
                            <Grid item xs={12}>
                                <Box border="1px solid #DDD" borderRadius="10px" display="flex" alignItems="start" justifyContent="space-between" bgcolor="#FFF" height="100%">
                                    <Box flex={1.5} overflow="hidden" borderRadius="10px" margin="auto 15px" borderRight="1px solid #DDD" display="flex" alignItems="center" justifyContent="center">
                                        <Image src="http://res.cloudinary.com/di7a7sbbn/image/upload/v1668414040/upload/prirsonreuc6vkcjmxfi.jpg" />
                                    </Box>
                                    <Box flex={2} border="1px dashed #DDD" borderTop="none" borderBottom="none" height="100%">
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <HouseIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="15px" >Thu Hà Hotel</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <RoomIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="15px" >Tạ Quang Bửu - Hai Bà Trưng - Hà Nội</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <KingBedIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="15px" >Phòng đơn</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <DoorBackIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Box bgcolor="#3AACED" borderRadius="5px" padding="2px 8px" ml="15px">
                                                <Typography color="#FFF" fontSize="18px" fontWeight="600" >301</Typography>
                                            </Box>
                                            <Box bgcolor="#3AACED" borderRadius="5px" padding="2px 8px" ml="15px">
                                                <Typography color="#FFF" fontSize="18px" fontWeight="600" >302</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <PaidIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="15px" >300.000 VND</Typography>
                                        </Box>

                                    </Box>
                                    <Box flex={2}>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                <BoyIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                <Typography color="#999" fontSize="18px" ml="20px" >Người lớn: 4</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="start" ml="30px" alignItems="center">
                                                <ChildCareIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                <Typography color="#999" fontSize="18px" ml="20px" >Trẻ em : 2</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <TodayIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="20px" >Ngày nhận phòng: 02/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <InsertInvitationIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="20px" >Ngày trả phòng: 03/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <EditCalendarIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="20px" >Ngày đặt phòng: 03/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <PaidIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Box bgcolor="orange" borderRadius="5px" padding="4px 8px" ml="20px">
                                                <Typography color="#FFF" fontSize="18px" fontWeight="600" >Thanh toán qua thẻ</Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box border="1px solid #DDD" borderRadius="10px" display="flex" alignItems="start" justifyContent="space-between" bgcolor="#FFF" height="100%">
                                    <Box flex={1.5} overflow="hidden" borderRadius="10px" margin="auto 15px" borderRight="1px solid #DDD" display="flex" alignItems="center" justifyContent="center">
                                        <Image src="http://res.cloudinary.com/di7a7sbbn/image/upload/v1668414040/upload/prirsonreuc6vkcjmxfi.jpg" />
                                    </Box>
                                    <Box flex={2} border="1px dashed #DDD" borderTop="none" borderBottom="none" height="100%">
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <HouseIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="15px" >Thu Hà Hotel</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <RoomIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="15px" >Tạ Quang Bửu - Hai Bà Trưng - Hà Nội</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <KingBedIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="15px" >Phòng đơn</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <DoorBackIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Box bgcolor="#3AACED" borderRadius="5px" padding="2px 8px" ml="15px">
                                                <Typography color="#FFF" fontSize="18px" fontWeight="600" >301</Typography>
                                            </Box>
                                            <Box bgcolor="#3AACED" borderRadius="5px" padding="2px 8px" ml="15px">
                                                <Typography color="#FFF" fontSize="18px" fontWeight="600" >302</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <PaidIcon sx={{ color: "#F9B90F", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="15px" >300.000 VND</Typography>
                                        </Box>

                                    </Box>
                                    <Box flex={2}>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                <BoyIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                <Typography color="#999" fontSize="18px" ml="20px" >Người lớn: 4</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="start" ml="30px" alignItems="center">
                                                <ChildCareIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                                <Typography color="#999" fontSize="18px" ml="20px" >Trẻ em : 2</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <TodayIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="20px" >Ngày nhận phòng: 02/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <InsertInvitationIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="20px" >Ngày trả phòng: 03/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <EditCalendarIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Typography color="#999" fontSize="18px" ml="20px" >Ngày đặt phòng: 03/04/2024</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="start" m="20px" alignItems="center">
                                            <PaidIcon sx={{ color: "#3AACED", fontSize: "30px" }} />
                                            <Box bgcolor="#BB86FC" borderRadius="5px" padding="4px 8px" ml="20px">
                                                <Typography color="#FFF" fontSize="18px" fontWeight="600" >Thanh toán khi trả phòng</Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>

                </Box>

            </Box>

        </Box>
    )
}