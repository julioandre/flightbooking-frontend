import './home.css';
import Waterfall from '../../Assets/collos.MOV';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { HiFilter } from 'react-icons/hi';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { BsCalendarDateFill } from 'react-icons/bs';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Grid, InputAdornment, Paper } from '@mui/material';

export const Home = () => {
  interface selectedDestination {
    departure: string;
    arrival: string;
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [destinations, setDestinations] = useState<selectedDestination>({ departure: '', arrival: '' });
  const [open, setOpen] = useState(false);
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };
  const handleDestinations = (dep: string, arri: string) => {
    const temp_dest: selectedDestination = {
      departure: dep,
      arrival: arri,
    };
    setDestinations(temp_dest);
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
          <Grid container className="destinationInput" alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={5} md={3} spacing={1}>
              <OutlinedInput
                sx={{ borderRadius: 5, py: 1, my: 1 }}
                label="From? "
                placeholder="From? "
                fullWidth
                type="text"
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <FlightTakeoffIcon className="icon" color="primary" />
                  </InputAdornment>
                }
                aria-describedby="outlined-destination-helper-text"
                inputProps={{
                  'aria-label': 'Search Your Destination',
                }}
              />{' '}
            </Grid>
            {
              <Grid item xs={1} alignItems="center" justifyContent="center">
                <Button
                  sx={{ marginY: 2, marginX: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleDestinations(destinations.departure, destinations.arrival);
                  }}
                >
                  <SwapHorizIcon fontSize="large" />
                </Button>
              </Grid>
            }
            <Grid item xs={12} sm={5} md={3} spacing={1}>
              <OutlinedInput
                sx={{ borderRadius: 5, my: 1, py: 1 }}
                label="To? "
                fullWidth
                placeholder="To? "
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <FlightLandIcon className="icon" color="primary" />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <OutlinedInput
                sx={{ borderRadius: 5, padding: 1, margin: 1 }}
                value={format(selectionRange.startDate, 'MM/dd/yy') + '-' + format(selectionRange.endDate, 'MM/dd/yy')}
                readOnly
                fullWidth
                onClick={() => setOpen(!open)}
                className="inputBox"
                endAdornment={
                  <InputAdornment position="end" sx={{ pr: 1 }}>
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
