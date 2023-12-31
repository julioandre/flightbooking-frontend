import './home.css';
import Waterfall from '../../Assets/collos.MOV';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { HiFilter } from 'react-icons/hi';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box, Button, Grid, InputAdornment, Paper, TextField, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../Config/customTheme';
import { IAirportResponse } from '../../schemas/airportResponse';
import _ from 'lodash';

export const Home = () => {
  interface selectedDestination {
    departure: string;
    arrival: string;
  }

  const isMobile = useMediaQuery('(max-width:650px)');
  const isTablet = useMediaQuery('(max-width:1200px,min-width:750px)');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [airportList, setAirportList] = useState<IAirportResponse[]>([
    {
      name: "Chicago O'Hare International Airport",
      iata_code: 'ORD',
      icao_code: 'KORD',
      lat: 41.978367,
      lng: -87.904712,
      country_code: 'US',
    },
  ]);
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
    console.log(airportList);
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
  useEffect(() => {
    const getAiports = async () => {
      fetch(`https://airlabs.co/api/v9/airports?api_key=${process.env.REACT_APP_AIRPORT}`)
        .then((response) => response.json())
        .then((data) => {
          setAirportList(data.response);
          console.log(airportList);
        });
    };
    getAiports().catch(console.error);
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <section className="home">
        <div className="overlay"></div>
        <video src={Waterfall} muted autoPlay loop></video>
        <div className="homeContent container">
          <span className="smallText">Our Packages</span>
          <h1 className="homeTitle">Search your Holiday</h1>
          <Paper elevation={2} sx={{ position: 'relative', padding: 2, background: 'white' }} className="cardDiv">
            <Grid container justifyContent="center" alignContent={'center'} className="destinationInput">
              <Grid item xs={12} sm={5} md={3} spacing={1}>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ '& fieldset': { borderRadius: 5 }, my: 1, py: 1 }}
                  options={_.uniqWith(airportList, (arrVal, othVal) => arrVal.iata_code === othVal.iata_code)}
                  autoHighlight
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { flexShrink: 0 } }}
                      {...props}
                      key={option.icao_code + option.name}
                    >
                      {option.name} ({option.iata_code}) +{option.icao_code}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="From "
                      name="departure"
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          height: '72px',
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlightTakeoffIcon className="icon" color="primary" />
                          </InputAdornment>
                        ),
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              {
                <Grid item container xs={1.5} alignItems="center" justifyContent="center" direction={'column'}>
                  <Button
                    sx={{ alignItems: 'center', maxWidth: '100%' }}
                    variant="customButton"
                    onClick={handleDestinationsSwap}
                  >
                    <SwapHorizIcon fontSize="large" sx={{ color: 'white' }} />
                  </Button>
                </Grid>
              }
              <Grid item xs={12} sm={5} md={3} spacing={1}>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ '& fieldset': { borderRadius: 5 }, my: 1, py: 1 }}
                  options={_.uniqWith(airportList, (arrVal, othVal) => arrVal.iata_code === othVal.iata_code)}
                  autoHighlight
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { flexShrink: 0 } }}
                      {...props}
                      key={option.icao_code + option.name}
                    >
                      {option.name} ({option.iata_code}) +{option.icao_code}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="To? "
                      name="arrival"
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          height: '72px',
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlightLandIcon className="icon" color="primary" />
                          </InputAdornment>
                        ),
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} spacing={1}>
                <OutlinedInput
                  sx={{ borderRadius: 5, py: 1, my: 2, mx: 2 }}
                  value={
                    format(selectionRange.startDate, 'MM/dd/yy') + '-' + format(selectionRange.endDate, 'MM/dd/yy')
                  }
                  readOnly
                  onChange={handleSelect}
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
                </div>
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
