import React, { useState } from 'react';
import './navbar.css';
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Tooltip, useMediaQuery } from '@mui/material';
import { TravelExplore } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../Config/customTheme';

export const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:650px)');
  const isTablet = useMediaQuery('(max-width:1200px),(min-width:750p)x)');
  const theme = customTheme;
  const pages = ['Flights', 'My Tickets', 'Explore'];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [active, setActive] = useState('navBar');
  const showNav = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const closeNav = () => {
    setAnchorElNav(null);
  };
  return (
    <ThemeProvider theme={theme}>
      {!isTablet && !isMobile && (
        <Box sx={{ display: 'flex' }}>
          <AppBar component={'nav'} position={'static'} sx={{ background: theme.palette.secondary.light }}>
            <Toolbar>
              <TravelExplore color={'primary'} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((pages) => (
                  <Button key={pages} onClick={closeNav} sx={{ my: 2, color: 'primary', display: 'block' }}>
                    {pages}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={'Go to Profile'}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </ThemeProvider>
  );
};
export default Navbar;
