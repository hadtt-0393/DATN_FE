import {
    faBed,
    faCalendarDays,
    faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from 'react-router-dom';
import SearchInput, { createFilter } from 'react-search-input';
import { SearchContext } from '../../../context/SearchContext';
import useFetch from '../../../hooks/useFetch';
import { City } from '../../../models/City';
import styles from './SearchBarFlexColumn.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Typography } from '@mui/material';
import { vi } from 'date-fns/locale';


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
        console.log('destination', destination);
        console.log('dates', dates);
        console.log('options', options);
        navigate('/hotels', { state: { destination, dates, options } });
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [closeFilter, setCloseFilter] = useState(false);
    const KEYS_TO_FILTERS = ['name'];
    const filteredCity: any = cityData?.filter(
        createFilter(searchTerm, KEYS_TO_FILTERS),
    );

    return (
        <>
            <div style={{
                backgroundColor: '#F9C941',
                flex: 2,
                padding: '16px',
                borderRadius: '3px',
                top: '10px',
                height: 'max-content',
            }}>
                <Box paddingBottom="10px">
                    <Typography fontSize="16px" fontWeight="600" color="#183C7D">Tìm kiếm</Typography>
                </Box>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    marginBottom: '10px',
                    color: '#262626',
                }}>
                    <Typography fontSize="13px" color="back" mb="5px">Địa điểm</Typography>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '5px 8px',
                        gap: '8px',
                        height: '40px'
                    }}>
                        <FontAwesomeIcon icon={faBed} size="sm" style={{marginRight:"5px", color:"#F9B90F"}}/>
                        <SearchInput
                            className={styles['header__container__search__item__input']}
                            placeholder="Nhập tên thành phố"
                            onChange={(e: any) => {
                                setSearchTerm(e);
                            }}
                            value={destination}
                        />
                        {searchTerm !== '' && (
                            <div
                                className={
                                    styles['header__container__search__item__result']
                                }
                            >
                                {filteredCity.length ? (
                                    filteredCity.map((city: City, index: number) => (
                                        <div
                                            className={
                                                styles[
                                                'header__container__search__item__result__item'
                                                ]
                                            }
                                            key={index}
                                        >
                                            <img src={city.image || ''} alt="" />
                                            <div
                                                className={
                                                    styles[
                                                    'header__container__search__item__result__item__city'
                                                    ]
                                                }
                                                onClick={(e: any) => {
                                                    setDestination(e.target.innerText);
                                                    setSearchTerm('');
                                                }}
                                            >
                                                {city.name}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>Không có kết quả phù hợp</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    marginBottom: '10px',
                    color: '#262626',
                }}>
                    <Typography fontSize="13px" color="black" mb="5px">Ngày nhận phòng - Ngày trả phòng</Typography>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '5px 8px',
                        gap: '8px',
                        height: '40px'
                    }}>
                        <FontAwesomeIcon icon={faCalendarDays} size="sm" style={{marginRight:"5px", color:"#F9B90F"}}/>
                        <span className={
                            styles['header__container__search__item__text']
                        }
                            onClick={() => setOpenDate(!openDate)}>{`${format(
                                dates[0].startDate,
                                'dd/MM/yyyy',
                                { locale: vi }
                            )} – ${format(dates[0].endDate,
                                'dd/MM/yyyy',
                                { locale: vi })}`}</span>
                        {openDate && (
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                minDate={new Date()}
                                months={2}
                                direction="horizontal"
                                className={styles['header__container__search__item__date']}
                            />
                        )}
                    </div>
                </div>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    marginBottom: '10px',
                    color: '#262626',
                }}>
                    <Typography fontSize="13px" color="black" mb="5px">Số lượng người lớn - Trẻ em - Phòng</Typography>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '5px 8px',
                        gap: '8px',
                        height: '40px'
                    }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" style={{marginRight:"5px", color:"#F9B90F"}}/>
                        <div className={styles['header__container__search__item']}>
                            <span
                                className={
                                    styles['header__container__search__item__text']
                                }
                                onClick={() => setOpenOptions(!openOptions)}
                            >
                                {`${options.adult} Người lớn・${options.children} Trẻ em・${options.room} Phòng`}
                            </span>
                            {openOptions && (
                                <div
                                    className={
                                        styles['header__container__search__item__options']
                                    }
                                >
                                    <div
                                        className={
                                            styles[
                                            'header__container__search__item__options__item'
                                            ]
                                        }
                                    >
                                        <span
                                            className={
                                                styles[
                                                'header__container__search__item__options__item__text'
                                                ]
                                            }
                                        >
                                            Người lớn
                                        </span>
                                        <div
                                            className={
                                                styles[
                                                'header__container__search__item__options__item__counter-container'
                                                ]
                                            }
                                        >
                                            <button
                                                className={
                                                    styles[
                                                    'header__container__search__item__options__item__counter-btn'
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
                                                    'header__container__search__item__options__item__counter-number'
                                                    ]
                                                }
                                            >
                                                {options.adult}
                                            </span>
                                            <button
                                                className={
                                                    styles[
                                                    'header__container__search__item__options__item__counter-btn'
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
                                            'header__container__search__item__options__item'
                                            ]
                                        }
                                    >
                                        <span
                                            className={
                                                styles[
                                                'header__container__search__item__options__item__text'
                                                ]
                                            }
                                        >
                                            Trẻ em
                                        </span>
                                        <div
                                            className={
                                                styles[
                                                'header__container__search__item__options__item__counter-container'
                                                ]
                                            }
                                        >
                                            <button
                                                className={
                                                    styles[
                                                    'header__container__search__item__options__item__counter-btn'
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
                                                    'header__container__search__item__options__item__counter-number'
                                                    ]
                                                }
                                            >
                                                {options.children}
                                            </span>
                                            <button
                                                className={
                                                    styles[
                                                    'header__container__search__item__options__item__counter-btn'
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
                                            'header__container__search__item__options__item'
                                            ]
                                        }
                                    >
                                        <span
                                            className={
                                                styles[
                                                'header__container__search__item__options__item__text'
                                                ]
                                            }
                                        >
                                            Phòng
                                        </span>
                                        <div
                                            className={
                                                styles[
                                                'header__container__search__item__options__item__counter-container'
                                                ]
                                            }
                                        >
                                            <button
                                                className={
                                                    styles[
                                                    'header__container__search__item__options__item__counter-btn'
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
                                                    'header__container__search__item__options__item__counter-number'
                                                    ]
                                                }
                                            >
                                                {options.room}
                                            </span>
                                            <button
                                                className={
                                                    styles[
                                                    'header__container__search__item__options__item__counter-btn'
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
