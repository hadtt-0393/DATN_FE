import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import HouseIcon from '@mui/icons-material/House';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import PaidIcon from '@mui/icons-material/Paid';
import BoyIcon from '@mui/icons-material/Boy';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Button } from '@mui/material';
import { useState } from 'react';
import CommentComponent from '../../components/Comment/CommentComponent';
import CancleForm from '../../components/CancleForm/CancleForm';

interface ReservationProps {
  form: any;
  refetch: () => void;
}
const Image = styled.img`
    width: 100%;
    objectFit: cover;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    &:hover{
        transform: scale(1.1);
        cursor: pointer;
},`;
export default function Reservation({ form, refetch }: ReservationProps) {
  const [openModal, setOpenModal] = useState(false);
  const [isModalCancle, setIsModalCancle] = useState(false);

  const getIsEnableComment = () => {
    const current = new Date().getTime()
    const endForm = new Date(form.endDate).getTime()
    return current - endForm > 86400000;
  }

  const getIsEnableCancle = () => {
    const current = new Date().getTime()
    const startForm = new Date(form.startDate).getTime()
    return current - startForm < 86400000;
  }

  const openModalCancle = () => {
    setIsModalCancle(true);
  }



  const reFetch = () => {
    refetch();
  };
  return (
    <Grid item xs={12}>
      <Box
        border="1px solid #A3D7FC"
        borderRadius="10px"
        display="flex"
        alignItems="start"
        justifyContent="space-between"
        bgcolor="#FFF"
        height="100%"
      >
        <Box
          flex={1.5}
          overflow="hidden"
          borderRadius="10px"
          margin="auto 15px"
          borderRight="1px solid #DDD"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={form.hotel.images[0]} />
        </Box>
        <Box
          flex={2}
          border="1px dashed #DDD"
          borderTop="none"
          borderBottom="none"
          height="100%"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <HouseIcon sx={{ color: '#F9B90F', fontSize: '30px' }} />
            <Typography color="#999" fontSize="18px" ml="15px">
              {form.hotel.hotelName}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <PersonIcon sx={{ color: '#F9B90F', fontSize: '30px' }} />
            <Typography color="#999" fontSize="18px" ml="15px">
              {form.name}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <RoomIcon sx={{ color: '#F9B90F', fontSize: '30px' }} />
            <Typography color="#999" fontSize="18px" ml="15px">
              {form.address}
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="start"
          >
            <DoorBackIcon sx={{ color: '#F9B90F', fontSize: '30px' }} />

            <Box borderRadius="5px" ml="15px">
              {form.Rooms.map((room) => {
                return (
                  <Typography
                    color="#999"
                    fontSize="18px"
                    mb={form.Rooms.length > 1 ? '10px' : '0px'}
                  >
                    {room.quantity} x {room.roomName}
                  </Typography>
                );
              })}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <PaidIcon sx={{ color: '#F9B90F', fontSize: '30px' }} />
            <Typography color="#999" fontSize="18px" ml="15px">
              {form.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
            </Typography>
          </Box>
        </Box>
        <Box flex={2}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="start"
              alignItems="center"
            >
              <BoyIcon sx={{ color: '#3AACED', fontSize: '30px' }} />
              <Typography color="#999" fontSize="18px" ml="20px">
                Người lớn: {form.adults}
              </Typography>
            </Box>
            {(form.children !== 0) &&
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="start"
                ml="30px"
                alignItems="center"
              >
                <ChildCareIcon sx={{ color: '#3AACED', fontSize: '30px' }} />
                <Typography color="#999" fontSize="18px" ml="20px">
                  Trẻ em : {form.children}
                </Typography>
              </Box>}
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <TodayIcon sx={{ color: '#3AACED', fontSize: '30px' }} />
            <Typography color="#999" fontSize="18px" ml="20px">
              Ngày nhận phòng:{' '}
              {new Date(form.startDate).toLocaleDateString('en-GB')}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <InsertInvitationIcon sx={{ color: '#3AACED', fontSize: '30px' }} />
            <Typography color="#999" fontSize="18px" ml="20px">
              Ngày trả phòng:{' '}
              {new Date(form.endDate).toLocaleDateString('en-GB')}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <EditCalendarIcon sx={{ color: '#3AACED', fontSize: '30px' }} />
            <Typography color="#999" fontSize="18px" ml="20px">
              Ngày đặt phòng: {new Date(form.updatedAt).toLocaleString('en-GB')}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            m="20px"
            alignItems="center"
          >
            <PaidIcon sx={{ color: '#3AACED', fontSize: '30px' }} />
            <Box
              bgcolor={
                form.paymentStatus === 'Thanh toán khi nhận phòng'
                  ? '#F1C40F'
                  : '#3AACED'
              }
              borderRadius="5px"
              padding="4px 8px"
              ml="20px"
            >
              <Typography color="#FFF" fontSize="18px" fontWeight="600">
                {form.paymentStatus === "Canceled" ? "Đã hủy đặt phòng" : form.paymentStatus}
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="end"
            m="20px"
            alignItems="center"
          >
            {form.comment && (
              <Button
                variant="outlined"
                sx={{ bgcolor: '', fontWeight: '600' }}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                {' '}
                Xem đánh giá của bạn
              </Button>
            )}
            {!form.comment && getIsEnableComment() && (
              <Button
                variant="outlined"
                sx={{ bgcolor: '', fontWeight: '600' }}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                {' '}
                Đánh giá tại đây
              </Button>
            )}
            {getIsEnableCancle() && form.paymentStatus !== "Canceled" && (
              <Button
                variant="contained"
                color="error"
                sx={{ fontWeight: '600' }}
                onClick={openModalCancle}
              >
                {' '}
                Hủy đặt phòng
              </Button>
            )}
            <CommentComponent
              open={openModal}
              onClose={() => setOpenModal(false)}
              form={form}
              reFetch={reFetch}
            />
            <CancleForm open={isModalCancle} onClose={() => setIsModalCancle(false)} form={form} reFetch={reFetch} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
