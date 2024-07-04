import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import { convertNumber } from '../../utils/convert';

interface AnalysisHotelProps {
    totalRooms: number;
    countForms: number;
    distance: number;
}
export default function AnlysisHotel(props: AnalysisHotelProps) {
    const { totalRooms, countForms, distance } = props;
    return (
        <Box display="flex" flexDirection="row" bgcolor="#FFF" height="105px" mt="50px" justifyContent="space-between" alignItems="center" borderRadius="5px">
            <Box flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                <HotelOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                <Typography color="#999EA5" fontSize="12px" fontWeight="600">{totalRooms} Phòng</Typography>
            </Box>
            <Box borderLeft="#E2E2E2 solid 1px" flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                <GroupsOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                <Typography color="#999EA5" fontSize="12px" fontWeight="600">{convertNumber(countForms)} Lượt đặt phòng</Typography>
            </Box>
            <Box borderLeft="#E2E2E2 solid 1px" flex={1} height="100%" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                <DirectionsCarOutlinedIcon sx={{ color: "#3AACED", width: "60px", height: "50px", opacity: 0.7, mb: "10px" }} />
                <Typography color="#999EA5" fontSize="12px" fontWeight="600">Cách Trung Tâm Thành Phố {distance} Km</Typography>
            </Box>
        </Box>
    )
}