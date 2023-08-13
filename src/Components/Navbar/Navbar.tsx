import React, { useState } from 'react';
import './navbar.css';
import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Tooltip } from '@mui/material';
import { TravelExplore } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../Config/customTheme';

export const Navbar = () => {
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
      <AppBar position={'static'} sx={{ background: theme.palette.secondary.light }}>
        <Container maxWidth={'xl'}>
          <Toolbar disableGutters>
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
        </Container>
      </AppBar>
    </ThemeProvider>
    // <section className="navBarSection">
    //   <header className="header flex">
    //     <div className="logoDiv">
    //       <a href="#" className="logo flex">
    //         <h1>
    //           <MdOutlineTravelExplore className="icon" /> Travel.
    //         </h1>
    //       </a>
    //     </div>
    //     <div className={active}>
    //       <ul className="navLists flex">
    //         <li className="navItem">
    //           <a href="" className="navLink">
    //             Home
    //           </a>
    //         </li>
    //         <li className="navItem">
    //           <a href="" className="navLink">
    //             Packages
    //           </a>
    //         </li>
    //         <li className="navItem">
    //           <a href="" className="navLink">
    //             Shop
    //           </a>
    //         </li>
    //         <li className="navItem">
    //           <a href="" className="navLink">
    //             About
    //           </a>
    //         </li>
    //         <li className="navItem">
    //           <a href="" className="navLink">
    //             Pages
    //           </a>
    //         </li>
    //         <li className="navItem">
    //           <a href="" className="navLink">
    //             News
    //           </a>
    //         </li>
    //         <li className="navItem">
    //           <a href="" className="navLink">
    //             Contact
    //           </a>
    //         </li>
    //         <button className="btn">
    //           <a href="#">BOOK NOW</a>
    //         </button>
    //       </ul>
    //       <div onClick={closeNav} className="closeNavbar">
    //         <AiFillCloseCircle className="icon" />
    //       </div>
    //     </div>
    //     <div onClick={showNav} className="toggleNavbar">
    //       <TbGridDots className="icon" />
    //     </div>
    //   </header>
    // </section>
  );
};
export default Navbar;
