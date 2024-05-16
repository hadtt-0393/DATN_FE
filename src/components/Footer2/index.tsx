import Box from "@mui/material/Box";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Typography from "@mui/material/Typography"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { Link } from "@mui/material";

export default function Footer2() {
    return (
        <Box width="100%" display="flex" flexDirection="column" m="0px auto" bgcolor="#18458B" padding="50px 0">
            <Box display="flex" alignItems="center" margin="0 auto" maxWidth="1224px" flexDirection="column" width="50%">
                <Box m="10px">
                    <StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} /><StarRateRoundedIcon fontSize="medium" sx={{ color: "#F9B90F" }} /><StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} />
                </Box>
                <Typography sx={{ fontSize: "24px", fontWeight: "700", fontFamily: "Nunito,sans-serif", color: "white" }}>Về Chúng Tôi</Typography>
                <Box width="5%" bgcolor="#3AACED" height="4px" borderRadius="2px" m="25px 0" />
                <Typography sx={{ color: "#EEE", mb: "30px", fontSize: "14px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook. Ở đây, chúng tôi cam kết là nơi giúp bạn tìm kiếm địa điểm nhanh nhất, có nhiều ưu đãi nhất và đặc biệt là được hỗ trợ nhanh nhẩt khi bạn có thấc mắc cần giải đáp. Hãy tin tường và lựa chọn website của chúng tôi nhé!!!</Typography>
                <Box display="flex" flexDirection="column" alignItems="start" justifyContent="start" gap={2} border="1px #496CA4 dashed" width="100%" padding="20px 0" borderLeft="none" borderRight="none">
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <EmailOutlinedIcon sx={{ color: "#F2B12F", mr: "10px" }} />
                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Email:  </Typography>
                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>easybook@thuhahust.eco.vn</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <RoomOutlinedIcon sx={{ color: "#F2B12F", mr: "10px" }} />
                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Địa chỉ:  </Typography>
                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>Số 1 - Đại Cồ Việt - Hai Bà Trưng - Hà Nội</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <PhoneOutlinedIcon sx={{ color: "#F2B12F", mr: "10px" }} />
                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700", mr: "10px" }}>Hotline:  </Typography>
                        <Typography sx={{ color: "#C2D8D7", fontSize: "14px", fontWeight: "700" }}>034 492 4268</Typography>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="start" justifyContent="start" gap={2} width="100%" padding="20px 0 0 0">
                    <Typography sx={{ color: "white", fontSize: "16px", fontWeight: "700" }}>Hãy tìm kiếm chúng tôi tại: </Typography>
                    <FacebookOutlinedIcon sx={{color:"#3AACED"}}/>
                </Box>
            </Box>
        </Box>
    )
}