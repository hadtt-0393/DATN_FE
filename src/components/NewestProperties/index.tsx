import Box from "@mui/material/Box";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Typography from "@mui/material/Typography"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button, Card, CardActionArea, CardContent, Rating } from "@mui/material";
import styled from 'styled-components';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from "react-router-dom";

const theme = createTheme({
    palette: {
        info: {
            main: '#000',
        },
    }
});

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

export default function NewestProperties() {
    const value = 4
    const navigate = useNavigate()
    return (
        <Box width="100%" display="flex" flexDirection="column" m="60px auto">
            <Box display="flex" alignItems="center" margin="0 auto" maxWidth="1224px" flexDirection="column" width="92%" mb="30px">
                <Box m="10px">
                    <StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} /><StarRateRoundedIcon fontSize="medium" sx={{ color: "#F9B90F" }} /><StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} />
                </Box>
                <Typography sx={{ fontSize: "24px", fontWeight: "700", fontFamily: "Nunito,sans-serif", color: "#18458B" }}>Những Khách Sạn Mới Nhẩt</Typography>
                <Box width="5%" bgcolor="#3AACED" height="4px" borderRadius="2px" m="25px 0" />
                <Typography sx={{ color: "#878C9F", mb: "30px", fontSize: "13px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
            </Box>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={4}
                navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                style={{ display: "flex", width: "95%", height: "50%", justifyContent: "space-between", alignItems: "center", }}
            >
                <SwiperSlide style={{ height: "580px", marginBottom: "10px" }}>
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
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá 30%</Typography>
                                        </Box>
                                        <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#FF0000", m: "0 20px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Đặc sắc</Typography>
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
                                            value={value}
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
                                                <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>10 bình luận</Typography>

                                            </Box>
                                            <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                    <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            <CardContent>
                                <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                    Thu Ha Hotel
                                </Typography>
                                <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={1.5}>
                                    <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px" }} />
                                    <Typography sx={{ color: "#999", fontSize: "13px", }}>Ta Quang Buu, Hai Ba Trung, Ha Noi</Typography>
                                </Box>
                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px" }}>Khach san dep, dich vu tot, nhan vien nhiet tinh</Typography>
                                <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                    <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                    <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED" }}>
                                        <li style={{ display: "inline-block", marginRight: "10px" }}>Wifi</li>
                                        <li style={{ display: "inline-block" }}>Shower</li>
                                    </ul>
                                </Box>

                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <ThemeProvider theme={theme}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="10px" >
                                        <Box bgcolor="#F9B90F" sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", border: "0.5px solid #EEE", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }}>
                                            <Typography sx={{ fontSize: "13px", textTransform: "uppercase", color: "white" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>200.000VND</Typography>
                                        </Box>
                                        <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => navigate("/detail-hotel")}>Xem chi tiết</Button>
                                    </Box>
                                </ThemeProvider>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </SwiperSlide>
                <SwiperSlide style={{ height: "580px", marginBottom: "10px" }}>
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
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá 30%</Typography>
                                        </Box>
                                        <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#FF0000", m: "0 20px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Đặc sắc</Typography>
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
                                            value={value}
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
                                                <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>10 bình luận</Typography>

                                            </Box>
                                            <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                    <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            <CardContent>
                                <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                    Thu Ha Hotel
                                </Typography>
                                <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={1.5}>
                                    <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px" }} />
                                    <Typography sx={{ color: "#999", fontSize: "13px", }}>Ta Quang Buu, Hai Ba Trung, Ha Noi</Typography>
                                </Box>
                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px" }}>Khach san dep, dich vu tot, nhan vien nhiet tinh</Typography>
                                <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                    <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                    <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED" }}>
                                        <li style={{ display: "inline-block", marginRight: "10px" }}>Wifi</li>
                                        <li style={{ display: "inline-block" }}>Shower</li>
                                    </ul>
                                </Box>

                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <ThemeProvider theme={theme}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="10px" >
                                        <Box bgcolor="#F9B90F" sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", border: "0.5px solid #EEE", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }}>
                                            <Typography sx={{ fontSize: "13px", textTransform: "uppercase", color: "white" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>200.000VND</Typography>
                                        </Box>
                                        <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => navigate("/detail-hotel")}>Xem chi tiết</Button>
                                    </Box>
                                </ThemeProvider>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </SwiperSlide>
                <SwiperSlide style={{ height: "580px", marginBottom: "10px" }}>
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
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá 30%</Typography>
                                        </Box>
                                        <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#FF0000", m: "0 20px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Đặc sắc</Typography>
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
                                            value={value}
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
                                                <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>10 bình luận</Typography>

                                            </Box>
                                            <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                    <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            <CardContent>
                                <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                    Thu Ha Hotel
                                </Typography>
                                <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={1.5}>
                                    <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px" }} />
                                    <Typography sx={{ color: "#999", fontSize: "13px", }}>Ta Quang Buu, Hai Ba Trung, Ha Noi</Typography>
                                </Box>
                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px" }}>Khach san dep, dich vu tot, nhan vien nhiet tinh</Typography>
                                <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                    <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                    <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED" }}>
                                        <li style={{ display: "inline-block", marginRight: "10px" }}>Wifi</li>
                                        <li style={{ display: "inline-block" }}>Shower</li>
                                    </ul>
                                </Box>

                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <ThemeProvider theme={theme}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="10px" >
                                        <Box bgcolor="#F9B90F" sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", border: "0.5px solid #EEE", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }}>
                                            <Typography sx={{ fontSize: "13px", textTransform: "uppercase", color: "white" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>200.000VND</Typography>
                                        </Box>
                                        <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => navigate("/detail-hotel")}>Xem chi tiết</Button>
                                    </Box>
                                </ThemeProvider>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </SwiperSlide>
                <SwiperSlide style={{ height: "580px", marginBottom: "10px" }}>
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
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá 30%</Typography>
                                        </Box>
                                        <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#FF0000", m: "0 20px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Đặc sắc</Typography>
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
                                            value={value}
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
                                                <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>10 bình luận</Typography>

                                            </Box>
                                            <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                    <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            <CardContent>
                                <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                    Thu Ha Hotel
                                </Typography>
                                <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={1.5}>
                                    <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px" }} />
                                    <Typography sx={{ color: "#999", fontSize: "13px", }}>Ta Quang Buu, Hai Ba Trung, Ha Noi</Typography>
                                </Box>
                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px" }}>Khach san dep, dich vu tot, nhan vien nhiet tinh</Typography>
                                <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                    <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                    <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED" }}>
                                        <li style={{ display: "inline-block", marginRight: "10px" }}>Wifi</li>
                                        <li style={{ display: "inline-block" }}>Shower</li>
                                    </ul>
                                </Box>

                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <ThemeProvider theme={theme}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="10px" >
                                        <Box bgcolor="#F9B90F" sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", border: "0.5px solid #EEE", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }}>
                                            <Typography sx={{ fontSize: "13px", textTransform: "uppercase", color: "white" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>200.000VND</Typography>
                                        </Box>
                                        <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => navigate("/detail-hotel")}>Xem chi tiết</Button>
                                    </Box>
                                </ThemeProvider>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </SwiperSlide>
                <SwiperSlide style={{ height: "580px", marginBottom: "10px" }}>
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
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá 30%</Typography>
                                        </Box>
                                        <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#FF0000", m: "0 20px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Đặc sắc</Typography>
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
                                            value={value}
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
                                                <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>10 bình luận</Typography>

                                            </Box>
                                            <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                    <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            <CardContent>
                                <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                    Thu Ha Hotel
                                </Typography>
                                <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={1.5}>
                                    <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px" }} />
                                    <Typography sx={{ color: "#999", fontSize: "13px", }}>Ta Quang Buu, Hai Ba Trung, Ha Noi</Typography>
                                </Box>
                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px" }}>Khach san dep, dich vu tot, nhan vien nhiet tinh</Typography>
                                <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                    <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                    <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED" }}>
                                        <li style={{ display: "inline-block", marginRight: "10px" }}>Wifi</li>
                                        <li style={{ display: "inline-block" }}>Shower</li>
                                    </ul>
                                </Box>

                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <ThemeProvider theme={theme}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="10px" >
                                        <Box bgcolor="#F9B90F" sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", border: "0.5px solid #EEE", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }}>
                                            <Typography sx={{ fontSize: "13px", textTransform: "uppercase", color: "white" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>200.000VND</Typography>
                                        </Box>
                                        <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => navigate("/detail-hotel")}>Xem chi tiết</Button>
                                    </Box>
                                </ThemeProvider>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </SwiperSlide>
                <SwiperSlide style={{ height: "580px", marginBottom: "10px" }}>
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
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá 30%</Typography>
                                        </Box>
                                        <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#FF0000", m: "0 20px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Đặc sắc</Typography>
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
                                            value={value}
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
                                                <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>10 bình luận</Typography>

                                            </Box>
                                            <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                    <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>4.5</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            <CardContent>
                                <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                    Thu Ha Hotel
                                </Typography>
                                <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={1.5}>
                                    <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px" }} />
                                    <Typography sx={{ color: "#999", fontSize: "13px", }}>Ta Quang Buu, Hai Ba Trung, Ha Noi</Typography>
                                </Box>
                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px" }}>Khach san dep, dich vu tot, nhan vien nhiet tinh</Typography>
                                <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                    <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                    <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED" }}>
                                        <li style={{ display: "inline-block", marginRight: "10px" }}>Wifi</li>
                                        <li style={{ display: "inline-block" }}>Shower</li>
                                    </ul>
                                </Box>

                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <ThemeProvider theme={theme}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mt="10px" >
                                        <Box bgcolor="#F9B90F" sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", border: "0.5px solid #EEE", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }}>
                                            <Typography sx={{ fontSize: "13px", textTransform: "uppercase", color: "white" }} >Giá Rẻ Nhẩt/Đêm</Typography>
                                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>200.000VND</Typography>
                                        </Box>
                                        <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => navigate("/detail-hotel")}>Xem chi tiết</Button>
                                    </Box>
                                </ThemeProvider>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </SwiperSlide>

                <Box className="swiper-button-prev" style={{ color: '#18458B' }}>
                    {/* <ArrowCircleLeftIcon /> */}
                </Box>
                <Box className="swiper-button-next" style={{ color: '#18458B' }}>
                    {/* <ArrowCircleRightIcon /> */}
                </Box>
            </Swiper>
        </Box>
    )
}