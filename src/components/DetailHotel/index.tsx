import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import Input from "@mui/material/Input";
import { FormControlLabel, Rating, Switch } from "@mui/material";
import Navbar2 from '../../components/Navbar2';
import Header2 from '../../components/Header2'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import styled from 'styled-components';
import TextField from "@mui/material//TextField";


const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
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
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },

];

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
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
        transform: scale(1.2);
        cursor: pointer;
},`

export default function DetailHotel() {
    const value = 4
    return (
        <Box>
            <Navbar2 />
            <Header2 />
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
                                <Rating
                                    name="text-feedback"
                                    value={value}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarBorderOutlinedIcon style={{ color: "#FAC73F", fontSize: "18px" }} />}
                                    sx={{ fontSize: "18px", color: "#FAC73F" }}
                                />
                                <Typography sx={{ color: "#FEFEFE", fontSize: "44px", fontWeight: "600", mt: "20px" }}>Thu Ha Hotel</Typography>
                                <Box width="5%" bgcolor="#3AACED" height="4px" borderRadius="2px" m="20px 0" />
                                <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2} width="100%" padding="20px 0">
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                        <EmailOutlinedIcon sx={{ color: "#3A9FC3", mr: "10px" }} />
                                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Email:  </Typography>
                                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>easybook@thuhahust.eco.vn</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                        <RoomOutlinedIcon sx={{ color: "#3A9FC3", mr: "10px" }} />
                                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Địa chỉ:  </Typography>
                                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>Số 1 - Đại Cồ Việt - Hai Bà Trưng - Hà Nội</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                        <PhoneOutlinedIcon sx={{ color: "#3A9FC3", mr: "10px" }} />
                                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Hotline:  </Typography>
                                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>034 492 4268</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box >
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
                            </Box>

                        </Box>

                    </Box>

                    <Box width="92%" maxWidth="1224px" display="flex" m="20px auto">
                        <Box flex="1"></Box>
                        <Box sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }} alignSelf="end">
                            <Typography sx={{ fontSize: "14px", textTransform: "uppercase", color: "white", fontWeight: "600" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                            <Typography sx={{ fontSize: "24px", color: "#5ECFB1", fontWeight: "600", marginLeft: "20px" }}>200.000VND</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box >
            <Box bgcolor="#ECF6F8" >
                <Box width="92%" bgcolor="#ECF6F8" maxWidth="1224px" m="30px auto" display="flex" gap={5} padding="50px 0">
                    <Box flex="2" >
                        <ImageList
                            sx={{ width: "100%" }}
                            variant="quilted"
                            cols={4}
                            rowHeight={121}
                        >
                            {itemData.map((item) => (
                                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                    <img
                                        {...srcset(item.img, 121, item.rows, item.cols)}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                        <Box display="flex" flexDirection="row" bgcolor="#FFF" height="105px" mt="50px" justifyContent="space-between" alignItems="center" borderRadius="5px">
                            <Box flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                                <HotelOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                                <Typography color="#999EA5" fontSize="12px" fontWeight="600">15 Phòng</Typography>
                            </Box>
                            <Box borderLeft="#E2E2E2 solid 1px" flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                                <GroupsOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                                <Typography color="#999EA5" fontSize="12px" fontWeight="600">1000 Khách/Năm</Typography>
                            </Box>
                            <Box borderLeft="#E2E2E2 solid 1px" flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                                <DirectionsCarOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                                <Typography color="#999EA5" fontSize="12px" fontWeight="600">Cách Trung Tâm Thành Phố 20Km</Typography>
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
                                    Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla. Nulla eget iaculis lectus. Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut tristique elit risus at metus.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.
                                </Typography>

                            </Box>
                        </Box>
                        {/* <Box bgcolor="white" mt="30px" borderRadius="5px">
                            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Ngày có thể đặt phòng
                                </Typography>
                            </Box>
                            <Box m="30px " display="flex" justifyContent="center" alignItems="center" >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangeCalendar']} >
                                        <DemoItem>
                                            <DateRangeCalendar
                                                readOnly
                                            />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>

                            </Box>
                        </Box> */}
                        <Box bgcolor="white" mt="30px" borderRadius="5px">
                            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Dịch vụ
                                </Typography>
                            </Box>
                            <Box m="30px" display="flex" justifyContent="start" alignItems="center" pb="30px" flexWrap="wrap" gap={3}  >
                                <Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box>
                                <Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box><Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" >
                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                    <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px">Wifi</Typography>
                                </Box>




                            </Box>
                        </Box>
                        <Box bgcolor="white" mt="30px" borderRadius="5px" pb="30px">
                            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Phòng có thể đặt
                                </Typography>
                            </Box>
                            <Box m="0px 30px" display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                                <Box borderBottom="#EEE 1px solid" width="100%" p="30px 0 0 0" display="flex" alignItems="start" justifyContent="space-between">
                                    <Box flex={2} margin="0 20px" display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="10px">
                                        <Image src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/12/10.jpg" alt="room-image" style={{ width: "400px", objectFit: "contain" }} />
                                    </Box>
                                    <Box flex={3} display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" padding="0 15px" width="100%">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" width="100%" height="65px" paddingBottom="15px" borderBottom="#CCC 1px dashed">
                                                <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%">
                                                    <Typography color="#334E6F" fontSize="19px" fontWeight="600" flex={1}>Phòng Đơn</Typography>
                                                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" flex={1}>
                                                        <Typography color="#F9B90F" fontSize="13px" fontWeight="600" mr="5px">Số người tối đa:</Typography>
                                                        <Typography color="#3AACED" fontSize="13px" fontWeight="600">3 người</Typography>
                                                    </Box>

                                                </Box>
                                                <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%" >
                                                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                        <Typography color="#73D1B6" fontSize="19px" fontWeight="600"> 100.000VND</Typography>
                                                        <Typography color="#999EA5" fontSize="14px" fontWeight="600">/Đêm</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center">
                                                        <Typography color="#666" fontSize="14px" fontWeight="600" mr="10px">Số phòng:</Typography>
                                                        <Box bgcolor="orange" borderRadius="5px" padding="2px 8px">
                                                            <Typography color="#FFF" fontSize="14px" fontWeight="600">301</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box width="100%" padding="20px 0" borderBottom="#CCC 1px dashed">
                                                <Typography color="#888" fontSize="15px">Phòng view biển siêu đẹp, có bể bơi 4 mùa </Typography>

                                            </Box>
                                            <Box borderBottom="#CCC 1px dashed" padding="20px 0">

                                                <Box display="flex" justifyContent="start" alignItems="center" flexWrap="wrap" gap={2}  >
                                                    <Typography color="#666" fontSize="15px" fontWeight="600"> Dịch vụ: </Typography>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>


                                                </Box>
                                            </Box>

                                            <Box width="100%" m="20px 0px 20px 0px ">
                                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flex: 1 }}>
                                                    <FormControlLabel control={<Switch defaultChecked />} label="Chọn phòng" />
                                                </Box>
                                            </Box>

                                        </Box>

                                    </Box>
                                </Box>
                                <Box borderBottom="#EEE 1px solid" width="100%" p="30px 0 0 0" display="flex" alignItems="start" justifyContent="space-between">
                                    <Box flex={2} margin="0 20px" display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="10px">
                                        <Image src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/12/10.jpg" alt="room-image" style={{ width: "400px", objectFit: "contain" }} />
                                    </Box>
                                    <Box flex={3} display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" padding="0 15px" width="100%">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" width="100%" height="65px" paddingBottom="15px" borderBottom="#CCC 1px dashed">
                                                <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%">
                                                    <Typography color="#334E6F" fontSize="19px" fontWeight="600" flex={1}>Phòng Đơn</Typography>
                                                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" flex={1}>
                                                        <Typography color="#F9B90F" fontSize="13px" fontWeight="600" mr="5px">Số người tối đa:</Typography>
                                                        <Typography color="#3AACED" fontSize="13px" fontWeight="600">3 người</Typography>
                                                    </Box>

                                                </Box>
                                                <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%" >
                                                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                        <Typography color="#73D1B6" fontSize="19px" fontWeight="600"> 100.000VND</Typography>
                                                        <Typography color="#999EA5" fontSize="14px" fontWeight="600">/Đêm</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center">
                                                        <Typography color="#666" fontSize="14px" fontWeight="600" mr="10px">Số phòng:</Typography>
                                                        <Box bgcolor="orange" borderRadius="5px" padding="2px 8px">
                                                            <Typography color="#FFF" fontSize="14px" fontWeight="600">301</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box width="100%" padding="20px 0" borderBottom="#CCC 1px dashed">
                                                <Typography color="#888" fontSize="15px">Phòng view biển siêu đẹp, có bể bơi 4 mùa </Typography>

                                            </Box>
                                            <Box borderBottom="#CCC 1px dashed" padding="20px 0">

                                                <Box display="flex" justifyContent="start" alignItems="center" flexWrap="wrap" gap={2}  >
                                                    <Typography color="#666" fontSize="15px" fontWeight="600"> Dịch vụ: </Typography>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>


                                                </Box>
                                            </Box>

                                            <Box width="100%" m="20px 0px 20px 0px ">
                                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flex: 1 }}>
                                                    <FormControlLabel control={<Switch defaultChecked />} label="Chọn phòng" />
                                                </Box>
                                            </Box>

                                        </Box>

                                    </Box>
                                </Box>
                                <Box borderBottom="#EEE 1px solid" width="100%" p="30px 0 0 0" display="flex" alignItems="start" justifyContent="space-between">
                                    <Box flex={2} margin="0 20px" display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="10px">
                                        <Image src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/12/10.jpg" alt="room-image" style={{ width: "400px", objectFit: "contain" }} />
                                    </Box>
                                    <Box flex={3} display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" padding="0 15px" width="100%">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" width="100%" height="65px" paddingBottom="15px" borderBottom="#CCC 1px dashed">
                                                <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%">
                                                    <Typography color="#334E6F" fontSize="19px" fontWeight="600" flex={1}>Phòng Đơn</Typography>
                                                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" flex={1}>
                                                        <Typography color="#F9B90F" fontSize="13px" fontWeight="600" mr="5px">Số người tối đa:</Typography>
                                                        <Typography color="#3AACED" fontSize="13px" fontWeight="600">3 người</Typography>
                                                    </Box>

                                                </Box>
                                                <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%" >
                                                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                        <Typography color="#73D1B6" fontSize="19px" fontWeight="600"> 100.000VND</Typography>
                                                        <Typography color="#999EA5" fontSize="14px" fontWeight="600">/Đêm</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center">
                                                        <Typography color="#666" fontSize="14px" fontWeight="600" mr="10px">Số phòng:</Typography>
                                                        <Box bgcolor="orange" borderRadius="5px" padding="2px 8px">
                                                            <Typography color="#FFF" fontSize="14px" fontWeight="600">301</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box width="100%" padding="20px 0" borderBottom="#CCC 1px dashed">
                                                <Typography color="#888" fontSize="15px">Phòng view biển siêu đẹp, có bể bơi 4 mùa </Typography>

                                            </Box>
                                            <Box borderBottom="#CCC 1px dashed" padding="20px 0">

                                                <Box display="flex" justifyContent="start" alignItems="center" flexWrap="wrap" gap={2}  >
                                                    <Typography color="#666" fontSize="15px" fontWeight="600"> Dịch vụ: </Typography>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                        <Typography fontSize="14px" color="#8894B5" ml="10px">Wifi</Typography>
                                                    </Box>


                                                </Box>
                                            </Box>

                                            <Box width="100%" m="20px 0px 20px 0px ">
                                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flex: 1 }}>
                                                    <FormControlLabel control={<Switch defaultChecked />} label="Chọn phòng" />
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
                                    Nhận xét từ người dùng
                                </Typography>
                            </Box>
                            <Box m="30px " display="flex" justifyContent="center" alignItems="center" >
                                <Box borderBottom="#EEE 1px solid" width="100%"> aaa</Box>

                            </Box>
                        </Box>
                        <Box bgcolor="white" mt="30px" borderRadius="5px" pb="30px">
                            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                                    Hãy để lại nhận xét của bạn
                                </Typography>
                            </Box>
                            <Box m="30px " display="flex" justifyContent="center" alignItems="center" >
                                <Box borderBottom="#EEE 1px solid" width="100%"> aaa</Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box flex="1" width="350px" height="460px">
                        <Box bgcolor="white" borderRadius="5px" p="10px 0" position="sticky" zIndex={10} top="120px" >
                            <Box m="20px 30px">
                                <Box paddingBottom="20px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" >
                                    <Typography fontSize="16px" fontWeight="600" color="#183C7D">Đặt Phòng Khách Sạn</Typography>
                                </Box>
                                <Box paddingBottom="20px" borderBottom="1px solid #EEEEEE" mt="20px" >
                                    <Typography fontSize="13px" color="#878C9F" mb="10px">Ngày</Typography>
                                    <Box display="flex" alignItems="center" border="#EEE solid 1px" height="45px" justifyContent="space-between" borderRadius="8px" bgcolor="#F9F9F9">
                                        <EventAvailableOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['SingleInputDateRangeField']} >
                                        <DateRangePicker
                                            slots={{ field: SingleInputDateRangeField }}
                                            name="allowedRange"
                                        />
                                    </DemoContainer>
                                </LocalizationProvider> */}
                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt="20px" sx={{ flexWrap: "wrap" }}>
                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                            <Typography fontSize="12px" color="#878C9F" mr="10px">Người lớn</Typography>
                                            <Box display="flex" flexDirection="row" >
                                                <Input disableUnderline sx={{ width: "50px", height: "43px", border: "1px #EEE solid", padding: "0 10px", borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} />
                                                <Box display="flex" flexDirection="column" width="20px" bgcolor="#F9F9F9">
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderTopRightRadius: "5px" }} >
                                                        <Typography fontSize="14px">+</Typography>
                                                    </Box>
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderTop: "none", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderBottomRightRadius: "5px" }}>
                                                        <Typography fontSize="14px">-</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>
                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                            <Typography fontSize="12px" color="#878C9F" mr="10px">Trẻ em</Typography>
                                            <Box display="flex" flexDirection="row" >
                                                <Input disableUnderline sx={{ width: "50px", height: "43px", border: "1px #EEE solid", padding: "0 10px", borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} />
                                                <Box display="flex" flexDirection="column" width="20px" bgcolor="#F9F9F9">
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderTopRightRadius: "5px" }} >
                                                        <Typography fontSize="14px">+</Typography>
                                                    </Box>
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderTop: "none", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderBottomRightRadius: "5px" }}>
                                                        <Typography fontSize="14px">-</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>
                                        {/* <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <Typography fontSize="12px" color="#878C9F" mr="10px">Phòng</Typography>
                                        <Box display="flex" flexDirection="row" >
                                            <Input disableUnderline sx={{ width: "40px", height: "43px", border: "1px #EEE solid", padding: "0 10px", borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} />
                                            <Box display="flex" flexDirection="column" width="20px" bgcolor="#F9F9F9">
                                                <Box sx={{ height: "20px", border: "1px #EEE solid", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderTopRightRadius: "5px" }} >
                                                    <Typography fontSize="14px">+</Typography>
                                                </Box>
                                                <Box sx={{ height: "20px", border: "1px #EEE solid", borderTop: "none", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderBottomRightRadius: "5px" }}>
                                                    <Typography fontSize="14px">-</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box> */}
                                    </Box>
                                </Box>
                                <Box padding="20px 0" display="flex" justifyContent="space-between" alignItems="center" >
                                    <Typography fontSize="14px" fontWeight="600" color="#878C9F">Tổng thanh toán</Typography>
                                    <Typography color="#3AACED" fontWeight="600" fontSize="19px"> 100.000 VND</Typography>
                                </Box>
                                <Box display="flex">
                                    <Box flex="1"></Box>
                                    <Button variant="contained" sx={{ backgroundColor: "#3AACED", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#3AACED" } }}  >Kiểm tra phòng hợp lệ</Button>

                                </Box>
                                <Box width="100%" m="30px 0px 20px 0px ">
                                    <Button variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} >Đặt phòng</Button>
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
                                        <Typography color="#5ECFB3" fontWeight="600" fontSize="14px" ml="30px"> 100.000 VND - 1.000.000 VND</Typography>
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