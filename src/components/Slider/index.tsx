import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function Slider({ display }) {
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
                    <Box width="5%" bgcolor="#F9B90F" height="4px" borderRadius="2px" m="25px" />
                    <Typography variant="h6" sx={{ color: "white", mb: "30px" }}>Hãy bắt đầu khám phá Việt Nam cùng EasyBook</Typography>
                    <Box width="75%" bgcolor="rgba(255, 255, 255, 0.25)" borderRadius="10px">
                        <SearchBar display={display} />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}