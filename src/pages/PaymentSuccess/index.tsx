import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
                <Typography fontWeight="600" color="#676767" mt="20px">THÔNG TIN GIAO DỊCH</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, width: "20%", gap: "30px" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Typography variant="body1">Nội dung thanh toán:</Typography>
                        <Typography variant="body1">Đặt phòng khách sạn</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Typography variant="body1">Cổng thanh toán:</Typography>
                        <Typography variant="body1">Stripe</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Typography variant="body1">Mã đơn hàng:</Typography>
                        <Typography variant="body1">KS224900</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Typography variant="body1">Số tiền thanh toán:</Typography>
                        <Typography variant="body1">224.900 VND</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Typography variant="body1">Ngày giờ thanh toán:</Typography>
                        <Typography variant="body1">
                            {paymentDate}
                        </Typography>
                    </Box>


                </Box>
            </Box>

        </Box>

    );
};

export default PaymentSuccess;
