import React from 'react';
import './home.css';
import Waterfall from '../../Assets/collos.MOV';
import { GrLocation } from 'react-icons/gr';
import { HiFilter } from 'react-icons/hi';
import { BsCalendarDateFill } from 'react-icons/bs';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputAdornment } from '@mui/material';

export const Home = () => {
  interface selectionRange {
    startDate: Date;
    endDate: Date;
    key: 'selection';
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };
  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <section className="home">
      <div className="overlay"></div>
      <video src={Waterfall} muted autoPlay loop></video>
      <div className="homeContent container">
        <span className="smallText">Our Packages</span>
        <h1 className="homeTitle">Search your Holiday</h1>
        <div className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search your destination:</label>
            <div className="input flex" style={{ margin: '10px 0px' }}>
              <OutlinedInput
                label="From? "
                placeholder="From? "
                type="text"
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <GrLocation className="icon" />
                  </InputAdornment>
                }
              />
            </div>
            <div className="input flex">
              <OutlinedInput
                label="To? "
                placeholder="To? "
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <GrLocation className="icon" />
                  </InputAdornment>
                }
              />
            </div>
          </div>
          <div className="calendarWrap">
            <label htmlFor="date">Search your date:</label>
            <div className="calendarWrap">
              <OutlinedInput
                value={format(selectionRange.startDate, 'MM/dd/yy') + '-' + format(selectionRange.endDate, 'MM/dd/yy')}
                readOnly
                onClick={() => setOpen(!open)}
                className="inputBox"
                endAdornment={
                  <InputAdornment position="end">
                    <BsCalendarDateFill className="icon" />
                  </InputAdornment>
                }
              />
              <div>
                {open && (
                  <DateRange
                    minDate={new Date()}
                    ranges={[selectionRange]}
                    rangeColors={['#3d91ff']}
                    onChange={handleSelect}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="searchOptions flex">
            <HiFilter />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
