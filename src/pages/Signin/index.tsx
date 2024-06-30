import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Card, IconButton, InputAdornment, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from '../../context/AuthContext';

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errEmail, setErrEmail] = useState(false)
    const [errPassword, setErrPassword] = useState(false)
    const { loading, error, dispatch } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleChangeInputEmail = ((e: any) => {
        setEmail(e.target.value)
        if (e.target.value) {
            setErrEmail(false)
        }
    })

    const handleChangeInputPassword = ((e: any) => {
        setPassword(e.target.value)
        if (e.target.value) {
            setErrPassword(false)
        }
    })

    const handleSignin = async (e: any) => {
        e.preventDefault();
        if (!email || !password) {
            !email ? setErrEmail(true) : null
            !password ? setErrPassword(true) : null
            return;
        }

        dispatch && dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/auth/user/signin/`,
                {
                    email: email,
                    password: password,
                }
            );
            const { message, accessToken, ...rest } = res.data;
            dispatch &&
                dispatch({ type: 'LOGIN_SUCCESS', payload: rest });
            toast.success("Đăng nhập thành công!", { autoClose: 2000 })
            localStorage.setItem("accessToken", JSON.stringify(accessToken))
            navigate('/');
        } catch (err: any) {
            dispatch &&
                dispatch({ type: 'LOGIN_FAIL', payload: err.response.data });
            toast.error(`${err.response.data.message}`, { toastId: 'LOGIN_FAIL', autoClose: 2000 },);
        }

    }

    useEffect(() => {
        const rasa = document.getElementById("rasa-chat-widget-container");
        if (!rasa) return;
        rasa.style.display = "none";
        return () => {
          rasa.style.display = "block";
        };
      }, []);

    return (
        <Box sx={{
            bgcolor: "#13366E",
            height: "100vh"
        }}>
            <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/08/logo.png" alt="logo"
                style={{
                    height: "35px", width: "133px", cursor: "pointer", position: 'fixed',
                    top: "50px",
                    left: "40px",
                }} onClick={() => navigate("/")} />
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Card
                    sx={{
                        mt: 15,
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                        borderRadius: "20px"
                    }}
                >
                    <Box display="flex" justifyContent='center' alignItems='center'>
                        <Typography variant="h5" textTransform="uppercase" mb="20px" fontWeight={600}>Đăng nhập</Typography>
                    </Box>
                    <Box component="form" noValidate onSubmit={handleSignin}>
                        <TextField
                            margin="normal"
                            error={errEmail}
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChangeInputEmail}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={errPassword}
                            name="password"
                            label="Mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            onChange={handleChangeInputPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 4 }}>
                            <Typography variant="body1">
                                Bạn chưa có tài khoản?
                                <Link variant="subtitle1" sx={{ ml: 0.5 }} onClick={() => navigate("/signup")} underline='none' style={{ cursor: "pointer" }}>
                                    Đăng ký ngay
                                </Link>
                            </Typography>

                        </Stack>

                        <Box display="flex" justifyContent='center' alignItems='center'>
                            <Button variant="contained" sx={{ textTransform: "uppercase", fontWeight: "600", width: "100%" }} size='large' type="submit">Đăng nhập</Button>
                        </Box>

                    </Box>
                </Card>
            </Stack>
        </Box>
    )
}

export default Signin;