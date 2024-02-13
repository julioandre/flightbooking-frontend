import './home.css';
import Waterfall from '../../Assets/collos.MOV';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../Config/customTheme';
import { IAirportResponse } from '../../schemas/airportResponse';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PassengerSelect from '../PassengerSelect/PassengerSelect';

export const Home = () => {
  interface selectedDestination {
    departure: string;
    arrival: string;
  }

  interface Inputs {
    departure: string;
    arrival: string;
    startDate: Date;
    endDate?: Date;
    oneWay: boolean;
  }

  const isMobile = useMediaQuery('(max-width:650px)');
  const [travelType, setTravelType] = useState('Return');
  const isTablet = useMediaQuery('(max-width:1200px),(min-width:750p)x)');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [airportList, setAirportList] = useState<IAirportResponse[]>([]);
  const [destinations, setDestinations] = useState<selectedDestination>({ departure: '', arrival: '' });
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;
  const loading = (open && airportList.length === 0) || (open2 && airportList.length === 0);
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
  const handleTravelSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTravelType(event.target.value);
  };
  const handleFormSubmit = async (inputs: Inputs) => {
    const formData = new FormData();
  };
  useEffect(() => {
    const getAiports = async () => {
      fetch(`https://airlabs.co/api/v9/airports?api_key=${process.env.REACT_APP_AIRPORT}`)
        .then((response) => response.json())
        .then((data) => {
          setAirportList(data.response);
        });
    };
    let active = true;
    if (!loading) {
      return undefined;
    }
    if (active) {
      getAiports().catch(console.error);
    }
    return () => {
      active = false;
    };
  }, [loading]);
  useEffect(() => {
    if (!open || !open2) {
      setAirportList([]);
    }
  }, [open, open2]);

  return (
    <ThemeProvider theme={customTheme}>
      <section className="home">
        <div className="overlay"></div>
        <video src={Waterfall} muted autoPlay loop></video>

        <Box className="homeContent container" alignContent={'center'} justifyContent="center" display="flex">
          <span className="smallText">Our Packages</span>
          <h1 className="homeTitle">Search your Holiday</h1>
          <Paper elevation={2} sx={{ position: 'relative', padding: 2, background: 'white' }} className="cardDiv">
            <form>
              <Grid container>
                <Grid item xs={12} sm={3} spacing={2}>
                  <FormControl fullWidth variant="standard" sx={{ mx: 1.5, maxWidth: '300px' }}>
                    <TextField
                      id="demo-simple-select-standard"
                      value={travelType}
                      defaultValue={'Return'}
                      select
                      onChange={handleTravelSelect}
                      variant="standard"
                    >
                      <MenuItem value={10}>Return</MenuItem>
                      <MenuItem value={20}>One-Way</MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid></Grid>
              </Grid>
              <Grid container className="destinationInput">
                <Grid item xs={12} sm={5} md={3} spacing={1}>
                  <Autocomplete
                    id="country-select-demo"
                    open={open}
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    loading={loading}
                    sx={{ '& fieldset': { borderRadius: 5 }, py: 1, mx: 1 }}
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
                        {...register('departure', { required: 'Departure Airport is Required' })}
                        error={!!errors.departure}
                        helperText={errors.departure?.message}
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
                          endAdornment: (
                            <>
                              {loading && open ? (
                                <InputAdornment position="end">
                                  <CircularProgress color="inherit" size={20} />
                                </InputAdornment>
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={5} md={3} spacing={1}>
                  <Autocomplete
                    open={open2}
                    id="country-select-demo"
                    sx={{ '& fieldset': { borderRadius: 5 }, py: 1, mx: 1 }}
                    options={_.uniqWith(airportList, (arrVal, othVal) => arrVal.iata_code === othVal.iata_code)}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    onOpen={() => {
                      setOpen2(true);
                    }}
                    onClose={() => {
                      setOpen2(false);
                    }}
                    loading={loading}
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
                        {...register('arrival', { required: 'Departure Airport is Required' })}
                        error={!!errors.arrival}
                        helperText={errors.arrival?.message}
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
                          endAdornment: (
                            <>
                              {loading && open2 ? (
                                <InputAdornment position="end">
                                  <CircularProgress color="inherit" size={20} />
                                </InputAdornment>
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item container xs={12} sm={5} md={3} spacing={1} justifyContent="center" alignContent={'center'}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12} sm={6} spacing={1}>
                      {' '}
                      <DatePicker
                        defaultValue={dayjs()}
                        minDate={dayjs()}
                        disablePast
                        slotProps={{ textField: { fullWidth: true } }}
                        sx={{
                          '& .MuiInputBase-root': {
                            borderRadius: 5,
                            height: '73px',
                          },
                          pt: 1,
                          px: 1,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} spacing={1}>
                      {' '}
                      <DatePicker
                        defaultValue={dayjs('2022-04-17')}
                        slotProps={{ textField: { fullWidth: true } }}
                        sx={{
                          '& .MuiInputBase-root': {
                            borderRadius: 5,
                            height: '73px',
                          },
                          color: 'primary',
                          svg: 'blue',
                          px: 1,
                          pt: 1,
                          pb: 1,
                        }}
                      />
                    </Grid>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={3} spacing={1}>
                  <Box sx={{ pt: 1, px: 1 }}>
                    <PassengerSelect />
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </section>
    </ThemeProvider>
  );
};
export default Home;
