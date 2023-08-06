import React from 'react';
import customTheme from './Config/customTheme';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Home } from './Components/Home/Home';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Navbar />
      <Home />
    </ThemeProvider>
  );
}

export default App;
