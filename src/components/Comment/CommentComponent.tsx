import { Box, Button, Modal, Slider, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';

export default function CommentComponent({ open, onClose }: any) {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleClose = ()=>{
        onClose()
    }
    return (
        <Modal open={open} onClose={onClose} disableScrollLock>
            <Box bgcolor="white" borderRadius="5px" pb="30px" zIndex={100} width="50%" m="120px auto">
                <Box m="0px 30px" borderBottom="#EEE 1px solid">
                    <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                        Nhận xét của bạn
                    </Typography>
                </Box>
                <Box m="30px " display="flex" justifyContent="center" alignItems="center" gap={5} height="100%" borderBottom="#DDD 1px dashed" paddingBottom="20px">
                    <Box width="100%" flex={2} display="flex" gap={2} flexDirection="column"  >
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px", whiteSpace: "nowrap", minWidth: "125px" }}>Vệ sinh</Typography>
                            <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} step={1} marks sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px", whiteSpace: "nowrap", minWidth: "125px" }}>Độ thoải mái</Typography>
                            <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} step={1} marks sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px", whiteSpace: "nowrap", minWidth: "125px" }}>Thái độ nhân viên</Typography>
                            <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} step={1} marks sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                            <Typography sx={{ fontSize: "14px", color: "#666", fontWeight: "600", mb: "6px", whiteSpace: "nowrap", minWidth: "125px" }}>Cơ sở vật chất</Typography>
                            <Slider defaultValue={4.5} aria-label="Default" valueLabelDisplay="auto" min={1} max={5} step={1} marks sx={{ height: "8px", color: "#3AACED", p: "0" }} />
                        </Box>
                    </Box>
                    <Box display="flex" flex={1} height="150px">
                        <Box bgcolor={"#f7f9fb"} height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" width="100%" border="#EEE 1px solid" borderRadius="10px">
                            <Typography color="#3AACED" fontSize="25px" fontWeight="600">4.5</Typography>
                            <Typography color="#66686B" fontSize="15px" fontWeight="600" mt="10px">Điểm của bạn</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box m="30px" sx={{ textAlign: "center" }} borderBottom="#DDD 1px dashed" pb="30px">
                    <TextField minRows={4} sx={{ width: "100%" }} placeholder="Nhập nhận xét của bạn" multiline />
                </Box>
                <Box sx={{ textAlign: "center" }} borderBottom="#DDD 1px dashed" pb="15px">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ mb: 2, backgroundColor: "#3AACED", fontWeight: 600, fontSize: "14px", "&:hover": { backgroundColor: "#3AACED", opacity: "0.8" } }}
                        size='large'

                    >
                        Chọn ảnh
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box width="200px" m="30px 0 0 0" >
                        <Button variant="contained" sx={{ width: "100%", backgroundColor: "#F9C941", fontWeight: "600", fontSize: "16px", boxShadow: "none", "&:hover": { boxShadow: "none", opacity: "0.8", backgroundColor: "#F9C941" } }} onClick={onClose}>Gửi nhận xét</Button>
                    </Box>
                </Box>

            </Box>
        </Modal>

    )
}