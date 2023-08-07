import './home.css';
import Waterfall from '../../Assets/collos.MOV';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { HiFilter } from 'react-icons/hi';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import 'react-date-range/dist/styles.css'; // main style file
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import format from 'date-fns/format';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Grid, InputAdornment, Paper } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../Config/customTheme';
import { LocalizationProvider } from '@mui/x-date-pickers';

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
  const handleDestinations = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDestinations((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleDestinationsSwap = () => {
    const temp_dest: selectedDestination = {
      departure: destinations.arrival,
      arrival: destinations.departure,
    };
    // eslint-disable-next-line no-console
    setDestinations(temp_dest);
  };

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <section className="home">
        <div className="overlay"></div>
        <video src={Waterfall} muted autoPlay loop></video>
        <div className="homeContent container">
          <span className="smallText">Our Packages</span>
          <h1 className="homeTitle">Search your Holiday</h1>
          <Paper elevation={2} sx={{ position: 'relative', padding: 2, background: 'white' }} className="cardDiv">
            <Grid container className="destinationInput">
              <Grid item xs={12} sm={5} md={3} spacing={1}>
                <OutlinedInput
                  sx={{ borderRadius: 5, py: 1, my: 1 }}
                  placeholder="From? "
                  fullWidth
                  onChange={handleDestinations}
                  value={destinations.departure}
                  type="text"
                  name="departure"
                  endAdornment={
                    <InputAdornment position="end">
                      <FlightTakeoffIcon className="icon" color="primary" />
                    </InputAdornment>
                  }
                />{' '}
              </Grid>
              {
                <Grid item xs={1} alignItems="center" justifyContent="center">
                  <Button
                    sx={{ marginY: 2, marginX: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={handleDestinationsSwap}
                  >
                    <SwapHorizIcon fontSize="large" />
                  </Button>
                </Grid>
              }
              <Grid item xs={12} sm={5} md={3} spacing={1}>
                <OutlinedInput
                  sx={{ borderRadius: 5, my: 1, py: 1 }}
                  fullWidth
                  value={destinations.arrival}
                  placeholder="To? "
                  name="arrival"
                  endAdornment={
                    <InputAdornment position="end">
                      <FlightLandIcon className="icon" color="primary" />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['SingleInputDateRangeField']}>
                    <DateRangePicker slots={{ field: SingleInputDateRangeField }} />
                  </DemoContainer>
                </LocalizationProvider>
                {/* <OutlinedInput
                  sx={{ borderRadius: 5, padding: 1, margin: 1 }}
                  value={
                    format(selectionRange.startDate, 'MM/dd/yy') + '-' + format(selectionRange.endDate, 'MM/dd/yy')
                  }
                  readOnly
                  onChange={handleDestinations}
                  fullWidth
                  onClick={() => setOpen(!open)}
                  className="inputBox"
                  endAdornment={
                    <InputAdornment position="end" sx={{ pr: 1 }}>
                      <CalendarMonthIcon className="icon" color="primary" />
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
                </div> */}
              </Grid>
            </Grid>

            <div style={{ padding: 2, margin: 1 }} className="searchOptions flex">
              <HiFilter />
            </div>
          </Paper>
        </div>
      </section>
    </ThemeProvider>
  );
};
export default Home;
