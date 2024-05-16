import { Box } from "@mui/material";
import Navbar2 from "../Navbar2";
import Header2 from "../Header2";

export default function BookingPage() {
    return (
        <Box>
            <Navbar2 />
            <Header2 />
            <Box marginTop="150px" bgcolor="#ECF6F8" height="100vh" >
                <Box width="92%" maxWidth="1224px" m="0 auto">
                    <h1>Booking Page</h1>
                </Box>

            </Box>
        </Box>
    )
}