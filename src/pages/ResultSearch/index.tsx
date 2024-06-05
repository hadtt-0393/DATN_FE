import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { Card, CardActionArea, CardContent, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Sliders from '../../components/Slider';
import { Hotel } from '../../models/Hotel';
import SearchBarFlexColumn from '../../pages/ResultSearch/SearchBarFlexColumn';
import Loading from '../../components/Loading/Loading';

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

const serviceHotelOptions = {
    gym: 'Phòng tập gym',
    pool: 'Bể bơi',
    parking: "Bãi đỗ xe",
    restaurant: 'Nhà hàng',
}

const serviceRoomOptions = {
    wifi: "Wifi",
    tv: "Tivi",
    airConditioning: "Điều hòa",
    bathroom: 'Phòng tắm',
}

const distanceOptions = {
    fiveKm: 5,
    tenKm: 10,
    fifteenKm: 15,
}



export default function SearchResultsPage() {

    const location = useLocation();
    const { state } = location

    const startDate = state.dates ? state.dates[0]?.startDate.toLocaleDateString('en-US') : null;
    const endDate = state.dates ? state.dates[0]?.endDate.toLocaleDateString('en-US') : null;

    const city = state.destination;
    const option = state.options ? state.options : { adult: null, children: null, room: null };
    const adult = option.adult;
    const children = option.children
    const room = option.room;

    const startDateProp = state.dates ? state.dates[0].startDate : null;
    const endDateProp = state.dates ? state.dates[0].endDate : null;

    const createUrl = () => {
        const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/hotel/getHotelBySearch?city=${city}`
        const startDateQuery = startDate != null ? `&startDate=${startDate}` : ''
        const endDateQuery = endDate != null ? `&endDate=${endDate}` : ''
        const adultQuery = adult != null ? `&adult=${adult}` : ''
        const childrenQuery = children != null ? `&children=${children}` : ''
        const roomQuery = room != null ? `&roomNumber=${room}` : ''

        const url = `${baseUrl}${startDateQuery}${endDateQuery}${childrenQuery}${roomQuery}${adultQuery}`
        return url;
    }

    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getHotels = async () => {
            const hotels = await axios.get(createUrl())
            setHotels(hotels.data)
            setLoading(false)
        }
        const timer = setTimeout(getHotels, 500);
        return () => clearTimeout(timer);
    }, [])

    const [startDateFilter, setStartDateFilter] = useState(startDate)
    const [endDateFilter, setEndDateFilter] = useState(endDate)
    const [cityFilter, setCityFilter] = useState(city)
    const [adultFilter, setAdultFilter] = useState(adult)
    const [childrenFilter, setChildrenFilter] = useState(children)
    const [roomFilter, setRoomFilter] = useState(room)



    const handleChangedata = (arg1, arg2) => {
        if (arg1 === 'date') {
            const stFilter = arg2[0].startDate.toLocaleDateString('en-US')
            const edFilter = arg2[0].endDate.toLocaleDateString('en-US')
            setStartDateFilter(stFilter)
            setEndDateFilter(edFilter)
        }
        if (arg1 === 'city') {
            setCityFilter(arg2)
        }
        if (arg1 === 'option') {
            setAdultFilter(arg2?.adult)
            setChildrenFilter(arg2?.children)
            setRoomFilter(arg2?.room)
        }
    }


    const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
    const [serviceHotel, setServiceHotel] = useState<any>({
        parking: false,
        restaurant: false,
        pool: false,
        gym: false,
    })

    const [serviceRoom, setServiceRoom] = useState<any>({
        wifi: false,
        tv: false,
        airConditioning: false,
        bathroom: false,
    })

    const [distance, setDistance] = useState<any>({
        fiveKm: false,
        tenKm: false,
        fifteenKm: false,
    })

    const changeSerivceHotel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceHotel({
            ...serviceHotel,
            [event.target.name]: event.target.checked,
        });
    };

    const changeSerivceRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceRoom({
            ...serviceRoom,
            [event.target.name]: event.target.checked,
        });
    };

    const changeDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistance({
            ...distance,
            [event.target.name]: event.target.checked,
        });
    };

    const getSelectedHotelServicesString = () => {
        return Object.keys(serviceHotel)
            .filter((key) => serviceHotel[key])
            .map((key) => serviceHotelOptions[key])
            .join(',');
    };

    const getSelectedRoomServicesString = () => {
        return Object.keys(serviceRoom)
            .filter((key) => serviceRoom[key])
            .map((key) => serviceRoomOptions[key])
            .join(',');
    };

    const getSelectedDistanceString = () => {
        return Object.keys(distance)
            .filter((key) => serviceRoom[key])
            .map((key) => distanceOptions[key])
            .join(',');
    };

    const getSelectedPriceRangString = () => {
        return `${priceRange[0]},${priceRange[1]}`;
    }

    const createUrlFilter = () => {
        const baseURL = `${process.env.REACT_APP_API_ENDPOINT}/hotel/getHotelByFilter?city=${cityFilter}&startDate=${startDateFilter}&endDate=${endDateFilter}&adult=${adultFilter}&children=${childrenFilter}&roomNumber=${roomFilter}`
        const serviceHotelQuery = getSelectedHotelServicesString() ? `&serviceHotel=${getSelectedHotelServicesString()}` : ''
        const serviceRoomQuery = getSelectedRoomServicesString() ? `&serviceRoom=${getSelectedRoomServicesString()}` : ''
        const distanceQuery = getSelectedDistanceString() ? `&distance=${getSelectedDistanceString()}` : ''
        const priceRangeQuery = (getSelectedPriceRangString() && getSelectedPriceRangString() !== '0,0') ? `&priceRange=${getSelectedPriceRangString()}` : ''
        const url = `${baseURL}${serviceHotelQuery}${serviceRoomQuery}${distanceQuery}${priceRangeQuery}`

        return url;
    }

    const handleFilter = async () => {
        setLoading(true)
        const Filter = async () => {
            const RequestFilter = await axios.get(createUrlFilter())
            setLoading(false)
            setHotels(RequestFilter.data.hotels)
        }
        const timer = setTimeout(Filter, 500);
        return () => clearTimeout(timer);
    }

    const value = 4
    const handleChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };
    function valuetext(value: number) {
        return `${value}VND`;
    }
    const navigate = useNavigate()

    return (
        <Box>
            <Navbar />
            <Header />
            <Sliders display={false} />
            <Box width="100%" bgcolor="#ECF6F8">
                <Box width="92%" maxWidth="1224px" m="30px auto" display="flex" gap={3} padding="50px 0" >
                    <Box flex="1" width="350px">
                        <Box bgcolor="white" borderRadius="5px" p="10px 0" >
                            <Box m="0px 15px">
                                <SearchBarFlexColumn city={city} startDate={startDateProp} endDate={endDateProp} option={option} handleChangedata={handleChangedata} />
                            </Box>
                            <Box m="20px 30px">
                                <Box paddingBottom="20px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" >
                                    <Typography fontSize="16px" fontWeight="600" color="#183C7D">Lọc</Typography>
                                </Box>
                                <Box paddingBottom="20px" borderBottom="1px solid #EEEEEE" mt="20px" >
                                    <Typography fontSize="13px" color="#878C9F" mb="10px" mt="20px">Khoảng giá (VND)</Typography>
                                    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography fontSize="12px" >0</Typography>

                                        <Typography fontSize="12px">1.000.000</Typography>
                                    </Stack>
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={priceRange}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        max={1000000}
                                        step={50000}
                                        marks
                                        getAriaValueText={valuetext}

                                    />
                                    <Typography fontSize="13px" color="#878C9F" mb="10px" mt="10px">Khoảng cách đến trung tâm thành phố</Typography>
                                    <Box >
                                        <Grid container spacing={1}>
                                            {Object.keys(distanceOptions).map((key) => (
                                                <Grid item xs={12} display="flex" flexDirection="row" alignItems="center" justifyContent="start" key={key}>
                                                    <Checkbox
                                                        sx={{
                                                            color: "#CCCCCC", width: "12px", height: "12px",
                                                            '&.Mui-checked': {
                                                                bgcolor: "#3AACED",
                                                                color: "#FFF",
                                                                border: "1px solid #CCC",
                                                                fill: "#3AACED"
                                                            },
                                                        }}
                                                        checked={distance[key]}
                                                        onChange={changeDistance}
                                                        name={key}
                                                    />
                                                    <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">{distanceOptions[key]}km</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>

                                    <Typography fontSize="13px" color="#878C9F" mb="10px" mt="20px">Dịch vụ khách sạn</Typography>
                                    <Box >
                                        <Grid container spacing={1}>
                                            {Object.keys(serviceHotelOptions).map((key) => (
                                                <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start" key={key}>
                                                    <Checkbox
                                                        sx={{
                                                            color: "#CCCCCC", width: "12px", height: "12px",
                                                            '&.Mui-checked': {
                                                                bgcolor: "#3AACED",
                                                                color: "#FFF",
                                                                border: "1px solid #CCC",
                                                                fill: "#3AACED"
                                                            },
                                                        }}
                                                        checked={serviceHotel[key]}
                                                        onChange={changeSerivceHotel}
                                                        name={key}
                                                    />
                                                    <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">{serviceHotelOptions[key]}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                    <Typography fontSize="13px" color="#878C9F" mb="10px" mt="20px">Dịch vụ phòng khách sạn</Typography>
                                    <Box>
                                        <Grid container spacing={1}>
                                            {Object.keys(serviceRoomOptions).map((key) => (
                                                <Grid item xs={6} display="flex" flexDirection="row" alignItems="center" justifyContent="start" key={key}>
                                                    <Checkbox
                                                        sx={{
                                                            color: "#CCCCCC", width: "12px", height: "12px",
                                                            '&.Mui-checked': {
                                                                bgcolor: "#3AACED",
                                                                color: "#FFF",
                                                                border: "1px solid #CCC",
                                                                fill: "#3AACED"
                                                            },
                                                        }}
                                                        checked={serviceRoom[key]}
                                                        onChange={changeSerivceRoom}
                                                        name={key}
                                                    />
                                                    <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">{serviceRoomOptions[key]}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>

                                <Box width="100%" m="30px 0px 20px 0px ">
                                    <Button onClick={handleFilter} variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", boxShadow: "none", padding: "10px", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} >Tìm kiếm</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex="2.5" display="flex" justifyContent="start" alignItems="start" flexDirection="column" >
                        <Box display="flex" flexDirection="row" mb="20px"  >
                            <Typography color="#958DA0" fontWeight="600" fontSize="20px" mr="10px">Kết quả tìm kiếm cho:  </Typography>
                            <Typography color="#3AACED" fontWeight="600" fontSize="20px">{state.destination}</Typography>
                        </Box>
                        <Box gap={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", flex: 1 }}>
                            <Grid container spacing={4}>
                                {hotels && hotels.map((item) => (
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
                                                        justifyContent: "end",
                                                        zIndex: 1,
                                                        pointerEvents: "none",
                                                        height: "100%",

                                                    }}>
                                                        {item.discount !== 0 && (
                                                            <Box display="flex" flex={1} flexDirection="column" justifyContent="start" alignItems="start">
                                                                <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#5ECFB1", margin: "20px 20px 10px 0px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                                                    <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá {item.discount}%</Typography>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                        {
                                                            item.ratingAvg !== 0 ? (
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
                                                            )
                                                                :
                                                                (
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            height: "30%",
                                                                            m: 2,
                                                                            justifyContent: "space-between",
                                                                        }}
                                                                    >
                                                                        <Typography sx={{ color: "#CCC", fontSize: "15px", fontWeight: "600" }}>Chưa có đánh giá</Typography>

                                                                    </Box>
                                                                )
                                                        }
                                                    </Box>
                                                </Box>
                                                <CardContent>
                                                    <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                                        {item.hotelName}
                                                    </Typography>
                                                    <Box display="flex" flexDirection="row" alignItems="start" gap={1} mb={1.5}>
                                                        <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px", mt: "2px" }} />
                                                        <Typography sx={{ color: "#999", fontSize: "13px", whiteSpace: "wrap", wordBreak: "break-word" }}>{item.address}</Typography>
                                                    </Box>
                                                    <Box sx={{ border: ".5px  #CCC dashed" }} />
                                                    <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.description}</Typography>
                                                    <Box display="flex" alignItems="center" justifyContent="start" mb="12px">
                                                        <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
                                                        <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                            {item && item.services.map((service, key) => (
                                                                <li style={{ display: "inline-block", marginRight: "5px", }} key={key}>{service},</li>
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
            <Loading loading={loading} />
        </Box >
    )
}