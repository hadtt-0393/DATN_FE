import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    const accountName = 'Nguyen Van A'; // Thay thế bằng thông tin tài khoản thực tế
    const amount = 1000000; // Thay thế bằng số tiền thực tế
    const paymentDate = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    return (
        <Box sx={{ margin: "200px auto" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ color: '#67C23A', fontSize: 50 }} />
                <Typography variant="h5" sx={{ mt: 2, color: '#67C23A', fontWeight: "600" }}>
                    Giao Dịch Thanh Toán Thành Công
                </Typography>
                
                <Typography fontWeight="600" color="#676767" mt="30px" fontSize="20px">
                    <Link to="/reservations">Xem danh sách phòng đã đặt</Link>
                </Typography>

            </Box>

        </Box>

    );
};

export default PaymentSuccess;
