import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar";
import CloseIcon from '@mui/icons-material/Close';
import Stack from "@mui/material/Stack";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

export default function BoxChat({ close }) {
    const handleClick = () => {
        close();
    }
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", position: 'absolute', bottom: 0, right: 20, width: "338px", height: "455px", boxShadow: "0px 0px 2px 0px #666", borderRadius: "8px 8px 0 0", zIndex: 1000, backgroundColor: "white" }} >
                <Stack sx={{ width: "100%", height: "44px", boxShadow: "0px 0px 2px 0px #999", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: "8px 8px 0 0" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <Avatar sx={{ width: "32px", height: "32px", marginLeft: "6px" }} src="http://res.cloudinary.com/di7a7sbbn/image/upload/v1672199903/upload/fhwsrbvth4kyczeu0isj.jpg" />
                        <Typography variant="subtitle1" fontWeight="600" marginLeft='8px'>Thu Ha Hotel</Typography>
                    </Box>
                    <Box onClick={handleClick} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <CloseIcon color="primary" sx={{ width: "28px", height: "28px", mr: "3px" }} />
                    </Box>
                </Stack>
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-end" }}>
                    <Box sx={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        position: "relative",
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            overflowY: "auto",
                            maxHeight: "calc(100vh)",
                            position: "absolute",
                            top: "0",
                            bottom: "0",
                            width: "100%",
                            scrollBehavior: "smooth"
                        }}>
                            <Box sx={{ display: "flex", alignSelf: "start", maxWidth: "60%", m: 1, backgroundColor: "#ddd", padding: "10px", borderRadius: "15px" }}>
                                <Typography sx={{ wordBreak: "break-word" }}>Hello, Can I help you?</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignSelf: "end", maxWidth: "60%", m: 1, backgroundColor: "#1976d2", padding: "10px", borderRadius: "15px" }}>
                                <Typography sx={{ color: "white", wordBreak: "break-word" }}>I want to book hotel in Hanoi</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignSelf: "start", maxWidth: "60%", m: 1, backgroundColor: "#ddd", padding: "10px", borderRadius: "15px" }}>
                                <Typography sx={{ wordBreak: "break-word" }}>Which day do you want to checkin?(DD/MM/YYYY)</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignSelf: "end", maxWidth: "60%", m: 1, backgroundColor: "#1976d2", padding: "10px", borderRadius: "15px" }}>
                                <Typography sx={{ color: "white", wordBreak: "break-word" }}>I want to checkin 10/05/2024</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignSelf: "start", maxWidth: "60%", m: 1, backgroundColor: "#ddd", padding: "10px", borderRadius: "15px" }}>
                                <Typography sx={{ wordBreak: "break-word" }}>Which day do you want to checkout?(DD/MM/YYYY)</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignSelf: "end", maxWidth: "60%", m: 1, backgroundColor: "#1976d2", padding: "10px", borderRadius: "15px" }}>
                                <Typography sx={{ color: "white", wordBreak: "break-word" }}>I want to checkout 12/05/2024</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignSelf: "start", maxWidth: "60%", m: 1, backgroundColor: "#ddd", padding: "10px", borderRadius: "15px" }}>
                                <Typography sx={{ wordBreak: "break-word" }}>How many people are you booking for?</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignSelf: "end", maxWidth: "60%", m: 1, backgroundColor: "#1976d2", padding: "10px", borderRadius: "15px" }}>
                                <Typography sx={{ color: "white", wordBreak: "break-word" }}>4 persons</Typography>
                            </Box>
                        </Box>

                    </Box>

                    <OutlinedInput
                        id="outlined-basic"
                        endAdornment={<SendIcon sx={{ color: "#1976d2", opacity: 0.7, "&:hover": { color: "#1976d2", opacity: 1, cursor: "pointer", } }} />}
                        aria-describedby="outlined-weight-helper-text"
                        sx={{ m: 0.5 }}
                        placeholder="Aa"
                    />
                </Box>
            </Box>
        </>
    )
}