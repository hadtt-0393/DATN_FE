import {
    Box,
    Button,
    Modal,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Form } from '../../models/Form';
import HouseIcon from '@mui/icons-material/House';
import { getToken } from '../../services/token';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import PaidIcon from '@mui/icons-material/Paid';
import BoyIcon from '@mui/icons-material/Boy';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

interface CommentComponentProps {
    onClose: () => void;
    open: boolean;
    form: Form;
    reFetch: () => void;
}
const Image = styled.img`
    margin-top: 20px;
    width: 300px;
    objectFit: contain;
    border-radius: 20px;
    heigh: 200px;
    transition: transform 0.5s ease-in-out;
    &:hover{
        transform: scale(1.1);
        cursor: pointer;
},`

export default function CommentComponent({ onClose, open, form, reFetch }: CommentComponentProps) {
    const handleCancle = () => {
        const token = getToken();
        const cancleForm = async () => {
            try {
                const createComment = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/form/cancleForm`,
                    {
                        id: form._id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                toast.success('Hủy đặt phòng thành công!', { autoClose: 2000 });
                reFetch();
                onClose();
            } catch (error) {
                console.log(error);
            }
        };
        cancleForm();
    }
    return (
        <Modal open={open} BackdropProps={{
            onClick: (e) => e.stopPropagation(),
        }} disableScrollLock>
            <Box>
                <Box
                    border="1px solid #A3D7FC"
                    borderRadius="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    bgcolor="#FFF"
                    height="40%"
                    pb="30px"
                    zIndex={100}
                    width="60%"
                    m="50px auto"
                    flexDirection="column"
                >
                    <Box display="flex" flexDirection="row">
                        <Box
                            flex={1.5}
                            overflow="hidden"
                            borderRadius="10px"
                            margin="auto 50px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Image src={form.hotel.images[0]} />
                        </Box>
                        <Box
                            flex={2}
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
                                        {form.paymentStatus}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="center" gap={5} bgcolor={'white'} mt="20px">
                        <Button
                            variant="contained"
                            sx={{
                                width: '200px',
                                backgroundColor: "#3AACED",
                                fontWeight: '600',
                                fontSize: '16px',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                    opacity: '0.8',
                                    backgroundColor: "#3AACED",
                                },
                            }}
                            onClick={onClose}
                        >
                            Đóng
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                width: '200px',
                                backgroundColor: 'green',
                                fontWeight: '600',
                                fontSize: '16px',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                    opacity: '0.8',
                                    backgroundColor: 'green',
                                },
                            }}
                            onClick={handleCancle}
                        >
                            Xác nhận hủy
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Modal>
    )
}
