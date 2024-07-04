import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface DescriptionHotelProps {
    description: string;
}
export default function DescriptionHotel({description} : DescriptionHotelProps) {
    return (
        <Box bgcolor="white" mt="30px" borderRadius="5px">
            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                    Về khách sạn
                </Typography>
            </Box>
            <Box m="0px 30px" >
                <Typography color="#878C9F" fontSize="13px" padding="25px 0">
                    {description}
                </Typography>

            </Box>
        </Box>
    )
}