import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

interface ServicesHotelProps {
    services: string[];
}
export default function ServicesHotel({ services }: ServicesHotelProps) {
    return (
        <Box bgcolor="white" mt="30px" borderRadius="5px">
            <Box m="0px 30px" borderBottom="#EEE 1px solid">
                <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                    Dịch vụ
                </Typography>
            </Box>
            <Box m="30px" display="flex" justifyContent="start" alignItems="center" pb="30px" flexWrap="wrap" gap={3}>
                {services.map((service, key) => (
                    <Box display="flex" flexDirection="row" lineHeight="1.3" alignItems="center" key={key}>
                        <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                        <Typography fontSize="14px" fontWeight="600" color="#8894B5" ml="10px" >{service}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}