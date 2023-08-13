import React from 'react';
import './navbar.css';
import { BottomNavigation, BottomNavigationAction, useMediaQuery } from '@mui/material';
import { AirplaneTicket } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeProvider } from '@emotion/react';
import FlightIcon from '@mui/icons-material/Flight';
import customTheme from '../../Config/customTheme';
import ExploreIcon from '@mui/icons-material/Explore';

export const BottomNav = () => {
  const isMobile = useMediaQuery('(max-width:650px)');
  const isTablet = useMediaQuery('(max-width:1200px),(min-width:750p)x)');
  const theme = customTheme;
  const [value, setValue] = React.useState(0);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const showNav = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const closeNav = () => {
    setAnchorElNav(null);
  };
  return (
    <ThemeProvider theme={theme}>
      {isTablet && (
        <>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Flights" icon={<FlightIcon />} />
            <BottomNavigationAction label="Tickets" icon={<AirplaneTicket />} />
            <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
            <BottomNavigationAction label="Explore" icon={<PersonIcon />} />
          </BottomNavigation>{' '}
        </>
      )}
    </ThemeProvider>
  );
};
export default BottomNav;
