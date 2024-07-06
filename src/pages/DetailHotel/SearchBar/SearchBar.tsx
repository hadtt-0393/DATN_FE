import { faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './SearchBar.module.scss';

export interface DatesInterface {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
}

export interface Option {
  adult: number;
  children: number;
  room: number;
}

export interface SearchBarProps {
  component?: string;
  display?: boolean;
  startDate: Date | null;
  endDate: Date | null;
  option: Option;
  handleChangeData?: (arg1, arg2) => void;
  onSearch?: () => void;
}

const SearchBar = ({
  handleChangeData,
  onSearch,
  startDate,
  endDate,
  option
}: SearchBarProps) => {
  const [dates, setDates] = useState<DatesInterface[]>([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(option);

  const handleOption = (name: string, operation: 'd' | 'i') => {
    setOptions((prev) => {
      handleChangeData?.('option', {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      });
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
    onSearch?.();
  };

  const hanleChangeDate = (event) => {
    setDates([event.selection]);
    handleChangeData?.('date', [event.selection]);
  };

  return (
    <div className={styles['search']}>
      <div className={styles['search__item']}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          className={styles['search__item__icon']}
        />
        <span
          className={styles['search__item__text']}
          onClick={() => setOpenDate(!openDate)}
        >
          {dates[0].startDate
            ? `${format(dates[0].startDate, 'dd/MM/yyyy', { locale: vi })}`
            : 'DD/MM/YYYY'}
          –
          {dates[0].endDate
            ? `${format(dates[0].endDate, 'dd/MM/yyyy', { locale: vi })}`
            : 'DD/MM/YYYY'}
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
          {options ? options.adult : null} Người lớn・{options ? options.children : null} Trẻ em・{options ? options.room : null} Phòng
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
                  className={styles['search__item__options__item__counter-btn']}
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
                  {options ? options.adult : null}
                </span>
                <button
                  className={styles['search__item__options__item__counter-btn']}
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
                  className={styles['search__item__options__item__counter-btn']}
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
                  {options ? options.children : null}
                </span>
                <button
                  className={styles['search__item__options__item__counter-btn']}
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
                  className={styles['search__item__options__item__counter-btn']}
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
                 {options ? options.room : null}
                </span>
                <button
                  className={styles['search__item__options__item__counter-btn']}
                  onClick={() => handleOption('room', 'i')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Box
        display="flex"
        flex="1"
        height="100%"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: '#F9B90F',
          m: '0 auto',
          '&:hover': {
            cursor: 'pointer',
            opacity: '0.8',
          },
        }}
        onClick={handleSearch}
      >
        <Typography sx={{ fontSize: '13px', color: 'white' }}>
          Tìm kiếm
        </Typography>
        <ZoomInOutlinedIcon fontSize="small" sx={{ color: 'white', pl: 1 }} />
      </Box>
    </div>
  );
};

export default SearchBar;
