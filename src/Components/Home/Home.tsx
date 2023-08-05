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
import { Box, FormHelperText, Grid, InputAdornment, Paper, Typography } from '@mui/material';
import { relative } from 'path';

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
        <Paper elevation={2} sx={{ position: 'relative', padding: 2, background: 'white' }} className="cardDiv">
          <Grid container spacing={3} className="destinationInput">
            <Grid item xs={12} sm={6} md={4}>
              <OutlinedInput
                sx={{ borderRadius: 5, margin: 1, padding: 1 }}
                label="From? "
                placeholder="From? "
                fullWidth
                type="text"
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <GrLocation className="icon" />
                  </InputAdornment>
                }
                aria-describedby="outlined-destination-helper-text"
                inputProps={{
                  'aria-label': 'Search Your Destination',
                }}
              />{' '}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <OutlinedInput
                sx={{ borderRadius: 5, margin: 1, padding: 1 }}
                label="To? "
                fullWidth
                placeholder="To? "
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <GrLocation className="icon" />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <OutlinedInput
                sx={{ borderRadius: 5, padding: 1, margin: 1 }}
                value={format(selectionRange.startDate, 'MM/dd/yy') + '-' + format(selectionRange.endDate, 'MM/dd/yy')}
                readOnly
                fullWidth
                onClick={() => setOpen(!open)}
                className="inputBox"
                endAdornment={
                  <InputAdornment position="end">
                    <BsCalendarDateFill className="icon" />
                  </InputAdornment>
                }
              />
              <div style={{ padding: 2, margin: 2 }}>
                {open && (
                  <DateRange
                    minDate={new Date()}
                    ranges={[selectionRange]}
                    rangeColors={['#3d91ff']}
                    onChange={handleSelect}
                  />
                )}
              </div>
            </Grid>
          </Grid>

          <div style={{ padding: 2, margin: 1 }} className="searchOptions flex">
            <HiFilter />
          </div>
        </Paper>
      </div>
    </section>
  );
};
export default Home;
