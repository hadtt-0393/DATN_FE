import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from "react-toastify";
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { set } from 'date-fns';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errUsername, setErrUsername] = useState(false)
    const [errEmail, setErrEmail] = useState(false)
    const [errPassword, setErrPassword] = useState(false)
    const [errConfirmPassword, setErrConfirmPassword] = useState(false)
    const [errPhone, setErrPhone] = useState(false)
    const [errCountry, setErrCountry] = useState(false)
    const [errCity, setErrCity] = useState(false)
    const [helperText, setHelperText] = useState(false)

    const navigate = useNavigate()

    const handleChangeInputEmail = (e: any) => {
        setEmail(e.target.value)
        if (e.target.value) {
            setErrEmail(false)
        }
    }

    const handleChangeInputPassword = (e: any) => {
        setPassword(e.target.value)
        if (e.target.value) {
            setErrPassword(false)
        }
    }

    const handleChangeInputConfirmPassword = (e: any) => {
        setConfirmPassword(e.target.value)
        if (e.target.value) {
            setErrConfirmPassword(false)
            setHelperText(false)
        }
    }

    const handleChangeInputUsername = (e: any) => {
        setUsername(e.target.value)
        if (e.target.value) {
            setErrUsername(false)
        }
    }

    const handleChangeInputCountry = (e: any) => {
        setCountry(e.target.value)
        if (e.target.value) {
            setErrCountry(false)
        }
    }

    const handleChangeInputCity = (e: any) => {
        setCity(e.target.value)
        if (e.target.value) {
            setErrCity(false)
        }
    }

    const handleChangeInputPhone = (e: any) => {
        setPhone(e.target.value)
        if (e.target.value) {
            setErrPhone(false)
        }
    }

    const handleSignup = async (e: any) => {
        e.preventDefault()
        console.log(username, email, password, confirmPassword, phone, country, city)
        if (!username || !email || !password || !confirmPassword || !phone || !country || !city) {
            !username ? setErrUsername(true) : null
            !email ? setErrEmail(true) : null
            !password ? setErrPassword(true) : null
            !confirmPassword ? setErrConfirmPassword(true) : null
            !phone ? setErrPhone(true) : null
            !country ? setErrCountry(true) : null
            !city ? setErrCity(true) : null
            console.log('log')
            return;
        }
        if (confirmPassword !== password) {
            setHelperText(true)
            setErrConfirmPassword(true)
            return;
        }
        setIsLoading(true)
        try {
            await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/auth/signup`,
                {
                    username: username,
                    email: email,
                    password: password,
                    phone: phone,
                    country: country,
                    city: city,
                },
            );

            navigate('/signin');
            toast.success('Registered account succeeded');
        } catch (err: any) {
            toast.error(err.response.data.message);
            setIsLoading(false);
        }

    }

    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', }}>
                <CssBaseline />
                <Grid
                    item
                    xs={6}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={6} component={Paper} elevation={6} square sx={{ display: "grid", alignItems: "center" }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Grid container sx={{ mb: 5 }}>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2" >
                                    {"Trở lại trang chủ"}
                                </Link>
                            </Grid>
                        </Grid>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" fontWeight="600">
                            ĐĂNG KÝ
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSignup}>
                            <TextField
                                margin="normal"
                                error={errUsername}
                                required
                                fullWidth
                                name="username"
                                label="Tên đầy đủ"
                                autoFocus
                                autoComplete="username"
                                onChange={handleChangeInputUsername}
                            />
                            <TextField
                                margin="normal"
                                error={errEmail}
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={handleChangeInputEmail}
                            />
                            <TextField
                                margin="normal"
                                error={errPassword}
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChangeInputPassword}
                            />
                            <TextField
                                margin="normal"
                                error={errConfirmPassword}
                                required
                                fullWidth
                                name="confirm password"
                                label="Xác nhận lại mật khẩu"
                                helperText={helperText ? 'Password and Confirm password are not the same' : undefined}
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChangeInputConfirmPassword}
                            />
                            <TextField
                                margin="normal"
                                error={errPhone}
                                required
                                fullWidth
                                name="phone"
                                label="Số điện thoại"
                                autoComplete="phone"
                                type="text"
                                onChange={handleChangeInputPhone}
                            />

                            <TextField
                                margin="normal"
                                error={errCity}
                                required
                                fullWidth
                                name="city"
                                label="Thành phố"
                                autoComplete="city"
                                onChange={handleChangeInputCity}
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="error" />}
                                label="Đăng ký là chủ khách sạn?"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontWeight:"600" }}
                                disabled={isLoading}
                            >
                                Đăng ký
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">

                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signin" variant="body2" >
                                        {"Bạn đã có tài khoản? Đăng nhập ngay!"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>)


}

export default Signup;