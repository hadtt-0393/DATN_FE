import {
  faCalendarDays,
  faCheck,
  faLocationDot,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, colors } from '@mui/material';
import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from '../../components/Footer';
import Header, { DatesInterface } from '../../components/Header';
import HotelImageSlider from '../../components/HotelImageSlider';
import HotelRoomList from '../../components/HotelRooms';
import HotelItemSkeletonImage from '../../components/LoadingSkeleton/HotelItemSkeleton/HotelItemSkeletonImage';
import HotelItemSkeletonTitle from '../../components/LoadingSkeleton/HotelItemSkeleton/HotelItemSkeletonTitle';
import MailList from '../../components/MailList';
import Navbar from '../../components/Navbar';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { Hotel, Comment } from '../../models/Hotel';
import { dayDifference } from '../../services/utils';
import styles from './HotelItem.module.scss';
import { Navigation } from 'swiper/modules';
import { Star, ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/navigation';

const HotelItem = () => {
  const {
    dates: contextDates,
    options: contextOptions,
    dispatch,
  } = useContext(SearchContext);
  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];
  const [, setSlideNumber] = useState(0);
  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState<DatesInterface[]>(contextDates);

  const [options, setOptions] = useState(contextOptions);
  const [openOptions, setOpenOptions] = useState(false);
  const handleOption = (name: string, operation: 'd' | 'i') => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch &&
      dispatch({
        type: 'NEW_SEARCH',
        payload: { destination: data?.city, dates, options },
      });
    toast.success('Apply changes succeeded');
  };

  const { data, loading, error } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${hotelId}`,
  );

  // Calculate number of dates function
  const numberOfDays = dayDifference(dates[0].startDate, dates[0].endDate);

  const handleOpenSlider = (index: number) => {
    setSlideNumber(index);
    setIsOpenSlider(true);
  };

  const [monthNumber, setMonthNumber] = useState(
    window.innerWidth > 1024 ? 2 : 1,
  );
  useEffect(() => {
    const handleResize = () => {
      setMonthNumber(window.innerWidth > 1024 ? 2 : 1);
    };
    window.addEventListener('resize', handleResize);
  }, [window.innerWidth]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['hotel']}>
      <Navbar />
      <Header type="list" />
      <div className={styles['hotel__container']}>
        {isOpenSlider && (
          <HotelImageSlider
            photos={data?.photos}
            setIsOpenSlider={setIsOpenSlider}
          />

        )}
        <div className={styles['hotel__container__wrapper']}>
          {loading ? (
            <HotelItemSkeletonTitle />
          ) : (
            <>
              <h1 className={styles['hotel__container__wrapper__title']}>
                {data?.name}
              </h1>
              <div className={styles['hotel__container__wrapper__address']}>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data?.address}</span>
              </div>
              <span className={styles['hotel__container__wrapper__distance']}>
                Excellent location - {data?.distance}km from center
              </span>
              <span
                className={styles['hotel__container__wrapper__price-highlight']}
              >
                Book a stay over ${data?.cheapestPrice} at this property and get
                a free airport taxi
              </span>
            </>
          )}
          {/* Sub Photos */}
          <div className={styles['hotel__container__wrapper__images']}>
            {loading ? (
              <HotelItemSkeletonImage />
            ) : (
              data?.photos?.map((photo, index) => (
                <div
                  className={styles['hotel__container__wrapper__images__item']}
                  key={index}
                >
                  <img
                    src={photo}
                    alt=""
                    className={
                      styles['hotel__container__wrapper__images__item__img']
                    }
                    onClick={() => handleOpenSlider(index)}
                  />
                </div>
              ))
            )}
          </div>
          {/* Hotel Details */}
          <div className={styles['hotel__container__wrapper__detail']}>
            <div className={styles['hotel__container__wrapper__detail__text']}>
              <>
                <h1
                  className={
                    styles['hotel__container__wrapper__detail__text__title']
                  }
                >
                  {data?.title}
                </h1>
                <p
                  className={
                    styles[
                    'hotel__container__wrapper__detail__text__description'
                    ]
                  }
                >
                  {data?.description}
                </p>
                <h3>Most popular facilities</h3>
                <div
                  className={
                    styles['hotel__container__wrapper__detail__text__tags']
                  }
                >
                  {data?.services.map((tag, index) => (
                    <div
                      className={
                        styles[
                        'hotel__container__wrapper__detail__text__tags__item'
                        ]
                      }
                      key={index}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          styles[
                          'hotel__container__wrapper__detail__text__tags__item__icon'
                          ]
                        }
                      />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
                <h3>Availabilities</h3>
                <div className={styles['hotel__container__wrapper__search']}>
                  <div
                    className={
                      styles['hotel__container__wrapper__search__item']
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className={
                        styles['hotel__container__wrapper__search__item__icon']
                      }
                    />
                    <span
                      className={
                        styles['hotel__container__wrapper__search__item__text']
                      }
                      onClick={() => setOpenDate(!openDate)}
                    >
                      {`${format(dates[0].startDate, 'EE d MMM')}  —  ${format(
                        dates[0].endDate,
                        'EE d MMM',
                      )}`}
                    </span>
                    {openDate && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        minDate={new Date()}
                        months={monthNumber}
                        direction="horizontal"
                        className={
                          styles[
                          'hotel__container__wrapper__search__item__date'
                          ]
                        }
                      />
                    )}
                  </div>
                  <div
                    className={
                      styles['hotel__container__wrapper__search__item']
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPerson}
                      className={
                        styles['hotel__container__wrapper__search__item__icon']
                      }
                    />
                    <span
                      className={
                        styles['hotel__container__wrapper__search__item__text']
                      }
                      onClick={() => setOpenOptions(!openOptions)}
                    >
                      {`${options.adult} adults ・ ${options.children} children ・ ${options.room} room`}
                    </span>
                    {openOptions && (
                      <div
                        className={
                          styles[
                          'hotel__container__wrapper__search__item__options'
                          ]
                        }
                      >
                        <div
                          className={
                            styles[
                            'hotel__container__wrapper__search__item__options__item'
                            ]
                          }
                        >
                          <span
                            className={
                              styles[
                              'hotel__container__wrapper__search__item__options__item__text'
                              ]
                            }
                          >
                            Adult
                          </span>
                          <div
                            className={
                              styles[
                              'hotel__container__wrapper__search__item__options__item__counter-container'
                              ]
                            }
                          >
                            <button
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-btn'
                                ]
                              }
                              onClick={() => handleOption('adult', 'd')}
                              disabled={options.adult <= 1}
                            >
                              -
                            </button>
                            <span
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-number'
                                ]
                              }
                            >
                              {options.adult}
                            </span>
                            <button
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-btn'
                                ]
                              }
                              onClick={() => handleOption('adult', 'i')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div
                          className={
                            styles[
                            'hotel__container__wrapper__search__item__options__item'
                            ]
                          }
                        >
                          <span
                            className={
                              styles[
                              'hotel__container__wrapper__search__item__options__item__text'
                              ]
                            }
                          >
                            Children
                          </span>
                          <div
                            className={
                              styles[
                              'hotel__container__wrapper__search__item__options__item__counter-container'
                              ]
                            }
                          >
                            <button
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-btn'
                                ]
                              }
                              onClick={() => handleOption('children', 'd')}
                              disabled={options.children <= 0}
                            >
                              -
                            </button>
                            <span
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-number'
                                ]
                              }
                            >
                              {options.children}
                            </span>
                            <button
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-btn'
                                ]
                              }
                              onClick={() => handleOption('children', 'i')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div
                          className={
                            styles[
                            'hotel__container__wrapper__search__item__options__item'
                            ]
                          }
                        >
                          <span
                            className={
                              styles[
                              'hotel__container__wrapper__search__item__options__item__text'
                              ]
                            }
                          >
                            Room
                          </span>
                          <div
                            className={
                              styles[
                              'hotel__container__wrapper__search__item__options__item__counter-container'
                              ]
                            }
                          >
                            <button
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-btn'
                                ]
                              }
                              onClick={() => handleOption('room', 'd')}
                              disabled={options.room <= 1}
                            >
                              -
                            </button>
                            <span
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-number'
                                ]
                              }
                            >
                              {options.room}
                            </span>
                            <button
                              className={
                                styles[
                                'hotel__container__wrapper__search__item__options__item__counter-btn'
                                ]
                              }
                              onClick={() => handleOption('room', 'i')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      styles['hotel__container__wrapper__search__item']
                    }
                  >
                    <button
                      className={styles['hotel__container__btn']}
                      onClick={handleSearch}
                    >
                      Apply Changes
                    </button>
                  </div>
                </div>
              </>
            </div>
            <div className={styles['hotel__container__wrapper__detail__price']}>
              <h1>Perfect for a {numberOfDays}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>({numberOfDays} nights)</h2>
            </div>
          </div>
          <div className={styles['hotel__container__wrapper__rooms']}>
            <h3>Book this apartment</h3>
            <HotelRoomList hotelId={hotelId} />
          </div>
        </div>
        <div style={{ width: "100%", maxWidth: '1140px', marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "30px" }}>See what guests loved the most:</h3>
          {data?.comments.length ?
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
             modules={[Navigation]}
            >
              {data?.comments.map((item: Comment) => (

                <SwiperSlide style={{ marginBottom: "20px" }}>
                  <Card sx={{ width: '100%', maxHeight: "500px" }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                          {item.username.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <Typography sx={{ display: 'flex', alignItems: 'center' }} >{item.rating} <Star sx={{ color: "#FAAF00" }} /></Typography>
                      }
                      title={item.username}
                      subheader={new Date(item.created).toLocaleString("en-GB", { timeZone: "UTC" })}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image="https://static.vecteezy.com/system/resources/previews/023/506/852/non_2x/cute-kawaii-mushroom-chibi-mascot-cartoon-style-vector.jpg"
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev" style={{ color: 'red' }}>
                {/* <ArrowCircleLeft /> */}
              </div>
              <div className="swiper-button-next" style={{ color: 'red' }}>
                {/* <ArrowCircleRight /> */}
              </div>
            </Swiper>
            : <h4 style={{ color: "orange", fontStyle: "italic" }}>There are no comments yet</h4>
          }
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default HotelItem;
