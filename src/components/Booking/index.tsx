import { Box, Button, Input, Typography } from "@mui/material";
import Navbar2 from "../Navbar2";
import Header2 from "../Header2";
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import TextField from "@mui/material//TextField";
import Checkbox from '@mui/material/Checkbox';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

export default function BookingPage() {
    return (
        <Box>
            <Navbar2 />
            <Header2 />
            <Box marginTop="150px" height="100vh" >
                <Box width="92%" maxWidth="1224px" m="0 auto" >
                    <Box display="flex" flexDirection="row" justifyContent="start" gap={2} pb="20px" borderBottom="1px #EEE solid" border="none" >
                        <Typography fontSize="20px" fontWeight="600" color="#888FA9">Đặt phòng tại: </Typography>
                        <Typography fontSize="20px" fontWeight="600" color="#3AACED">Thu Ha Hotel</Typography>
                    </Box>
                    <Box display="flex" gap={3}>
                        <Box flex={2} bgcolor="#F7F9FB" border="1px #EEE solid" borderRadius="5px" height="">
                            <Box m="20px 30px"  >
                                <Box paddingBottom="20px" paddingTop="10px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none">
                                    <Typography fontSize="20px" fontWeight="600" color="#183C7D">Thông tin đặt phòng</Typography>
                                </Box>
                                <Box display="flex" flexDirection="row" gap={4} >
                                    <Box flex={1}>
                                        <Typography fontSize="14px" color="#000" mb="10px" mt="20px">Họ tên</Typography>
                                        <Box display="flex" alignItems="center" border="#EEE solid 1px" height="45px" justifyContent="space-between" borderRadius="8px" bgcolor="#FFF">
                                            <Person2OutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                            <Input disableUnderline sx={{ fontSize: "13px", flex: "1" }} placeholder="Nguyễn Văn A" />
                                        </Box>
                                    </Box>
                                    <Box flex={1}>
                                        <Typography fontSize="14px" color="#000" mb="10px" mt="20px">Địa chỉ</Typography>
                                        <Box display="flex" alignItems="center" border="#EEE solid 1px" height="45px" justifyContent="space-between" borderRadius="8px" bgcolor="#FFF">
                                            <LocationOnOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                            <Input disableUnderline sx={{ fontSize: "13px", flex: "1" }} placeholder="Hà Nội" />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="row" gap={4} >
                                    <Box flex={1}>
                                        <Typography fontSize="14px" color="#000" mb="10px" mt="20px">Email</Typography>
                                        <Box display="flex" alignItems="center" border="#EEE solid 1px" height="45px" justifyContent="space-between" borderRadius="8px" bgcolor="#FFF">
                                            <MailOutlineOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                            <Input disableUnderline sx={{ fontSize: "13px", flex: "1" }} placeholder="nguyenvana@gmail.com" />
                                        </Box>
                                    </Box>
                                    <Box flex={1}>
                                        <Typography fontSize="14px" color="#000" mb="10px" mt="20px">Số điện thoại</Typography>
                                        <Box display="flex" alignItems="center" border="#EEE solid 1px" height="45px" justifyContent="space-between" borderRadius="8px" bgcolor="#FFF">
                                            <PhoneOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                            <Input disableUnderline sx={{ fontSize: "13px", flex: "1" }} placeholder="0987654321" />
                                        </Box>
                                    </Box>
                                </Box>
                                {/* <Box display="flex" alignItems="end" justifyContent="start" mt="10px" mb="10px">
                                    <Typography fontSize="14px" color="#000" mb="10px" mt="20px" mr="20px">Bạn đặt phòng để đi công tác?</Typography>
                                    <Checkbox />
                                </Box> */}
                                <Box>
                                    <Typography fontSize="14px" color="#000" mb="10px" mt="20px">Ghi chú</Typography>
                                    <Box sx={{ textAlign: "center" }} bgcolor="#FFF">
                                        <TextField minRows={4} sx={{ width: "100%" }} placeholder="Nhập ghi chú của bạn" multiline />
                                    </Box>

                                </Box>
                                <Box width="40%" m="30px auto">
                                    <Button variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }}>Thanh toán</Button>
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
                                            <Typography fontSize="13px" >Thu Ha Hotel</Typography>
                                            <Box display="flex" justifyContent="start" alignItems="center" flexDirection="row">
                                                <LocationOnOutlinedIcon sx={{ fontSize: "13px", mr: "10px", color: "#F9B90F" }} />
                                                <Typography fontSize="11px" color="#999">Hai Ba Trung, Ha Noi</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt="20px" sx={{ flexWrap: "wrap" }}>
                                        <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2}>
                                            <Typography fontSize="12px" color="#878C9F" >Người lớn: </Typography>
                                            <Typography fontSize="12px" color="black" mr="10px">1</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2}>
                                            <Typography fontSize="12px" color="#878C9F" >Trẻ em: </Typography>
                                            <Typography fontSize="12px" color="black" mr="10px">0</Typography>
                                        </Box>

                                        <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2} >
                                            <Typography fontSize="12px" color="#878C9F" >Phòng: </Typography>
                                            <Typography fontSize="12px" color="black" mr="10px">0</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box bgcolor="#ECF6F8" mt="50px" borderRadius="5px" p="10px 0" border="1px #EEE solid">
                                <Box m="20px 30px">
                                    <Box paddingBottom="20px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" >
                                        <Typography fontSize="16px" fontWeight="600" color="#183C7D"> Thời gian checkin - checkout</Typography>
                                    </Box>
                                    <Box borderBottom="1px solid #EEEEEE"  >
                                        <Box padding="20px 0" display="flex" justifyContent="start" alignItems="center" >
                                            <Typography fontSize="14px" fontWeight="600" color="#878C9F" minWidth="100px">Giờ checkin:</Typography>
                                            <Typography color="#5ECFB3" fontWeight="600" fontSize="14px" ml="10px"> 12 giờ trưa ngày đến </Typography>
                                        </Box>
                                        <Box padding="10px 0" display="flex" justifyContent="start" alignItems="center" >
                                            <Typography fontSize="14px" fontWeight="600" color="#878C9F" minWidth="100px">Giờ checkout:</Typography>
                                            <Typography color="#5ECFB3" fontWeight="600" fontSize="14px" ml="10px">10h sáng ngày đi</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}