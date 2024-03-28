import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions, Typography } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import './UserReviews.module.scss'
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useEffect } from 'react';

const UserReviews = ({ status, handleConfirm, handleCancel, text, item }) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState<number | null>(5)

  const handleClearText = () => {
    setReviewText('');
    handleCancel();
  }

  const conFirm = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/users/reservation/update/${item._id}`,
      {
        comment: reviewText,
        rating: reviewRating,
      }
    )
    handleConfirm();
  }


  useEffect(() => {
    const callapi = async() => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/users/reservation/${item._id}`,
      )
      setReviewText(res.data.comment)
      setReviewRating(res.data.rating)
    }
    callapi();
  }, []);



  return (
    <Dialog open={status} maxWidth="md" fullWidth={true} >
      <DialogTitle style={{ color: "#f50057", fontWeight: "bolder" }} >Review Hotel</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label="Nhập đánh giá của bạn"
          type="text"
          multiline
          maxRows={5}
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Typography component="legend" >Review service
          <Rating
            name="customized-10"
            defaultValue={5}
            value={reviewRating}
            max={5}
            precision={0.5}
            sx={{ ml: 5 }}
            onChange={( event, newValue) => {
              setReviewRating(newValue);
            }}
          />
            
        </Typography>


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearText} color="secondary" variant='contained'>
          Cancle
        </Button>
        <Button onClick={conFirm} color="primary" variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserReviews;