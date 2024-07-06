import ListAltIcon from '@mui/icons-material/ListAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Fab from '@mui/material/Fab';
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';

export default function NavbarComponent() {
    const { user, dispatch, loading } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch && dispatch({ type: 'LOGOUT' });
        toast.success("Đăng xuất thành công", { autoClose: 2000 })
        navigate('/');
    };

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                mr: 1, width: "30px", height: "30px", fontSize: "14px"
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Box sx={{ backgroundColor: "#18458B", position: "fixed", zIndex: 10, top: 0, width: "100%" }}>
            <Box sx={{ display: "flex", width: "92%", height: "60px", margin: "0 auto", alignItems: "center", maxWidth: "1224px", justifyContent: "space-between " }}>
                <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/08/logo.png" alt="logo" style={{ height: "35px", width: "133px", cursor: "pointer" }} onClick={() => navigate("/")} />
                {user ? (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", "&:hover": { cursor: "pointer" } }}>
                        <Fab variant="extended" sx={{ fontWeight: 700, fontSize: "12px", backgroundColor: "#F9B90F", color: "white", marginRight: "25px", boxShadow: "none", "&:hover": { backgroundColor: "#FAC73F", boxShadow: "none" } }} size="small" onClick={() => navigate("/reservations")}>
                            <ListAltIcon sx={{ mr: 1, fontSize: "14px" }} />
                            Danh sách đặt phòng
                        </Fab>
                        <Box display="flex" flexDirection="row" alignItems="center" border=" 1px solid rgba(0, 0, 0, 0.21)" height="60px" p="0 25px" >
                            <Avatar  {...stringAvatar(user.username)} />
                            <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "600", "&:hover": { color: "#F9B90F" } }}>{user.username}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" border="1px solid rgba(0, 0, 0, 0.21)" height="60px" p="0 25px" sx={{ borderLeft: 0 }}>
                            <LogoutIcon sx={{ color: "#3295d7", mr: 1, fontSize: "14px", }} />
                            <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "600", "&:hover": { color: "#F9B90F" } }} onClick={handleLogout}>Đăng xuất</Typography>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", "&:hover": { cursor: "pointer" } }}>
                        <Box display="flex" flexDirection="row" alignItems="center" border="1px solid rgba(0, 0, 0, 0.21)" height="60px" p="0 25px" onClick={() => navigate("/signin")}>
                            <LoginIcon sx={{ color: "#3295d7", mr: 1, fontSize: "14px", }} />
                            <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "500", "&:hover": { color: "#F9B90F" } }}>Đăng nhập</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" border=" 1px solid rgba(0, 0, 0, 0.21)" height="60px" p="0 25px" sx={{ borderLeft: 0 }}>
                            <PersonAddAltIcon sx={{ color: "#3295d7", mr: 1, fontSize: "14px", }} />
                            <Typography sx={{ color: "#fff", fontSize: "14px", fontFamily: "Nunito, sans-serif", fontWeight: "500", "&:hover": { color: "#F9B90F" } }} onClick={() => navigate("/signup")}>Đăng ký</Typography>
                        </Box>
                    </Box>

                )}
            </Box>
        </Box >
    )
}