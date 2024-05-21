import {
  faBed,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './SearchBar.module.scss';
import { format } from 'date-fns';
import useFetch from '../../hooks/useFetch';
import { City } from '../../models/City';
import { Box, Typography } from '@mui/material';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import Input from "@mui/material/Input";


export interface DatesInterface {
  startDate: Date;
  endDate: Date;
  key: string;
}

export interface SearchBarProps {
  component?: string;
}

const SearchBar = ({ component }: SearchBarProps) => {
  const { dispatch } = useContext(SearchContext);

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

  const handleSearch = () => {
    dispatch &&
      dispatch({
        type: 'NEW_SEARCH',
        payload: { destination, dates, options },
      });
    navigate('/hotels', { state: { destination, dates, options } });
  };

  const [searchTerm, setSearchTerm] = useState('');
  const KEYS_TO_FILTERS = ['name'];
  const filteredCity: any = cityData?.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );

  return (
    <Box maxWidth="1140px" bgcolor="#EEE" height="50px" display="flex" alignItems="center" justifyContent="space-between" m="10px">
      {/* <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "50px",
        backgroundColor: "#febb02",
        padding: "4px",
        borderRadius: "2px",
        position: "absolute",
        width: "100%",
        maxWidth: "1140px",
        boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.16)"
      }}> */}
      {component !== 'HotelItem' && (
        <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%" sx={{ minWidth: "250px" }} flex={2}>
          <NotListedLocationOutlinedIcon fontSize="small" sx={{ color: "#F9B90F", pl: 2, pr: 2 }} />
          {/* <SearchInput
            className={styles['search__item__input']}

            style={{ width: "100%", height: "100%", border: "none", outline:"none", padding:"0", cursor: "pointer"}}
            placeholder="Nhập tên thành phố"
            onChange={(e: any) => {
              setSearchTerm(e);
            }}
            value={destination}
          /> */}
           <Input disableUnderline sx={{ fontSize: "13px", flex: "1" }} placeholder="Khách sạn, Thành phố..." 
           onChange={(e: any) => {
              setSearchTerm(e);
            }}
            value={destination} />
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
                        {city.hotels.length} khách
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>Not found</div>
              )}
            </div>
          )}
        </Box>
      )}
      <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%" sx={{ minWidth: "250px" }} flex={2}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          className={styles['search__item__icon']}
        />
        <span
          className={styles['search__item__text']}
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
            className={styles['search__item__date']}
          />
        )}
      </Box>
      <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%" sx={{ minWidth: "250px" }} flex={2}>
        <FontAwesomeIcon
          icon={faPerson}
          className={styles['search__item__icon']}
        />
        <span
          className={styles['search__item__text']}
          onClick={() => setOpenOptions(!openOptions)}
        >
          {`${options.adult} adults ・ ${options.children} children ・ ${options.room} room`}
        </span>
        {openOptions && (
          <div className={styles['search__item__options']}>
            <div className={styles['search__item__options__item']}>
              <span className={styles['search__item__options__item__text']}>
                Adult
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
                Children
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
                Room
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
      </Box>
      {/* <Box display="flex" alignItems="center" borderRight="#ccc solid 1px" height="100%" sx={{ minWidth: "250px" }} flex={1}>
        <button
          className={styles['search__item__btn']}
          onClick={handleSearch}
          disabled={!destination}
        >
          Search
        </button>
      </Box> */}
      <Box display="flex" flex="1" height="100%" alignItems="center" justifyContent="center" sx={{ backgroundColor: "#F9B90F", m: "0 auto", "&:hover": { cursor: "pointer", opacity: "0.8" } }} onClick={() => navigate('/search-results')}>
        <Typography sx={{ fontSize: "13px", color: "white" }}>Tìm kiếm</Typography>
        <ZoomInOutlinedIcon fontSize="small" sx={{ color: "white", pl: 1 }} />
      </Box>
      {/* </Box> */}
    </Box>
  );
};

export default SearchBar;
