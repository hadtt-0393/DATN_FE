import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  Modal,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { REACT_APP_CLOUDINARY_ENDPOINT } from '../../constants';
import { Form } from '../../models/Form';
import { getToken } from '../../services/token';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';

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
},`;

export default function CommentComponent({
  open,
  onClose,
  form,
  reFetch,
}: CommentComponentProps) {
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



  const feedbackDefault = {
    service: 4,
    cleanliness: 4,
    comfortable: 4,
    facilities: 4,
    content: '',
    image: '',
  };
  const [FormComment, setFormComment] = useState(
    form.comment ? form.comment : feedbackDefault,
  );
  const [file, setFile] = useState<any>(null);

  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleChangeComment = (value) => {
    setFormComment({
      ...FormComment,
      ...value,
    });
  };

  const uploadImg = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'stndhxae');
    const res = await axios.post(REACT_APP_CLOUDINARY_ENDPOINT, formData);
    return res.data.url;
  };

  const handleComment = () => {
    const token = getToken();
    const saveRoom = async () => {
      try {
        if (!file) {
          return;
        }
        const image = await uploadImg(file);
        handleChangeComment({ image: image })
        const createComment = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/form/createComment/${form._id}`,
          {
            ...FormComment,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success('Đánh giá thành công!', { autoClose: 2000 });
        reFetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    };
    saveRoom();
  };

  const closeModal = () => {
    onClose();
    if (!form.comment) {
      setFormComment(feedbackDefault)
    }
  };

  return (
    <Modal open={open} onClose={closeModal}
      BackdropProps={{
        onClick: (e) => e.stopPropagation(), // Ngăn không cho backdrop click đóng modal
      }} disableScrollLock>
      <Box
        bgcolor="white"
        borderRadius="5px"
        pb="30px"
        zIndex={100}
        width="50%"
        m="50px auto"
      >
        <Box m="0px 30px" borderBottom="#EEE 1px solid">
          <Typography
            fontWeight="600"
            color="#183C7D"
            fontSize="18px"
            padding="25px 0"
          >
            Nhận xét của bạn
          </Typography>
        </Box>
        <Box
          m="30px "
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={5}
          height="100%"
          borderBottom="#DDD 1px dashed"
          paddingBottom="20px"
        >
          <Box
            width="100%"
            flex={2}
            display="flex"
            gap={2}
            flexDirection="column"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '50px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '600',
                  mb: '6px',
                  whiteSpace: 'nowrap',
                  minWidth: '125px',
                }}
              >
                Vệ sinh
              </Typography>
              <Slider
                value={FormComment.cleanliness}
                style={{ pointerEvents: form.comment ? 'none' : 'auto' }}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={(e: any) =>
                  handleChangeComment({ cleanliness: e.target.value })
                }
                min={1}
                max={5}
                step={1}
                marks
                sx={{ height: '8px', color: '#3AACED', p: '0' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '50px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '600',
                  mb: '6px',
                  whiteSpace: 'nowrap',
                  minWidth: '125px',
                }}
              >
                Độ thoải mái
              </Typography>
              <Slider
                style={{ pointerEvents: form.comment ? 'none' : 'auto' }}
                value={FormComment.comfortable}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={(e: any) =>
                  handleChangeComment({ comfortable: e.target.value })
                }
                min={1}
                max={5}
                step={1}
                marks
                sx={{ height: '8px', color: '#3AACED', p: '0' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '50px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '600',
                  mb: '6px',
                  whiteSpace: 'nowrap',
                  minWidth: '125px',
                }}
              >
                Thái độ nhân viên
              </Typography>
              <Slider
                style={{ pointerEvents: form.comment ? 'none' : 'auto' }}
                value={FormComment.facilities}
                onChange={(e: any) =>
                  handleChangeComment({ facilities: e.target.value })
                }
                aria-label="Default"
                valueLabelDisplay="auto"
                min={1}
                max={5}
                step={1}
                marks
                sx={{ height: '8px', color: '#3AACED', p: '0' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '50px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '600',
                  mb: '6px',
                  whiteSpace: 'nowrap',
                  minWidth: '125px',
                }}
              >
                Cơ sở vật chất
              </Typography>
              <Slider
                style={{ pointerEvents: form.comment ? 'none' : 'auto' }}
                value={FormComment.service}
                onChange={(e: any) =>
                  handleChangeComment({ service: e.target.value })
                }
                aria-label="Default"
                valueLabelDisplay="auto"
                min={1}
                max={5}
                step={1}
                marks
                sx={{ height: '8px', color: '#3AACED', p: '0' }}
              />
            </Box>
          </Box>
          <Box display="flex" flex={1} height="150px">
            <Box
              bgcolor={'#f7f9fb'}
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              width="100%"
              border="#EEE 1px solid"
              borderRadius="10px"
            >
              <Typography color="#3AACED" fontSize="25px" fontWeight="600">
                {form.rating
                  ? form.rating
                  : Number.isInteger((
                    (FormComment.service +
                      FormComment.cleanliness +
                      FormComment.comfortable +
                      FormComment.facilities) /
                    4
                  )) ? (
                    (FormComment.service +
                      FormComment.cleanliness +
                      FormComment.comfortable +
                      FormComment.facilities) /
                    4
                  ) : (
                    (FormComment.service +
                      FormComment.cleanliness +
                      FormComment.comfortable +
                      FormComment.facilities) /
                    4
                  ).toFixed(2)}
              </Typography>
              <Typography
                color="#66686B"
                fontSize="15px"
                fontWeight="600"
                mt="10px"
              >
                Điểm của bạn
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          m="0px 30px"
          sx={{ textAlign: 'center' }}
          borderBottom="#DDD 1px dashed"
          pb="30px"
        >
          <TextField
            minRows={4}
            sx={{ width: '100%' }}
            placeholder="Nhập nhận xét của bạn"
            value={FormComment.content}
            disabled={form.comment ? true : false}
            onChange={(e: any) =>
              handleChangeComment({ content: e.target.value })
            }
            multiline
          />
        </Box>
        {!form.comment && (
          <Box display={'flex'} justifyContent="center" alignItems="center">
            {!file ?
              <PhotoSizeSelectActualOutlinedIcon sx={{ color: "#91CB63", fontSize: "200px" }} /> :
              <img
                src={URL.createObjectURL(file as any)}
                style={{
                  borderRadius: '20px',
                  marginTop: '20px',
                  width: '300px',
                  height: '200px',
                  objectFit: 'contain',
                }}
              />}
          </Box>
        )}
        {!form.comment && (
          <Box
            sx={{ textAlign: 'center' }}
            borderBottom="#DDD 1px dashed"
            pb="15px"
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                mt: 2,
                mb: 1,
                backgroundColor: '#3AACED',
                fontWeight: 600,
                fontSize: '14px',
                '&:hover': { backgroundColor: '#3AACED', opacity: '0.8' },
              }}
              size="large"
            >
              Chọn ảnh
              <VisuallyHiddenInput type="file" onChange={handleChangeFile} />
            </Button>
          </Box>
        )}
        {form.comment && (
          <Box
            display={'flex'} justifyContent="center" alignItems="center"
          >
            <Image src={FormComment.image} />
          </Box>
        )}
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box width="100%" m="30px 0 0 0" display="flex" justifyContent="center">
            {form.comment ? (
              <Button
                variant="contained"
                sx={{
                  width: '200px',
                  backgroundColor: '#F9C941',
                  fontWeight: '600',
                  fontSize: '16px',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                    opacity: '0.8',
                    backgroundColor: '#F9C941',
                  },
                }}
                onClick={onClose}
              >
                Đóng
              </Button>
            ) : (
              <Box display="flex" flexDirection="row" justifyContent="center" gap={5}>
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
                    backgroundColor: '#F9C941',
                    fontWeight: '600',
                    fontSize: '16px',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                      opacity: '0.8',
                      backgroundColor: '#F9C941',
                    },
                  }}
                  onClick={handleComment}
                >
                  Gửi nhận xét
                </Button>
              </Box>

            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
