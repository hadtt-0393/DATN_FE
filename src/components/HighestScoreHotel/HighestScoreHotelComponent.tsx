import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { Button, Card, CardActionArea, CardContent, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import useFetch from "../../hooks/useFetch";
import { Hotel } from "../../models/Hotel";

const theme = createTheme({
    palette: {
        info: {
            main: '#000',
        },
    }
});


const getLabel = (value: number): string => {
    if (value >= 0 && value < 1) return 'Rất kém';
    if (value >= 1 && value < 2) return 'Kém';
    if (value >= 2 && value < 3) return 'Trung bình';
    if (value >= 3 && value < 4) return 'Khá';
    if (value >= 4 && value < 4.5) return 'Tốt';
    if (value >= 4.5 && value <= 5) return 'Rất tốt';
    return '';
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

export default function HighestScoreHotelComponent() {
    const value = 3.5;
    const navigate = useNavigate()
    const { data, loading, error } = useFetch<Hotel[]>(
        `${process.env.REACT_APP_API_ENDPOINT}/hotel/topTenRating`,
    );
    return (
        <Box width="100%" display="flex" flexDirection="column" m="60px auto" sx={{ backgroundColor: "#ECF6F8" }} p="50px 0">
            <Box display="flex" alignItems="center" margin="0 auto" maxWidth="1224px" flexDirection="column" width="92%" mb="30px">
                <Box m="10px">
                    <StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} /><StarRateRoundedIcon fontSize="medium" sx={{ color: "#F9B90F" }} /><StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} />
                </Box>
                <Typography sx={{ fontSize: "24px", fontWeight: "700", fontFamily: "Nunito,sans-serif", color: "#18458B" }}>Những Khách Sạn Được Đánh Giá Tốt Nhất</Typography>
                <Box width="5%" bgcolor="#3AACED" height="4px" borderRadius="2px" m="25px 0" />
                <Typography sx={{ color: "#878C9F", mb: "30px", fontSize: "13px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
            </Box>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={40}
                slidesPerView={4}
                navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => { }}
                onSlideChange={() => { }}
                style={{ display: "flex", width: "95%", height: "50%", justifyContent: "space-between", alignItems: "center", }}
            >
                {data && data.map((item, key) => (
                    <SwiperSlide style={{ height: "580px", marginBottom: "10px" }} key={key}>
                        <Card sx={{ ml: .5, boxShadow: "none", border: "1px solid #EEE", mr: .5 }} >
                            <CardActionArea sx={{}} >
                                <Box overflow="hidden" borderRadius="5px" position="relative" height="300px" sx={{objectFit:"contain"}}>
                                    <Image src={item.images[0]} />
                                    <Box sx={{
                                        position: "absolute",
                                        top: 0,
                                        width: "100%",
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "end",
                                        zIndex: 1,
                                        pointerEvents: "none",
                                        height: "100%",
                                    }}>
                                        {
                                            item.discount !== 0 && (
                                                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start" flex={1}>
                                                    <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#5ECFB1", margin: "20px 20px 10px 0px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                                        <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá {item.discount}%</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        }
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
                                                    <Typography sx={{ color: "#FEFEFE", fontSize: "13px", fontWeight: "600" }}>{getLabel(item.ratingAvg)}</Typography>
                                                    {/* <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>{item.forms.length} bình luận</Typography> */}
                                                </Box>
                                                <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                    <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                        <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>{item.ratingAvg.toFixed(2)}</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <CardContent>
                                    <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                        {item.hotelName}
                                    </Typography>
                                    <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={1.5}>
                                        <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px", mt: "2px" }} />
                                        <Typography sx={{ color: "#999", fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.address}</Typography>
                                    </Box>
                                    <Box sx={{ border: ".5px  #CCC dashed" }} />
                                    <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.description}</Typography>
                                    <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                        <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                        <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED" , overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {item && item.services.map((service, key) => (
                                                <li style={{ display: "inline-block", marginRight: "10px"}} key={key}>{service}</li>
                                            ))}
                                        </ul>
                                    </Box>
                                    <Box sx={{ border: ".5px  #CCC dashed" }} />
                                    <ThemeProvider theme={theme}>
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mt="10px" >
                                            <Box bgcolor="#F9B90F" sx={{ fontSize: "13px", textTransform: "unset", boxShadow: "none", border: "0.5px solid #EEE", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: "5px" }}>
                                                <Typography sx={{ fontSize: "13px", textTransform: "uppercase", color: "white" }} >Giá Rẻ Nhất/Đêm</Typography>
                                                <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>{(item.cheapestPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}VND</Typography>
                                            </Box>
                                            <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => navigate(`/hotel/${item._id}`)}>Xem chi tiết</Button>                                        </Box>
                                    </ThemeProvider>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                ))}

                <Box className="swiper-button-prev" style={{ color: '#18458B' }}>
                </Box>
                <Box className="swiper-button-next" style={{ color: '#18458B' }}>
                </Box>
            </Swiper>
        </Box>
    )
}