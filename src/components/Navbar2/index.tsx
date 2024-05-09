import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Fab from '@mui/material/Fab';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Avatar from "@mui/material/Avatar";

export default function Navbar2() {
    return (
        <Box sx={{ backgroundColor: "#18458B", position:"fixed", zIndex:10, top:0, width:"100%" }}>
            <Box sx={{ display: "flex", width: "92%", height: "60px", margin: "0 auto", alignItems: "center", maxWidth: "1224px", justifyContent: "space-between "}}>
                <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/08/logo.png" alt="logo" style={{ height: "35px", width: "133px" }} />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", "&:hover": { cursor: "pointer" } }}>
                    <Fab variant="extended" sx={{ fontWeight: 700, fontSize: "12px", backgroundColor: "#F9B90F", color: "white", marginRight: "25px", "&:hover": { backgroundColor: "#FAC73F" } }} size="small" >
                        <ListAltIcon sx={{ mr: 1, fontSize: "14px" }} />
                        Danh sách phòng
                    </Fab>
                    <Box display="flex" flexDirection="row" alignItems="center" border=" 1px solid rgba(0, 0, 0, 0.21)" height="60px" p="0 25px" >
                        <Avatar sx={{ mr: 1, width: "24px", height: "24px" }} />
                        <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "600", "&:hover": { color: "#F9B90F" } }}>Thu Ha</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" border="1px solid rgba(0, 0, 0, 0.21)" height="60px" p="0 25px" sx={{borderLeft:0}}>
                        <LogoutIcon sx={{ color: "#3295d7", mr: 1, fontSize: "14px", }} />
                        <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "600", "&:hover": { color: "#F9B90F" } }}>Đăng xuất</Typography>
                    </Box>
                    {/* <Box display="flex" flexDirection="row" alignItems="center" border="1px solid rgba(0, 0, 0, 0.21)" height="60px" p="0 25px" >
                        <LoginIcon sx={{ color: "#3295d7", mr: 1, fontSize: "14px", }} />
                        <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "500", "&:hover": { color: "#F9B90F" } }}>Đăng nhập</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" border=" 1px solid rgba(0, 0, 0, 0.21)" height="60px" p="0 25px" sx={{ borderLeft: 0 }}>
                        <PersonAddAltIcon sx={{ color: "#3295d7", mr: 1, fontSize: "14px", }} />
                        <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "500", "&:hover": { color: "#F9B90F" } }}>Đăng ký</Typography>
                    </Box> */}

                </Box>

            </Box>
        </Box >
    )
}