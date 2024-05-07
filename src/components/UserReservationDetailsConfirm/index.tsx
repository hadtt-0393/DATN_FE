import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Form } from '../../models/Form';
import { Hotel } from '../../models/Hotel';
import styles from './UserReservationDetailsConfirm.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface UserReservationDetailsConfirmProps {
  reservationData: Form;
}

const UserReservationDetailsConfirm = ({
  reservationData,
}: UserReservationDetailsConfirmProps) => {
  const { data: hotelData } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${reservationData.hotelId}`,
  );

  return (
    <div className={styles['reservation-confirm']}>
      <CheckCircleIcon sx={{ fontSize: 60, alignSelf: "center", color: "#32c671" }} />
      <div className={styles['reservation-confirm__header']}>
        <span style={{fontSize:"25px", alignSelf:"center"}}>{`Thanks ${reservationData.firstName} ${reservationData.lastName}! `}
          <img src='https://static-00.iconduck.com/assets.00/party-popper-emoji-2012x2048-lhq1rf8v.png' alt='congratulation_img' style={{ width: "30px" }} />
          <img src='https://static-00.iconduck.com/assets.00/party-popper-emoji-2012x2048-lhq1rf8v.png' alt='congratulation_img' style={{ width: "30px" }} />
          <img src='https://static-00.iconduck.com/assets.00/party-popper-emoji-2012x2048-lhq1rf8v.png' alt='congratulation_img' style={{ width: "30px" }} />
        </span>
        <h2 style={{ alignSelf:"center"}} >{`Your booking in ${hotelData?.city} has been paid`}</h2>
      </div>
      {/* <div className={styles['reservation-confirm__detail']}>
        <div className={styles['reservation-confirm__detail__item']}>
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className={styles['reservation-confirm__detail__item__icon']}
          />
          <span>
            We have sent your confirmation email to{' '}
            <strong>{reservationData.email}</strong>
          </span>
        </div>
        <div className={styles['reservation-confirm__detail__item']}>
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className={styles['reservation-confirm__detail__item__icon']}
          />
          <span>
            You can now sit down and looking forward to the check-in day
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default UserReservationDetailsConfirm;
