import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Card, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const provinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái"
];

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errUsername, setErrUsername] = useState(false)
    const [errEmail, setErrEmail] = useState(false)
    const [errPassword, setErrPassword] = useState(false)
    const [errConfirmPassword, setErrConfirmPassword] = useState(false)
    const [errPhone, setErrPhone] = useState(false)
    const [errCity, setErrCity] = useState(false)
    const [helperText, setHelperText] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

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
        console.log(username, email, password, confirmPassword, phone, city)
        if (!username || !email || !password || !confirmPassword || !phone || !city) {
            !username ? setErrUsername(true) : null
            !email ? setErrEmail(true) : null
            !password ? setErrPassword(true) : null
            !confirmPassword ? setErrConfirmPassword(true) : null
            !phone ? setErrPhone(true) : null
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
                `${process.env.REACT_APP_API_ENDPOINT}/auth/user/signup`,
                {
                    username: username,
                    email: email,
                    password: password,
                    phoneNumber: phone,
                    city: city,
                },
            );

            navigate('/signin');
            toast.success('Đăng ký thành công!');
        } catch (err: any) {
            toast.error(err.response.data.message);
            setIsLoading(false);
        }

    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {

        disableScrollLock: true,

        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    useEffect(() => {
        const rasa = document.getElementById("rasa-chat-widget-container");
        if (!rasa) return;
        rasa.style.display = "none";
        return () => {
          rasa.style.display = "block";
        };
      }, []);

    return (
        <Box
            sx={{
                bgcolor: "#13366E",
                height: "100vh"
            }}
        >
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
                }}
            >
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
                        <Typography variant="h5" textTransform="uppercase" mb="20px" fontWeight={600}>Đăng ký</Typography>
                    </Box>
                    <Box component="form" noValidate onSubmit={handleSignup}>
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
                            autoComplete="current-password"
                            onChange={handleChangeInputPassword}
                            type={showPassword ? 'text' : 'password'}
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
                        <TextField
                            margin="normal"
                            error={errConfirmPassword}
                            required
                            fullWidth
                            name="confirm password"
                            label="Xác nhận lại mật khẩu"
                            helperText={helperText ? 'Mật khẩu không khớp' : undefined}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            onChange={handleChangeInputConfirmPassword}
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

                        <FormControl sx={{ width: "100%", mt: "15px" }}>
                            <InputLabel id="demo-multiple-name-label">
                                Thành phố/Tỉnh
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                onChange={handleChangeInputCity}
                                input={<OutlinedInput label="Thành phố/Tỉnh" />}
                                MenuProps={MenuProps}
                                error={errCity}
                            >
                                {provinces.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 4 }}>
                            <Typography variant="body1">
                                Bạn đã có tài khoản?
                                <Link variant="subtitle1" sx={{ ml: 0.5 }} onClick={() => navigate("/signin")} underline='none' style={{ cursor: "pointer" }}>
                                    Đăng nhập ngay
                                </Link>
                            </Typography>
                        </Stack>

                        <Box display="flex" justifyContent='center' alignItems='center'>
                            <Button variant="contained" sx={{ textTransform: "uppercase", fontWeight: "600", width: "100%" }} disabled={isLoading} size='large' type="submit">Đăng ký</Button>
                        </Box>
                    </Box>
                </Card>

            </Stack>
        </Box>
    )


}

export default Signup;