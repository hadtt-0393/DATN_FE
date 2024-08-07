import {
  faBed,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom';
import SearchInput, { createFilter } from 'react-search-input';
import useFetch from '../../hooks/useFetch';
import { City } from '../../models/City';
import styles from './SearchBar.module.scss';
import axios from 'axios';

export interface DatesInterface {
  startDate: Date;
  endDate: Date;
  key: string;
}

export interface SearchBarProps {
  component?: string;
  display?: boolean;
  destinations?: string;
  handleChangeData?: (arg1, arg2) => void;
  onSearch?: () => void;
}

const SearchBar = ({ component, display, handleChangeData, destinations, onSearch }: SearchBarProps) => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/city/getAllCity`)
      setCityData(res.data);
    }
    callApi();
  }, []);

  const navigate = useNavigate();
  const currentDate = new Date();
  const [destination, setDestination] = useState(destinations ? destinations : '');
  const [searchTerm, setSearchTerm] = useState('');
  const [dates, setDates] = useState<DatesInterface[]>([
    {
      startDate: currentDate,
      endDate: new Date(currentDate.getTime() + 86400000),
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const handleOption = (name: string, operation: 'd' | 'i') => {
    setOptions((prev) => {
      handleChangeData?.('option', {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      })
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
    if (!destination) {
      return;
    }
    if (destination === 'fake-destination') {
      onSearch?.();
      return;
    }
    navigate(`/city/${destination}`, { state: { dates, options } });
  };

  const hanleChangeDate = (event) => {
    setDates([event.selection]);
    handleChangeData?.('date', [event.selection])
  }


  const KEYS_TO_FILTERS = ['cityName'];
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
              placeholder="Nhập tên thành phố/tỉnh"
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
                          {city.cityName}
                        </div>
                        <div
                          className={
                            styles[
                            'search__item__result__item__wrapper__country'
                            ]
                          }
                        >
                          {city.hotelIds.length} khách sạn
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Không tìm thấy tỉnh/thành phố</div>
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
              onChange={hanleChangeDate}
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
        <Box display="flex" flex="1" height="100%" alignItems="center" justifyContent="center" sx={{ backgroundColor: "#F9B90F", m: "0 auto", "&:hover": { cursor: destination ? 'pointer' : 'no-drop', opacity: "0.8", } }} onClick={handleSearch}>
          <Typography sx={{ fontSize: "13px", color: "white" }}>Tìm kiếm</Typography>
          <ZoomInOutlinedIcon fontSize="small" sx={{ color: "white", pl: 1 }} />
        </Box>
      </div>)}
    </>
  );
};

export default SearchBar;
