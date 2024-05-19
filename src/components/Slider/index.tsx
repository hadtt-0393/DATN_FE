import Box from "@mui/material/Box";
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
import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import SearchBar2 from "../SearchBar2";

export default function Slider() {
    const [value, setValue] = useState('');
    const navigate = useNavigate()

    return (
        <Box sx={{ mt: "110px", height: "600px", width: "100%", position: "relative" }}>
            <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/10/22.jpg" alt="slider-image" style={{ width: "100%", height: "600px", objectFit: "cover" }} />
            <Box sx={{
                position: "absolute",
                top: 0,
                width: " 100%",
                height: "600px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box width="92%" height="50%" display="flex" alignItems="center" margin="0 auto" maxWidth="1224px" justifyContent="center" flexDirection="column">
                    <Box m="10px">
                        <StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} /><StarRateRoundedIcon fontSize="medium" sx={{ color: "#F9B90F" }} /><StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} />
                    </Box>
                    <Typography sx={{ fontSize: "44px", fontWeight: "700", fontFamily: "Nunito,sans-serif", color: "white" }}>Hệ Thống Đặt Phòng Khách Sạn EasyBook </Typography>
                    <Box width="5%" bgcolor="#F9B90F" height="4px" borderRadius="2px" m="15px" />
                    <Typography variant="h6" sx={{ color: "white", mb: "30px" }}>Hãy bắt đầu khám phá Việt Nam cùng EasyBook</Typography>


                    <Box width="75%" bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px">
                        {/* <Box maxWidth="1140px" bgcolor="#EEE" height="50px" display="flex" alignItems="center" justifyContent="space-between" m="10px">
                            <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%" sx={{ minWidth: "250px" }}>
                                <NotListedLocationOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                <Input disableUnderline sx={{ fontSize: "13px", flex: "1" }} placeholder="Khách sạn, Thành phố..." />
                            </Box>
                            <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%" sx={{ minWidth: "250px" }} justifyContent="space-between">
                                <EventAvailableOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                             
                            </Box>
                            <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%" sx={{ minWidth: "250px" }} >
                                <Groups2OutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                                <FormControl variant="standard" sx={{ flex: 1, mr: 1, backgroundColor: "#EEE" }}>
                                    <Select disableUnderline value={value} label="Child" sx={{ fontSize: "13px", flex: "1", height: "100%", backgroundColor: "#EEE" }}>
                                        <MenuItem value="Người lớn" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} onClick={(e) => e.preventDefault}>
                                            <Typography fontSize="13px">Người lớn</Typography>
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
                                        </MenuItem>
                                        <MenuItem value="Trẻ em" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Typography fontSize="13px">Trẻ em</Typography>
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
                                        </MenuItem>
                                        <MenuItem value="Phòng" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                                            <Typography fontSize="13px">Phòng</Typography>
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
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                            </Box>
                            <Box display="flex" flex="1" height="100%" alignItems="center" justifyContent="center" sx={{ backgroundColor: "#F9B90F", m: "0 auto","&:hover":{cursor:"pointer", opacity:"0.8"} }} onClick={() => navigate('/search-results')}>
                                <Typography sx={{ fontSize: "13px", color: "white" }}>Tìm kiếm</Typography>
                                <ZoomInOutlinedIcon fontSize="small" sx={{ color: "white", pl: 1 }} />
                            </Box>

                        </Box> */}
                        <SearchBar />
                        {/* <SearchBar2 /> */}
                    </Box>

                </Box>
            </Box>
        </Box >
    )
}