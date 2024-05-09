import Box from "@mui/material/Box";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Typography from "@mui/material/Typography"
import TextField from "@mui/material//TextField";
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';

export default function Slider() {
    return (
        <Box sx={{ mt: "110px", height: "600px", width: "100%" }}>
            <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/10/22.jpg" alt="slider-image" style={{ width: "100%", height: "600px", objectFit: "cover" }} />
            <Box sx={{
                position: "absolute",
                top: 110,
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
                        <StarRateRoundedIcon fontSize="small" sx={{ color: "white" }} /><StarRateRoundedIcon fontSize="medium" sx={{ color: "#F9B90F" }} /><StarRateRoundedIcon fontSize="small" sx={{ color: "white" }} />
                    </Box>
                    <Typography sx={{ fontSize: "44px", fontWeight: "700", fontFamily: "Nunito,sans-serif", color: "white" }}>Hệ Thống Đặt Phòng Khách Sạn EasyBook </Typography>
                    <Box width="5%" bgcolor="#F9B90F" height="4px" borderRadius="2px" m="15px" />
                    <Typography variant="h6" sx={{ color: "white", mb: "30px" }}>Hãy bắt đầu khám phá Việt Nam cùng EasyBook</Typography>
                    <Box width="75%" maxWidth="1140px" bgcolor="#EEE" height="50px" border="10px solid #7B6F65" borderRadius="10px" display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%">
                            <NotListedLocationOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                            <input placeholder="Khách sạn, Thành phố..." style={{ display: "flex", fontSize: "15px", border: "none", backgroundColor: "#EEE", height: "100%", flex: 1, padding: 0 }} />
                        </Box>
                        <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%">
                            <EventAvailableOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                            {/* <TextField placeholder="Ngày đến - Ngày đi..."
                                InputProps={{
                                    style: {
                                        fontSize: "13px",
                                        border: "none"
                                    }
                                }} /> */}
                            <input placeholder="Ngày đến - Ngày đi..." style={{ display: "flex", fontSize: "15px", border: "none", backgroundColor: "#EEE", height: "100%", flex: 1, padding: 0 }} />
                        </Box>
                        <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%">
                            <Groups2OutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
                            {/* <TextField placeholder="Người lớn, phòng..."
                                InputProps={{
                                    style: {
                                        fontSize: "13px",
                                        borderColor: "#EEE"
                                    }
                                }} /> */}
                            <input placeholder="Người lớn, phòng..." style={{ display: "flex", fontSize: "15px", border: "none", backgroundColor: "#EEE", height: "100%", flex: 1, padding: 0 }} />
                        </Box>
                        <Box display="flex" height="100%" alignItems="center" sx={{ backgroundColor: "#F9B90F", p: "0 30px" }}>
                            <Typography sx={{ fontSize: "13px", color: "white" }}>Tìm kiếm</Typography>
                            <ZoomInOutlinedIcon fontSize="small" sx={{ color: "white", pl: 1 }} />
                        </Box>

                    </Box>

                </Box>
            </Box>
        </Box >
    )
}