import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { Card, CardActionArea, CardContent, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Input from "@mui/material/Input";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from "react";
import styled from 'styled-components';
import Header2 from '../../components/Header2';
import Navbar2 from '../../components/Navbar2';
import Sliders from '../../components/Slider';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';

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

const theme = createTheme({
    palette: {
        info: {
            main: '#000',
        },
    }
});




export default function SearchResultsPage() {

    const location = useLocation();
    const { state } = location
    console.log("state:", state);

    const city = location.pathname.split('/')[2];
    const { data, loading, error } = useFetch<Hotel[]>(
        `${process.env.REACT_APP_API_ENDPOINT}/hotel/count?city=${city}`,
    );
    const [values, setValues] = useState<number[]>([50000, 300000]);
    const value = 4
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValues(newValue as number[]);
    };
    function valuetext(value: number) {
        return `${value}VND`;
    }
    const navigate = useNavigate()

    return (
        <Box>
            <Navbar2 />
            <Header2 />
            <Sliders />
            <Box width="100%" bgcolor="#ECF6F8">
                <Box width="92%" maxWidth="1224px" m="30px auto" display="flex" gap={3} padding="50px 0" >
                    <Box flex="1" width="350px">
                        <Box bgcolor="white" borderRadius="5px" p="10px 0" >
                            <Box m="20px 30px">
                                <Box paddingBottom="20px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" >
                                    <Typography fontSize="16px" fontWeight="600" color="#183C7D">Lọc</Typography>
                                </Box>
                                <Box paddingBottom="20px" borderBottom="1px solid #EEEEEE" mt="20px" >
                                    <Typography fontSize="13px" color="#878C9F" mb="10px">Địa điểm</Typography>
                                    <Box display="flex" alignItems="center" border="#EEE solid 1px" height="45px" justifyContent="space-between" borderRadius="8px" bgcolor="#F9F9F9" mb="20px">
                                        <EventAvailableOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                    </Box>
                                    <Typography fontSize="13px" color="#878C9F" mb="10px">Ngày</Typography>
                                    <Box display="flex" alignItems="center" border="#EEE solid 1px" height="45px" justifyContent="space-between" borderRadius="8px" bgcolor="#F9F9F9">
                                        <EventAvailableOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt="20px" sx={{ flexWrap: "wrap" }}>
                                        <Box display="flex" flexDirection="column" alignItems="start" justifyContent="space-between" gap={2}>
                                            <Typography fontSize="12px" color="#878C9F" mr="10px">Người lớn</Typography>
                                            <Box display="flex" flexDirection="row" >
                                                <Input disableUnderline sx={{ width: "50px", height: "43px", border: "1px #EEE solid", padding: "0 10px", borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} />
                                                <Box display="flex" flexDirection="column" width="20px" bgcolor="#F9F9F9">
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderTopRightRadius: "5px", "&:hover": { cursor: "pointer" } }} >
                                                        <Typography fontSize="14px">+</Typography>
                                                    </Box>
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderTop: "none", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderBottomRightRadius: "5px", "&:hover": { cursor: "pointer" } }}>
                                                        <Typography fontSize="14px">-</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>
                                        <Box display="flex" flexDirection="column" alignItems="start" justifyContent="space-between" gap={2}>
                                            <Typography fontSize="12px" color="#878C9F" mr="10px">Trẻ em</Typography>
                                            <Box display="flex" flexDirection="row" >
                                                <Input disableUnderline sx={{ width: "50px", height: "43px", border: "1px #EEE solid", padding: "0 10px", borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} />
                                                <Box display="flex" flexDirection="column" width="20px" bgcolor="#F9F9F9">
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderTopRightRadius: "5px", "&:hover": { cursor: "pointer" } }} >
                                                        <Typography fontSize="14px">+</Typography>
                                                    </Box>
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderTop: "none", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderBottomRightRadius: "5px", "&:hover": { cursor: "pointer" } }}>
                                                        <Typography fontSize="14px">-</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>

                                        <Box display="flex" flexDirection="column" alignItems="start" justifyContent="space-between" gap={2} >
                                            <Typography fontSize="12px" color="#878C9F" mr="10px" >Phòng</Typography>
                                            <Box display="flex" flexDirection="row" >
                                                <Input disableUnderline sx={{ width: "50px", height: "43px", border: "1px #EEE solid", padding: "0 10px", borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} />
                                                <Box display="flex" flexDirection="column" width="20px" bgcolor="#F9F9F9">
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderTopRightRadius: "5px", "&:hover": { cursor: "pointer" } }} >
                                                        <Typography fontSize="14px">+</Typography>
                                                    </Box>
                                                    <Box sx={{ height: "20px", border: "1px #EEE solid", borderTop: "none", borderLeft: "none", display: "flex", alignItems: "center", justifyContent: "center", borderBottomRightRadius: "5px", "&:hover": { cursor: "pointer" } }}>
                                                        <Typography fontSize="14px">-</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>
                                    </Box>
                                    <Typography fontSize="13px" color="#878C9F" mb="10px" mt="20px">Khoảng giá (VND)</Typography>
                                    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography fontSize="12px" >0</Typography>

                                        <Typography fontSize="12px">500.000</Typography>
                                    </Stack>
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={values}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        max={500000}
                                        step={50000}
                                        marks
                                        getAriaValueText={valuetext}

                                    />
                                    <Typography fontSize="13px" color="#878C9F" mb="10px" mt="20px">Dịch vụ khách sạn</Typography>
                                    <Box >
                                        <Grid container spacing={1}>
                                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                                <Checkbox sx={{
                                                    color: "#CCCCCC", width: "12px", height: "12px",
                                                    '&.Mui-checked': {
                                                        bgcolor: "#3AACED",
                                                        color: "#FFF",
                                                        border: "1px solid #CCC",
                                                        fill: "#3AACED"
                                                    },

                                                }} />
                                                {/* <Checkbox sx={{ color: "#CCCCCC", width: "12px" }} /> */}
                                                <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">Điều hòa</Typography>
                                            </Grid>
                                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                                <Checkbox sx={{
                                                    color: "#CCCCCC", width: "12px", height: "12px",
                                                    '&.Mui-checked': {
                                                        bgcolor: "#3AACED",
                                                        color: "#FFF",
                                                        border: "1px solid #CCC",
                                                        fill: "#3AACED"
                                                    },

                                                }} />
                                                {/* <Checkbox sx={{ color: "#CCCCCC", width: "12px" }} /> */}
                                                <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">Quầy đồ ăn sáng </Typography>
                                            </Grid>
                                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                                <Checkbox sx={{
                                                    color: "#CCCCCC", width: "12px", height: "12px",
                                                    '&.Mui-checked': {
                                                        bgcolor: "#3AACED",
                                                        color: "#FFF",
                                                        border: "1px solid #CCC",
                                                        fill: "#3AACED"
                                                    },

                                                }} />
                                                {/* <Checkbox sx={{ color: "#CCCCCC", width: "12px" }} /> */}
                                                <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">Bể bơi</Typography>
                                            </Grid>
                                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                                <Checkbox sx={{
                                                    color: "#CCCCCC", width: "12px", height: "12px",
                                                    '&.Mui-checked': {
                                                        bgcolor: "#3AACED",
                                                        color: "#FFF",
                                                        border: "1px solid #CCC",
                                                        fill: "#3AACED"
                                                    },

                                                }} />
                                                {/* <Checkbox sx={{ color: "#CCCCCC", width: "12px" }} /> */}
                                                <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">Phòng hút thuốc</Typography>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                    <Typography fontSize="13px" color="#878C9F" mb="10px" mt="20px">Dịch vụ phòng khách sạn</Typography>
                                    <Box>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                                <Checkbox sx={{
                                                    color: "#CCCCCC", width: "12px", height: "12px",
                                                    '&.Mui-checked': {
                                                        bgcolor: "#3AACED",
                                                        color: "#FFF",
                                                        border: "1px solid #CCC",
                                                        fill: "#3AACED"
                                                    },

                                                }} />
                                                {/* <Checkbox sx={{ color: "#CCCCCC", width: "12px" }} /> */}
                                                <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">Điều hòa</Typography>
                                            </Grid>
                                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                                <Checkbox sx={{
                                                    color: "#CCCCCC", width: "12px", height: "12px",
                                                    '&.Mui-checked': {
                                                        bgcolor: "#3AACED",
                                                        color: "#FFF",
                                                        border: "1px solid #CCC",
                                                        fill: "#3AACED"
                                                    },

                                                }} />
                                                {/* <Checkbox sx={{ color: "#CCCCCC", width: "12px" }} /> */}
                                                <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">Quầy đồ ăn sáng </Typography>
                                            </Grid>
                                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                                <Checkbox sx={{
                                                    color: "#CCCCCC", width: "12px", height: "12px",
                                                    '&.Mui-checked': {
                                                        bgcolor: "#3AACED",
                                                        color: "#FFF",
                                                        border: "1px solid #CCC",
                                                        fill: "#3AACED"
                                                    },

                                                }} />
                                                {/* <Checkbox sx={{ color: "#CCCCCC", width: "12px" }} /> */}
                                                <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">Bể bơi</Typography>
                                            </Grid>
                                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                                <Checkbox sx={{
                                                    color: "#CCCCCC", width: "12px", height: "12px",
                                                    '&.Mui-checked': {
                                                        bgcolor: "#3AACED",
                                                        color: "#FFF",
                                                        border: "1px solid #CCC",
                                                        fill: "#3AACED"
                                                    },

                                                }} />
                                                {/* <Checkbox sx={{ color: "#CCCCCC", width: "12px" }} /> */}
                                                <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">Phòng hút thuốc</Typography>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                </Box>

                                <Box width="100%" m="30px 0px 20px 0px ">
                                    <Button variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} >Tìm kiếm</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex="2.5" display="flex" justifyContent="start" alignItems="start" flexDirection="column" >
                        <Box display="flex" flexDirection="row" mb="20px"  >
                            <Typography color="#958DA0" fontWeight="600" fontSize="20px" mr="10px">Kết quả tìm kiếm cho:  </Typography>
                            <Typography color="#3AACED" fontWeight="600" fontSize="20px">{state.place}</Typography>
                        </Box>
                        <Box gap={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
                            <Grid container spacing={4}>
                                {data && data.map((item) => (
                                    <Grid item xs={6} >
                                        <Card sx={{ ml: .5, boxShadow: "none", border: "1px solid #EEE", mr: .5 }} >
                                            <CardActionArea sx={{}} >
                                                <Box overflow="hidden" borderRadius="5px" position="relative" height="50%">
                                                    <Image src="http://res.cloudinary.com/di7a7sbbn/image/upload/v1668414040/upload/prirsonreuc6vkcjmxfi.jpg" />
                                                    <Box sx={{
                                                        position: "absolute",
                                                        top: 0,
                                                        width: "100%",
                                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        zIndex: 1,
                                                        pointerEvents: "none",
                                                        height: "100%",
                                                    }}>
                                                        <Box display="flex" flexDirection="column">
                                                            <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#5ECFB1", margin: "20px 20px 10px 0px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                                                <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá {item.discount}%</Typography>
                                                            </Box>
                                                            <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#FF0000", m: "0 20px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                                                <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>{item.featured}</Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'start',
                                                                height: "30%",
                                                                m: 2,
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <Rating
                                                                name="text-feedback"
                                                                value={item.ratingAvg}
                                                                readOnly
                                                                precision={0.5}
                                                                emptyIcon={<StarBorderOutlinedIcon style={{ color: "#FAC73F", fontSize: "18px" }} />}
                                                                sx={{ fontSize: "18px", color: "#FAC73F" }}
                                                            />
                                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'end',
                                                                    m: 1,
                                                                    flexDirection: "column"
                                                                }}>
                                                                    <Typography sx={{ color: "#FEFEFE", fontSize: "13px", fontWeight: "600" }}>{labels[value]}</Typography>
                                                                    <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>{item.comments.length} bình luận</Typography>

                                                                </Box>
                                                                <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                                    <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                                        <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>{item.ratingAvg}</Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>

                                                    </Box>
                                                </Box>
                                                <CardContent>
                                                    <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                                        {item.name}
                                                    </Typography>
                                                    <Box display="flex" flexDirection="row" alignItems="start" gap={1} mb={1.5}>
                                                        <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px", mt:"5px" }} />
                                                        <Typography sx={{ color: "#999", fontSize: "13px", whiteSpace:"wrap", wordBreak: "break-word" }}>{item.address}</Typography>
                                                    </Box>
                                                    <Box sx={{ border: ".5px  #CCC dashed" }} />
                                                    <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.description}</Typography>
                                                    <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                                        <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                                        <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED" }}>
                                                            {item && item.services.map((service, key) => (
                                                                <li style={{ display: "inline-block", marginRight: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} key={key}>service</li>
                                                            ))}
                                                        </ul>
                                                    </Box>
                                                    <Box sx={{ border: ".5px  #CCC dashed" }} />
                                                    <ThemeProvider theme={theme}>
                                                        <Box display="flex" alignItems="center" justifyContent="space-between" mt="10px" >
                                                            <Box bgcolor="#F9B90F" sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", border: "0.5px solid #EEE", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }}>
                                                                <Typography sx={{ fontSize: "13px", textTransform: "uppercase", color: "white" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                                                                <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>{item.cheapestPrice}VND</Typography>
                                                            </Box>
                                                            <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => navigate(`/hotel/${item._id}`)}>Xem chi tiết</Button>
                                                        </Box>
                                                    </ThemeProvider>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>



                    </Box>
                </Box>
            </Box>

        </Box >
    )
}