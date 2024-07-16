import Box from '@mui/material/Box';
import { Rating } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Typography from '@mui/material/Typography';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

interface SubHeaderHotelProps {
  data: any;
}
export default function SubHeaderHotel({ data }: SubHeaderHotelProps) {
  const getLabel = (value: number): string => {
    if (value >= 0 && value < 1) return 'Rất kém';
    if (value >= 1 && value < 2) return 'Kém';
    if (value >= 2 && value < 3) return 'Trung bình';
    if (value >= 3 && value < 4) return 'Khá';
    if (value >= 4 && value < 4.5) return 'Tốt';
    if (value >= 4.5 && value <= 5) return 'Rất tốt';
    return '';
  };
  return (
    <Box
      sx={{ mt: '110px', height: '600px', width: '100%', position: 'relative' }}
    >
      <img
        src={data.images[0]}
        alt="slider-image"
        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          width: ' 100%',
          height: '600px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Box
          width="92%"
          height="50%"
          display="flex"
          alignItems="center"
          margin="0 auto"
          maxWidth="1224px"
          justifyContent="end"
          flexDirection="column"
          sx={{ maxWidth: '1224px' }}
        >
          <Box
            border="1px #999 solid"
            borderLeft="none"
            borderRight="none"
            borderTop="none"
            p="20px 0px"
            flexDirection="row"
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '60%',
              m: 2,
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box>
              {data.ratingAvg && (
                <Rating
                  name="text-feedback"
                  value={data.ratingAvg}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarBorderOutlinedIcon
                      style={{ color: '#FAC73F', fontSize: '18px' }}
                    />
                  }
                  sx={{ fontSize: '18px', color: '#FAC73F' }}
                />
              )}

              <Typography
                sx={{
                  color: '#FEFEFE',
                  fontSize: '44px',
                  fontWeight: '600',
                  mt: '20px',
                }}
              >
                {data.hotelName}
              </Typography>
              <Box
                width="5%"
                bgcolor="#3AACED"
                height="4px"
                borderRadius="2px"
                m="20px 0"
              />
              <Box
                display="flex"
                flexDirection="row"
                alignItems="start"
                justifyContent="start"
                gap={2}
                width="100%"
                padding="20px 0"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <EmailOutlinedIcon sx={{ color: '#3A9FC3', mr: '10px' }} />
                  <Typography
                    sx={{
                      color: '#C2D8D7',
                      fontSize: '14px',
                      fontWeight: '700',
                      mr: '10px',
                    }}
                  >
                    Email:{' '}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#C2D8D7',
                      fontSize: '14px',
                      fontWeight: '700',
                    }}
                  >
                    {data.email}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <RoomOutlinedIcon sx={{ color: '#3A9FC3', mr: '10px' }} />
                  <Typography
                    sx={{
                      color: '#C2D8D7',
                      fontSize: '14px',
                      fontWeight: '700',
                      mr: '10px',
                    }}
                  >
                    Địa chỉ:{' '}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#C2D8D7',
                      fontSize: '14px',
                      fontWeight: '700',
                    }}
                  >
                    {data.address}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <PhoneOutlinedIcon sx={{ color: '#3A9FC3', mr: '10px' }} />
                  <Typography
                    sx={{
                      color: '#C2D8D7',
                      fontSize: '14px',
                      fontWeight: '700',
                      mr: '10px',
                    }}
                  >
                    Hotline:{' '}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#C2D8D7',
                      fontSize: '14px',
                      fontWeight: '700',
                    }}
                  >
                    {data.hotline}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              {data?.ratingAvg ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'end',
                      m: 1,
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#FEFEFE',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      {getLabel(data.ratingAvg)}
                    </Typography>
                    <Typography
                      sx={{ color: '#FEFEFE', fontSize: '11px', mt: '10px' }}
                    >
                      {data.countComments} bình luận
                    </Typography>
                  </Box>
                  <Box
                    bgcolor="rgba(255, 255, 255, 0.25)"
                    borderRadius="10px 10px 10px 0px"
                    margin="5px"
                    flex={1}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        margin: '5px',
                        fontSize: '13px',
                        textTransform: 'unset',
                        textWrap: 'nowrap',
                        borderRadius: '10px 10px 10px 0px',
                        height: '80px',
                        backgroundColor: '#18458B',
                        width: '80px',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '20px',
                          color: 'white',
                          fontWeight: '600',
                        }}
                      >
                        {Number.isInteger(data.ratingAvg) ? data.ratingAvg : data.ratingAvg.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'start',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#CCC',
                      fontSize: '20px',
                      fontWeight: '600',
                      margin: '10px',
                    }}
                  >
                    Chưa có đánh giá
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box width="92%" maxWidth="1224px" display="flex" m="20px auto">
          <Box flex="1">
            <Box
              width="160px"
              height="44px"
              sx={{
                display: 'flex',
                backgroundColor: '#5ECFB1',
                margin: '20px 20px 10px 0px',
                alignSelf: 'end',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{ fontSize: '16px', color: 'white', fontWeight: '600' }}
              >
                Giảm giá {data.discount}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
