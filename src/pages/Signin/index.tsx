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

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errEmail, setErrEmail] = useState(false)
    const [errPassword, setErrPassword] = useState(false)
    const { loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleInputChangeEmail = ((e: any) => {
        setEmail(e.target.value)
        if (e.target.value) {
            setErrEmail(false)
        }
    })

    const handleInputChangePassword = ((e: any) => {
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
                `${process.env.REACT_APP_API_ENDPOINT}/auth/login/`,
                {
                    email: email,
                    password: password,
                }
            );
            dispatch &&
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
            navigate('/');
        } catch (err: any) {
            dispatch &&
                dispatch({ type: 'LOGIN_FAIL', payload: err.response.data });
            toast.error(`${err.response.data.message}`, { toastId: 'LOGIN_FAIL' });
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
                                    {"Back to Homepage"}
                                </Link>
                            </Grid>
                        </Grid>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSignin}>
                            <TextField
                                margin="normal"
                                error={errEmail}
                                required
                                // helperText="Incorrect email"
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleInputChangeEmail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                error={errPassword}
                                // helperText="Incorrect password"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleInputChangePassword}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="error" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                // onClick={handleSignin}
                                disabled={loading}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2" >
                                        {"New User ? Create an Account"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>)


}

export default Signin;