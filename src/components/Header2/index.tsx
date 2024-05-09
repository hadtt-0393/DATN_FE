import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Fab from '@mui/material/Fab';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Avatar from "@mui/material/Avatar";
import HouseIcon from '@mui/icons-material/House';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { NavLink } from "react-router-dom";

export default function Header2() {
    return (
        <Box sx={{ backgroundColor: "#18458B", position: "fixed", zIndex: 10, top: "60px", width: "100%", border: " 1px solid rgba(0, 0, 0, 0.21)" }}>
            <Box sx={{ display: "flex", width: "92%", height: "50px", margin: "0 auto", alignItems: "center", maxWidth: "1224px", justifyContent: "start" }}>
                <NavLink to="/">
                    <Box display="flex" flexDirection="row" alignItems="center" border=" 1px solid rgba(0, 0, 0, 0.21)" height="50px" p="0 15px" sx={{ borderTop: 0 }} >
                        <HouseIcon sx={{ fontSize: "20px", color: "#308FD1", "&:hover": { color: "#F9B90F", cursor: "pointer" } }} />
                    </Box>
                </NavLink>
                <NavLink to="/">
                    <Box display="flex" flexDirection="row" alignItems="center" height="50px" p="0 30px" >
                        <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "600", "&:hover": { color: "#F9B90F", cursor: "pointer" } }}>Trang chủ</Typography>
                    </Box>
                </NavLink>
                <NavLink to="/about-us">
                    <Box display="flex" flexDirection="row" alignItems="center" height="50px" >
                        <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "600", "&:hover": { color: "#F9B90F", cursor: "pointer" } }}>Về chúng tôi</Typography>
                    </Box>
                </NavLink>



            </Box>
        </Box >
    )
}