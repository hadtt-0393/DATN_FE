import Box from "@mui/material/Box";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid";
import styled from 'styled-components';
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

declare module '@mui/material/styles' {
    interface PaletteColor {
        darker?: string;
    }

    interface SimplePaletteColorOptions {
        darker?: string;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#18458B',
        },
    }
});

const Image = styled.img`
    width: 100%;
    objectFit: cover;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    ZIndex:2;
    &:hover{
        transform: scale(1.2);
        cursor: pointer;
},`
export default function PopularPlacesComponent() {

    const navigate = useNavigate()

    return (
        <ThemeProvider theme={theme}>
            <Box width="100%" display="flex" flexDirection="column" m="60px auto" >
                <Box display="flex" alignItems="center" margin="0 auto" maxWidth="1224px" flexDirection="column" width="92%">
                    <Box m="10px">
                        <StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} /><StarRateRoundedIcon fontSize="medium" sx={{ color: "#F9B90F" }} /><StarRateRoundedIcon fontSize="small" sx={{ color: "#D0DBDB" }} />
                    </Box>
                    <Typography sx={{ fontSize: "24px", fontWeight: "700", fontFamily: "Nunito,sans-serif", color: "#18458B" }}>Những Địa Điểm Nổi Bật</Typography>
                    <Box width="5%" bgcolor="#3AACED" height="4px" borderRadius="2px" m="25px 0" />
                    <Typography sx={{ color: "#878C9F", mb: "30px", fontSize: "13px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
                </Box>
                <Box sx={{ height: "900px", flex: 1, width: "95%", margin: "10px auto" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Box display="flex" alignItems="center" justifyContent="center" height="460px" overflow="hidden" borderRadius="10px" position="relative" onClick={() => navigate("/city/Đà Lạt")}>
                                <Image src="https://wnfdiary.com/wp-content/uploads/2021/11/Dalat-vietnam-7.jpg" alt="da_lat" />
                                <Box sx={{
                                    position: "absolute",
                                    top: 0,
                                    width: " 100%",
                                    height: "460px",
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    zIndex: 1,
                                    pointerEvents: "none",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "end",

                                }}>
                                    <Box marginLeft="20px" >
                                        <Link sx={{ color: "white", fontWeight: "500", fontSize: "24px", textDecoration: "none" }}> Đà Lạt</Link>
                                        <Typography sx={{ color: "#F9F9FA", mb: "30px", fontSize: "13px", marginTop: "20px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
                                    </Box>

                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box display="flex" alignItems="center" justifyContent="center" height="410px" overflow="hidden" borderRadius="10px" position="relative" onClick={() => navigate("/city/Hải Phòng")}>
                                <Image src="https://asialegend.travel/wp-content/uploads/2023/12/The-springtime-of-Hai-Phong-City-is-bright-and-enjoyable-making-it-the-best-occasion-to-visit.jpg" alt="hai_phong" />
                                <Box sx={{
                                    position: "absolute",
                                    top: 0,
                                    width: " 100%",
                                    height: "410px",
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "end",
                                    zIndex: 1,
                                    pointerEvents: "none",

                                }}>
                                    <Box marginLeft="20px" >
                                        <Link sx={{ color: "white", fontWeight: "500", fontSize: "24px", textDecoration: "none" }}>Hải Phòng</Link>
                                        <Typography sx={{ color: "#F9F9FA", mb: "30px", fontSize: "13px", marginTop: "20px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" alignItems="center" justifyContent="center" height="415px" overflow="hidden" borderRadius="10px" position="relative" onClick={() => navigate("/city/Quảng Ninh")}>
                                <Image src="https://cf.bstatic.com/xdata/images/city/500x400/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=" alt="quang_ninh" />
                                <Box sx={{
                                    position: "absolute",
                                    top: 0,
                                    width: " 100%",
                                    height: "415px",
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "end",
                                    zIndex: 1,
                                    pointerEvents: "none",
                                }}>
                                    <Box marginLeft="20px" >
                                        <Link sx={{ color: "white", fontWeight: "500", fontSize: "24px", textDecoration: "none" }}>Quảng Ninh</Link>
                                        <Typography sx={{ color: "#F9F9FA", mb: "30px", fontSize: "13px", marginTop: "20px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" alignItems="center" justifyContent="center" height="380px" overflow="hidden" borderRadius="10px" marginTop="-50px" position="relative"
                                onClick={() => navigate("/city/Hà Nội")}>
                                <Image src="https://q-xx.bstatic.com/xdata/images/city/500x400/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=" alt="ha_noi" />
                                <Box sx={{
                                    position: "absolute",
                                    top: 0,
                                    width: " 100%",
                                    height: "380px",
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "end",
                                    zIndex: 1,
                                    pointerEvents: "none",
                                }}>
                                    <Box marginLeft="20px" >
                                        <Link sx={{ color: "white", fontWeight: "500", fontSize: "24px", textDecoration: "none" }}>Hà Nội</Link>
                                        <Typography sx={{ color: "#F9F9FA", mb: "30px", fontSize: "13px", marginTop: "20px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" alignItems="center" justifyContent="center" height="420px" overflow="hidden" borderRadius="10px" marginTop="-50px" position="relative" onClick={() => navigate("/city/Nha Trang")} >
                                <Image src="https://cf.bstatic.com/xdata/images/city/500x400/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=" alt="nha_trang" />
                                <Box sx={{
                                    position: "absolute",
                                    top: 0,
                                    width: " 100%",
                                    height: "420px",
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "end",
                                    zIndex: 1,
                                    pointerEvents: "none",
                                }}>
                                    <Box marginLeft="20px" >
                                        <Link sx={{ color: "white", fontWeight: "500", fontSize: "24px", textDecoration: "none" }}>Nha Trang</Link>
                                        <Typography sx={{ color: "#F9F9FA", mb: "30px", fontSize: "13px", marginTop: "20px" }}>Hãy trải nghiệm những địa điểm nổi bật này cùng EasyBook</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>

    )
}