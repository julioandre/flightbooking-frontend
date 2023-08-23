import { Box, Button, InputAdornment, MenuItem, OutlinedInput, Select, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import ManIcon from '@mui/icons-material/Man';
import { CustomNumberInput } from '../IntegerInput/IntegerInput';

const passengerTypes = ['Adult', 'Children', 'Infants'];

export const PassengerSelect = () => {
  const passengerTypes = {
    Adult: 0,
    Children: 0,
    Infants: 0,
  };
  const passengers = Object.entries(passengerTypes);
  const tuff = ['Adult', 'Children', 'Infants'];

  const theme = useTheme();
  const [passengerNumber, setPassengerNumber] = useState(passengerTypes);
  const [passTotal, setPassTotal] = useState('I am here');
  const [open, setOpen] = useState(false);
  const passengerValues = Object.values(passengerNumber);
  const handleChange = (e: any) => {
    console.log(passengers);
    const { id, value } = e.target;
    console.log(id, value);
    setPassengerNumber({ ...passengerNumber, [id]: value });
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        fullWidth
        open={open}
        startAdornment={
          <InputAdornment position="start">
            <ManIcon className="icon" color="primary" />
          </InputAdornment>
        }
        renderValue={() => {
          return (
            <em style={{ maxWidth: '30px' }}>
              {passengerNumber.Adult +
                ' Adult(s) ' +
                passengerNumber.Children +
                ' Children ' +
                passengerNumber.Infants +
                ' Infant(s) '}
            </em>
          );
        }}
        sx={{
          height: '73px',
          px: 1,
          borderRadius: 5,
        }}
        onOpen={(e) => {
          setOpen(true);
        }}
        value={passengerNumber}
        input={<OutlinedInput />}
      >
        {passengers.map(([keys, value]) => (
          <MenuItem
            key={keys}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Box display="flex" width="50%">
              <Typography variant="h6">{keys}</Typography>
            </Box>
            <Box display="flex">
              <CustomNumberInput
                id={keys}
                // To get ride pof type error with typescript
                value={passengerNumber[keys as keyof typeof passengerNumber]}
                defaultValue={value}
                onChange={handleChange}
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            </Box>
          </MenuItem>
        ))}
        <Box className="container" justifyContent="right" display="flex" sx={{ mt: 2 }}>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="customButton"
            sx={{ color: 'white' }}
          >
            Done
          </Button>
        </Box>
      </Select>
    </Box>
  );
};

export default PassengerSelect;
