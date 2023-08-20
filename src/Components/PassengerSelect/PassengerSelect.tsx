import { MenuItem, Select, useTheme } from '@mui/material';
import { useState } from 'react';

const passengerTypes = ['Adult', 'Children', 'Infants'];

export const PassengerSelect = () => {
  const passengerTypes = {
    adult: 0,
    children: 0,
    infants: 0,
  };
  const passengers = Object.keys(passengerTypes);

  const theme = useTheme();
  const [passengerNumber, setPassengerNumber] = useState(passengerTypes);
  const [passTotal, setPassTotal] = useState('I am here');
  const passengerValues = Object.values(passengerNumber);
  const [age, setAge] = useState('Ten');
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPassengerNumber({ ...passengerNumber, [name]: value });
  };

  return (
    <Select labelId="demo-customized-select-label" id="demo-customized-select" value={age} onChange={handleChange}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
};

export default PassengerSelect;
