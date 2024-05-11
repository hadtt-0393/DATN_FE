import Box from "@mui/material/Box";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Typography from "@mui/material/Typography"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia } from "@mui/material";
import { Star } from "@mui/icons-material";
import styled from 'styled-components';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

export default function HighestScoreProperties() {
    return (
        <Box width="100%" display="flex" flexDirection="column" m="60px auto" height="1000px">
            <Box display="flex" alignItems="center" margin="0 auto" maxWidth="1224px" flexDirection="column" width="92%">
                <Box m="10px">
                    <StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} /><StarRateRoundedIcon fontSize="medium" sx={{ color: "#F9B90F" }} /><StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} />
                </Box>
                <Typography sx={{ fontSize: "24px", fontWeight: "700", fontFamily: "Nunito,sans-serif", color: "#18458B" }}>Những Khách Sạn Được Đánh Giá Tốt Nhất</Typography>
                <Box width="5%" bgcolor="#3AACED" height="4px" borderRadius="2px" m="25px 0" />
                <Typography sx={{ color: "#878C9F", mb: "30px", fontSize: "13px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
            </Box>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                style={{ display: "flex", width: "95%", height: "50%", justifyContent: "space-between", alignItems: "center", }}

            >
                <SwiperSlide style={{ backgroundColor: "orange" }}>
                    <Card sx={{ minHeight: "580px" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="50%"
                                image="http://res.cloudinary.com/di7a7sbbn/image/upload/v1668414040/upload/prirsonreuc6vkcjmxfi.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                    Thu Ha Hotel
                                </Typography>
                                <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={1.5}>
                                    <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px" }} />
                                    <Typography sx={{ color: "#999", fontSize: "13px", }}>Ta Quang Buu, Hai Ba Trung, Ha Noi</Typography>
                                </Box>
                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                                <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "15px" }}>Khach san dep, dich vu tot, nhan vien nhiet tinh</Typography>
                                <Box sx={{ border: ".5px  #CCC dashed" }} />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "orange" }}>Slide 2</SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "orange" }}>Slide 3</SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "orange" }}>Slide 4</SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "orange" }}>Slide 5</SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "orange" }}>Slide 6</SwiperSlide>
            </Swiper>

        </Box>
    )
}