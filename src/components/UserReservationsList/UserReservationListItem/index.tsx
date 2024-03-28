import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch';
import { Form } from '../../../models/Form';
import { Hotel } from '../../../models/Hotel';
import { dayDifference } from '../../../services/utils';
import UserReservationsListItemSkeleton from '../../LoadingSkeleton/UserReservationsListItemSkeleton';
import styles from './UserReservationsListItem.module.scss';
import { useState } from 'react';
import UserReviews from '../../UserReviews';
import axios from 'axios';
import { is } from 'date-fns/locale';

interface UserReservationsListItemProps {
  item: Form;
}

const UserReservationsListItem = ({ item }: UserReservationsListItemProps) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const text = item.isComment || isSave ? 'Reviewed' : 'Write a review';
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${item.hotelId}`,
  );
  const start = new Date(item.startDate);
  const end = new Date(item.endDate);
  const numberOfDays = dayDifference(start, end);
  const price = data && numberOfDays * data.cheapestPrice * data.rooms.length;

  const handleReviewClick = () => {
    setOpenPopup(true);
    setIsModal(true);
  };

  const closeReview = () => {
    setOpenPopup(false);
    setIsModal(false);
  }

  const itemReviewAfterSave = [];

  const confirmReview = () => {
    setOpenPopup(false);
    setIsModal(false);
    setIsSave(true);
  }

  const handleNavigate = () => {
    navigate(`/reservations/${item._id}`);
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['reservation-list-item']}>
      {loading ? (
        <UserReservationsListItemSkeleton />
      ) : (
        <>
          <h2>{data?.city}</h2>
          <span>
            {format(start, 'dd MMM')} - {format(end, 'dd MMM')}
          </span>
          <div
            className={styles['reservation-list-item__container']}
          >
            <div className={styles['reservation-list-item__container__subcontainer']}
              onClick={handleNavigate}>
              <img src={data?.photos[0]} alt="hotel" />
              <div
                className={
                  styles['reservation-list-item__container__subcontainer__description']
                }
              >
                <div
                  className={
                    styles['reservation-list-item__container__subcontainer__description__name']
                  }
                >
                  {data?.name}
                </div>
                <div
                  className={
                    styles['reservation-list-item__container__subcontainer__description__time']
                  }
                >
                  {' '}
                  {format(start, 'dd MMM')} - {format(end, 'dd MMM')} .{' '}
                  {data?.city}
                </div>
                <div
                  className={
                    styles[
                    'reservation-list-item__container__subcontainer__description__status'
                    ]
                  }
                >
                  Completed
                </div>
              </div>
              <div className={styles['reservation-list-item__container__subcontainer__price']}>
                VND{price && price + price * 0.05}
              </div>
            </div>

            <div className={styles['reservation-list-item']}>
              <button onClick={handleReviewClick} disabled={item.isComment || isSave}>{text}</button>
            </div>
            {isModal && <UserReviews status={openPopup} handleConfirm={confirmReview} handleCancel={closeReview} text={text} item={item} />}
          </div>
        </>
      )}
    </div>
  );
};

export default UserReservationsListItem;
