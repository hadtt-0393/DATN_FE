import Box from "@mui/material/Box";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Typography from "@mui/material/Typography"
import "./style.css"
import { useNavigate } from "react-router-dom";

export default function BecomeOwner() {
    const navigate = useNavigate()
    return (
        <Box width="100%" display="flex" flexDirection="column" m="0px auto" bgcolor="yellow" padding="50px 0" sx={{ backgroundColor: "#ECF6F8" }} className="container">
            <Box display="flex" alignItems="center" margin="0 auto" maxWidth="1224px" flexDirection="column" width="92%">
                <Box m="10px">
                    <StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} /><StarRateRoundedIcon fontSize="medium" sx={{ color: "#F9B90F" }} /><StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} />
                </Box>
                <Typography sx={{ fontSize: "24px", fontWeight: "700", fontFamily: "Nunito,sans-serif", color: "#18458B" }}>Bạn Có Muốn Trở Thành Chủ Một Khách Sạn?</Typography>
                <Box width="5%" bgcolor="#3AACED" height="4px" borderRadius="2px" m="25px 0" />
                <Typography sx={{ color: "#878C9F", mb: "30px", fontSize: "13px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" className="becomeAHotel" onClick={() => navigate("/signup")}>
                <button >
                    <h6>
                        Đăng ký ngay
                    </h6>
                </button>
            </Box>
        </Box>
    )
}