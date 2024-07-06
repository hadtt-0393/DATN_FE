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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FooterComponent, HeaderComponent, LoadingComponent, NavbarComponent, SliderComponent } from '../../components';
import { Hotel } from '../../models/Hotel';
import { Service } from '../../models/Service';
import SearchBarFlexColumn from '../../pages/ResultSearch/SearchBarFlexColumn';
import { previousDay } from 'date-fns';
import { devNull } from 'os';
import { convertNumber } from '../../utils/convert';

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

const getLabel = (value: number): string => {
    if (value >= 0 && value < 1) return 'Rất kém';
    if (value >= 1 && value < 2) return 'Kém';
    if (value >= 2 && value < 3) return 'Trung bình';
    if (value >= 3 && value < 4) return 'Khá';
    if (value >= 4 && value < 4.5) return 'Tốt';
    if (value >= 4.5 && value <= 5) return 'Rất tốt';
    return '';
};

const theme = createTheme({
    palette: {
        info: {
            main: '#000',
        },
    }
});

const distanceOptions = {
    fiveKm: 5,
    tenKm: 10,
    fifteenKm: 15,
}

export default function SearchResultsPage() {
    const location = useLocation();
    const { state } = location
    let { city } = useParams();

    const currentDate = new Date();
    const startDateDefault = currentDate.toLocaleDateString('en-US');
    const endDateDefault = new Date(currentDate.getTime() + 86400000).toLocaleDateString('en-US');
    const optionDefault = {
        adult: 2,
        children: 0,
        room: 1,
    }

    const startDate = state ? state.dates[0]?.startDate.toLocaleDateString('en-US') : startDateDefault;
    const endDate = state ? state.dates[0]?.endDate.toLocaleDateString('en-US') : endDateDefault;
    const option = state ? state.options : optionDefault;
    const adult = option.adult;
    const children = option.children;
    const room = option.room;


    const startDateProp = state ? state.dates[0].startDate : currentDate;
    const endDateProp = state ? state.dates[0].endDate : new Date(currentDate.getTime() + 86400000);
    const optionProp = state ? state.options : optionDefault;

    const [cityFilter, setCityFilter] = useState(city)
    const [startDateFilter, setStartDateFilter] = useState(startDate)
    const [endDateFilter, setEndDateFilter] = useState(endDate)
    const [adultFilter, setAdultFilter] = useState(adult)
    const [childrenFilter, setChildrenFilter] = useState(children)
    const [roomFilter, setRoomFilter] = useState(room)
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [serviceHotelOptions, setServiceHotelOptions] = useState<Service[]>([]);
    const [serviceRoomOptions, setServiceRoomOptions] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);

    const createUrl = () => {
        const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/hotel/getHotelBySearch?city=${city}`
        const startDateQuery = `&startDate=${startDate}`
        const endDateQuery = `&endDate=${endDate}`
        const adultQuery = `&adult=${adult}`
        const childrenQuery = `&children=${children}`
        const roomQuery = `&roomNumber=${room}`
        const url = `${baseUrl}${startDateQuery}${endDateQuery}${childrenQuery}${roomQuery}${adultQuery}`
        return url;
    }


    useEffect(() => {
        setLoading(true)
        const getHotels = async () => {
            const hotels = await axios.get(createUrl())
            const servicesHotelSystem = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/serviceHotel/getAllServiceHotelSystem`)
            const servicesRoomSystem = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/serviceRoom/getAllServiceRoomSystem`)
            setHotels(hotels.data)
            setServiceHotelOptions(servicesHotelSystem.data)
            setServiceRoomOptions(servicesRoomSystem.data)
            setLoading(false)
        }
        const timer = setTimeout(getHotels, 500);
        return () => clearTimeout(timer);
    }, [])

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
    const [serviceHotel, setServiceHotel] = useState<string[]>([])
    const [serviceRoom, setServiceRoom] = useState<string[]>([])
    const [distance, setDistance] = useState<any>({
        fiveKm: false,
        tenKm: false,
        fifteenKm: false,
    })

    const changeSerivceHotel = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setServiceHotel((prev) => [...prev, event.target.name])
        }
        else {
            setServiceHotel((prev) => prev.filter(item => item !== event.target.name))
        }
    };

    const changeSerivceRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setServiceRoom((prev) => [...prev, event.target.name])
        }
        else {
            setServiceRoom((prev) => prev.filter(item => item !== event.target.name))
        }
    };

    const changeDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistance({
            ...distance,
            [event.target.name]: event.target.checked,
        });
        console.log(distance)
    };

    const getSelectedHotelServicesString = () => {
        return serviceHotel.join(',')
    };

    const getSelectedRoomServicesString = () => {
        return serviceRoom.join(',')
    };

    const getSelectedDistanceString = () => {
        return Object.keys(distance)
            .filter((key) => distance[key])
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
            setHotels(RequestFilter.data)
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

    const openDetailHotel = (item) => {
        navigate(`/hotel/${item._id}`, { state: { startDate: startDateFilter, endDate: endDateFilter, adult: adultFilter, children: childrenFilter, room: roomFilter } });
    }

    return (
        <Box>
            <NavbarComponent />
            <HeaderComponent />
            <SliderComponent display={false} />
            <Box width="100%" bgcolor="#ECF6F8">
                <Box width="92%" maxWidth="1224px" m="30px auto" display="flex" gap={3} padding="50px 0" >
                    <Box flex="1" width="350px">
                        <Box bgcolor="white" borderRadius="5px" p="10px 0" >
                            <Box m="0px 15px">
                                <SearchBarFlexColumn city={city} startDate={startDateProp} endDate={endDateProp} option={optionProp} handleChangedata={handleChangedata} />
                            </Box>
                            <Box m="20px 30px">
                                <Box paddingBottom="20px" border="1px solid #EEEEEE" borderTop="none" borderLeft="none" borderRight="none" >
                                    <Typography fontSize="16px" fontWeight="600" color="#183C7D">Lọc</Typography>
                                </Box>
                                <Box paddingBottom="20px" borderBottom="1px solid #EEEEEE" mt="20px" >
                                    <Typography fontSize="13px" color="#000" mb="10px" mt="20px">Khoảng giá (VND)</Typography>
                                    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography fontSize="12px" sx={{ color: "#878C9F" }} >0</Typography>

                                        <Typography fontSize="12px" sx={{ color: "#878C9F" }}>1.000.000</Typography>
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
                                    <Typography fontSize="13px" color="#000" mb="10px" mt="10px">Khoảng cách đến trung tâm thành phố</Typography>
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

                                    <Typography fontSize="13px" color="#000" mb="10px" mt="20px">Dịch vụ khách sạn</Typography>
                                    <Box >
                                        <Grid container spacing={1}>
                                            {serviceHotelOptions.map((serviceHotel, key) => (
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
                                                        onChange={changeSerivceHotel}
                                                        name={serviceHotel._id}
                                                    />
                                                    <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">{serviceHotel.serviceName}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                    <Typography fontSize="13px" color="#000" mb="10px" mt="20px">Dịch vụ phòng khách sạn</Typography>
                                    <Box>
                                        <Grid container spacing={1}>
                                            {serviceRoomOptions.map((serviceRoom, key) => (
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
                                                        onChange={changeSerivceRoom}
                                                        name={serviceRoom._id}
                                                    />
                                                    <Typography fontSize="13px" color="#878C9F" whiteSpace="nowrap" ml="10px">{serviceRoom.serviceName}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>

                                <Box width="100%" m="30px 0px 20px 0px ">
                                    <Button onClick={handleFilter} variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", boxShadow: "none", padding: "10px", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} >Lọc</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex="2.5" display="flex" justifyContent="start" alignItems="start" flexDirection="column" >
                        {hotels.length > 0 &&
                            <Box display="flex" flexDirection="row" mb="20px"  >
                                <Typography color="#18458B" fontWeight="600" fontSize="20px" mr="7px">Tìm thấy tại {city}: {hotels.length} khách sạn </Typography>
                            </Box>
                        }

                        {hotels.length === 0 &&
                            <Box display="flex" flexDirection="row" mb="20px"  >
                                <Typography color="#18458B" fontWeight="600" fontSize="20px" mr="7px">Không tìm thấy khách sạn tại {city}</Typography>

                            </Box>
                        }
                        <Box gap={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", flex: 1 }}>
                            <Grid container spacing={4}>
                                {hotels.length > 0 && hotels.map((item) => (
                                    <Grid item xs={12} key={item._id}>
                                        <Card sx={{ ml: .5, border: "1px solid #A3D7FC", mr: .5, boxShadow: "none" }} >
                                            <CardActionArea sx={{ display: "flex", flexDirection: "row", alignItems: "start" }} >
                                                <Box overflow="hidden" borderRadius="5px" position="relative" width="40%" m={1.5} >
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
                                                        {item.discount !== 0 && (
                                                            <Box display="flex" flex={1} flexDirection="column" justifyContent="start" alignItems="start">
                                                                <Box width="110px" height="35px" sx={{ display: "flex", backgroundColor: "#5ECFB1", margin: "20px 20px 10px 0px", alignSelf: "end", alignItems: "center", justifyContent: "center" }}>
                                                                    <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>Giảm giá {item.discount}%</Typography>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                        {
                                                            item?.ratingAvg ? (
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
                                                                            <Typography sx={{ color: "#FEFEFE", fontSize: "11px" }}>{item.countComments} bình luận</Typography>

                                                                        </Box>
                                                                        <Box bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px 10px 10px 0px" margin="5px" flex={1}>
                                                                            <Box sx={{ display: "flex", margin: "5px", fontSize: "13px", textTransform: "unset", textWrap: "nowrap", borderRadius: "10px 10px 10px 0px", height: "50px", backgroundColor: "#18458B", width: "50px", alignItems: "center", justifyContent: "center" }} >
                                                                                <Typography sx={{ fontSize: "13px", color: "white", fontWeight: "600", }}>{Number.isInteger(item.ratingAvg) ? item.ratingAvg : item.ratingAvg.toFixed(2)}</Typography>
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
                                                <CardContent sx={{ display: "flex", flex: "1", flexDirection: "column" }}>
                                                    <Typography gutterBottom component="div" sx={{ color: "#46A5DC", fontSize: "18px", fontWeight: "600" }}>
                                                        {item.hotelName}
                                                    </Typography>
                                                    <Box display="flex" flexDirection="row" alignItems="start" gap={1} mb={1.5}>
                                                        <LocationOnRoundedIcon sx={{ color: "#F9B90F", fontSize: "16px", mt: "2px" }} />
                                                        <Typography sx={{ color: "#999", fontSize: "13px", whiteSpace: "wrap", wordBreak: "break-word" }}>{item.address}</Typography>
                                                    </Box>
                                                    <Box sx={{ border: ".5px  #CCC dashed" }} />
                                                    <Typography sx={{ color: "#999", fontSize: "13px", mt: "15px", mb: "12px" }}>{item.description}</Typography>
                                                    <Box display="flex" alignItems="start" justifyContent="start" mb="12px">
                                                        <SupportAgentRoundedIcon sx={{ color: "red", fontSize: "16px", my: "5px" }} />
                                                        <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px", color: "#3AACED", lineHeight: "30px" }}>
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
                                                                <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", marginLeft: "5px" }}>{convertNumber(item.cheapestPrice)}VND</Typography>
                                                            </Box>
                                                            <Button variant="contained" sx={{ fontSize: "13px", textTransform: "unset" }} onClick={() => openDetailHotel(item)}>Xem chi tiết</Button>
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
            <LoadingComponent loading={loading} />
            <FooterComponent />
        </Box >
    )
}