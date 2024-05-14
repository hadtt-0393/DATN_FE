import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Typography from "@mui/material/Typography"
import TextField from "@mui/material//TextField";
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import Input from "@mui/material/Input";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { FormControl, MenuItem, Rating, Select } from "@mui/material";
import { useState } from "react";
import Navbar2 from '../../components/Navbar2';
import Header2 from '../../components/Header2'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
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
            <Box bgcolor="#ECF6F8">
                <Box width="92%" height="100vh" bgcolor="#ECF6F8" maxWidth="1224px" m="30px auto" display="flex" gap={5}>
                    <Box flex="2"  mt="20px">
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
                    </Box>
                    <Box flex="1" width="350px" height="460px" bgcolor="white" mt="20px" borderRadius="5px">
                        <Box m="30px">
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

                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <Typography fontSize="12px" color="#878C9F" mr="10px">Trẻ em</Typography>
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
                            <Box padding="20px 0" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" display="flex" justifyContent="space-between" alignItems="center" >
                                <Typography fontSize="14px" fontWeight="600" color="#878C9F">Tổng thanh toán</Typography>
                                <Typography color="#3AACED" fontWeight="600" fontSize="19px"> 100.000 VND</Typography>
                            </Box>
                            <Box display="flex">
                                <Box flex="1"></Box>
                                <Button variant="contained" sx={{ backgroundColor: "#3AACED", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#3AACED" } }}  >Kiểm tra phòng hợp lệ</Button>

                            </Box>
                            <Box width="100%" m="30px 0">
                                <Button variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} >Đặt phòng</Button>

                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>

        </Box>

    )
}