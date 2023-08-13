import React from 'react';
import customTheme from './Config/customTheme';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Home } from './Components/Home/Home';
import { ThemeProvider } from '@emotion/react';
import BottomNav from './Components/Navbar/BottomNav';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Navbar />
      <Home />
      <BottomNav />
    </ThemeProvider>
  );
}

export default App;
