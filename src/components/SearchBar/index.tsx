import {
  faBed,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './SearchBar.module.scss';
import { format } from 'date-fns';
import useFetch from '../../hooks/useFetch';
import { City } from '../../models/City';
import { Box, Typography } from '@mui/material';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { vi } from 'date-fns/locale';

export interface DatesInterface {
  startDate: Date;
  endDate: Date;
  key: string;
}

export interface SearchBarProps {
  component?: string;
  display?: boolean;
}

const SearchBar = ({ component, display }: SearchBarProps) => {
  // const { dispatch } = useContext(SearchContext);

  const { data: cityData } = useFetch<City[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/city/getAllCity`,
  );

  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const currentDate = new Date();
  const [dates, setDates] = useState<DatesInterface[]>([
    {
      startDate: currentDate,
      endDate: new Date(currentDate.getTime() + 86400000),
      key: 'selection',
    },
  ]);


  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name: string, operation: 'd' | 'i') => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
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

  const handleSearch = (e: any) => {
    if(!destination) {
      return;
    }
    // dispatch &&
    //   dispatch({
    //     type: 'NEW_SEARCH',
    //     payload: { destination, dates, options },
    //   });
    navigate('/city', { state: { destination, dates, options } });
  };

  const [searchTerm, setSearchTerm] = useState('');
  const KEYS_TO_FILTERS = ['name'];
  const filteredCity: any = cityData?.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );

  return (
    <>
      {display && (<div className={styles['search']}>
        {component !== 'HotelItem' && (
          <div className={styles['search__item']}>
            <FontAwesomeIcon
              icon={faBed}
              className={styles['search__item__icon']}
            />
            <SearchInput
              className={styles['search__item__input']}
              placeholder="Nhập tên thành phố"
              onChange={(e: any) => {
                setSearchTerm(e);
              }}
              value={destination}
            />
            {searchTerm !== '' && (
              <div className={styles['search__item__result']}>
                {filteredCity.length ? (
                  filteredCity.map((city: City, index: number) => (
                    <div
                      className={styles['search__item__result__item']}
                      key={index}
                    >
                      <img src={city.image || ''} alt="" />
                      <div
                        className={
                          styles['search__item__result__item__wrapper']
                        }
                      >
                        <div
                          className={
                            styles['search__item__result__item__wrapper__city']
                          }
                          onClick={(e: any) => {
                            setDestination(e.target.innerText);
                            setSearchTerm('');
                          }}
                        >
                          {city.name}
                        </div>
                        <div
                          className={
                            styles[
                            'search__item__result__item__wrapper__country'
                            ]
                          }
                        >
                          {city.hotels.length} khách sạn
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Not found</div>
                )}
              </div>
            )}
          </div>
        )}
        <div className={styles['search__item']}>
          <FontAwesomeIcon
            icon={faCalendarDays}
            className={styles['search__item__icon']}
          />
          <span
            className={styles['search__item__text']}
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(dates[0].startDate, 'dd/MM/yyyy',
              { locale: vi })}  —  ${format(
                dates[0].endDate,
                'dd/MM/yyyy',
                { locale: vi }
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
              className={styles['search__item__date']}
            />
          )}
        </div>
        <div className={styles['search__item']}>
          <FontAwesomeIcon
            icon={faPerson}
            className={styles['search__item__icon']}
          />
          <span
            className={styles['search__item__text']}
            onClick={() => setOpenOptions(!openOptions)}
          >
            {`${options.adult} Người lớn ・ ${options.children} Trẻ em ・ ${options.room} Phòng`}
          </span>
          {openOptions && (
            <div className={styles['search__item__options']}>
              <div className={styles['search__item__options__item']}>
                <span className={styles['search__item__options__item__text']}>
                  Người lớn
                </span>
                <div
                  className={
                    styles['search__item__options__item__counter-container']
                  }
                >
                  <button
                    className={
                      styles['search__item__options__item__counter-btn']
                    }
                    onClick={() => handleOption('adult', 'd')}
                    disabled={options.adult <= 1}
                  >
                    -
                  </button>
                  <span
                    className={
                      styles['search__item__options__item__counter-number']
                    }
                  >
                    {options.adult}
                  </span>
                  <button
                    className={
                      styles['search__item__options__item__counter-btn']
                    }
                    onClick={() => handleOption('adult', 'i')}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={styles['search__item__options__item']}>
                <span className={styles['search__item__options__item__text']}>
                  Trẻ em
                </span>
                <div
                  className={
                    styles['search__item__options__item__counter-container']
                  }
                >
                  <button
                    className={
                      styles['search__item__options__item__counter-btn']
                    }
                    onClick={() => handleOption('children', 'd')}
                    disabled={options.children <= 0}
                  >
                    -
                  </button>
                  <span
                    className={
                      styles['search__item__options__item__counter-number']
                    }
                  >
                    {options.children}
                  </span>
                  <button
                    className={
                      styles['search__item__options__item__counter-btn']
                    }
                    onClick={() => handleOption('children', 'i')}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={styles['search__item__options__item']}>
                <span className={styles['search__item__options__item__text']}>
                  Phòng
                </span>
                <div
                  className={
                    styles['search__item__options__item__counter-container']
                  }
                >
                  <button
                    className={
                      styles['search__item__options__item__counter-btn']
                    }
                    onClick={() => handleOption('room', 'd')}
                    disabled={options.room <= 1}
                  >
                    -
                  </button>
                  <span
                    className={
                      styles['search__item__options__item__counter-number']
                    }
                  >
                    {options.room}
                  </span>
                  <button
                    className={
                      styles['search__item__options__item__counter-btn']
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
        <Box display="flex" flex="1" height="100%" alignItems="center" justifyContent="center" sx={{ backgroundColor: "#F9B90F", m: "0 auto", "&:hover": { cursor: destination ? 'pointer' : 'no-drop', opacity: "0.8", }}} onClick={handleSearch}>
          <Typography sx={{ fontSize: "13px", color: "white" }}>Tìm kiếm</Typography>
          <ZoomInOutlinedIcon fontSize="small" sx={{ color: "white", pl: 1 }} />
        </Box>
      </div>)}
    </>
  );
};

export default SearchBar;
