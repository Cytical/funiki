'use client';
import Image from "next/image";
import { Container, Typography, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import "./page.css"
import RotatedSlider from './RotatedSlider';
import MusicPlayerSlider from "./MusicPlayer";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import BlockIcon from '@mui/icons-material/Block';
import VerticalToggleButtons from "./verticaltogglebutton";
import React, { useEffect, useState, useRef } from 'react';
import { DotLottiePlayer, Controls } from '@dotlottie/react-player';

export default function Home() {

  const [isYellow, setIsYellow] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleColor = () => {
    setIsYellow(prevState => !prevState);
  };

  const Logo = require('./funiki-logo.png');
  const Toy = require('./toy.png');
  const ToyPause = require('./toypause.png');

  useEffect(() => {
    console.log(isPlaying)
  })


  // Define a custom theme
  const theme = createTheme({
    palette: {
      background: {
        default: 'white',
      },
      primary: {
        main: '#1C214A',
        text: '#FEFEEB',
      },
    },
  });

  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

  // Define the common styles for the papers
  const paperStyles = {
    fontFamily: 'Arial Black',
    height: 150,
    borderRadius: 2,
    boxShadow: 4,
    '&:hover': {
      boxShadow: 50,
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="sm" sx={{ bgcolor: 'background.default', padding: 0, margin: 0 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} >
                <Paper sx={{ ...paperStyles, height: 100, bgcolor: '#D5B6D2'}} className="fill">
                <Image src={Logo} alt="Funiki Logo" />
                {/* <Typography className="text">FUNIKI</Typography> */}
                </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                onClick={toggleColor}
                sx={{
                  ...paperStyles,
                  height: 169,
                  bgcolor: isYellow ? '#F6E6A0' : '#FEFEEB',
                  display: 'flex', // Apply flexbox layout
                  flexDirection: 'column', // Set flex direction to column
                  justifyContent: 'center', // Center items vertically
                  alignItems: 'center', // Center items horizontally
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <Typography className="text light">✨Light✨</Typography>
                <Typography className="text on">On</Typography>

              </Paper>
              <Paper
                onClick={toggleColor}
                sx={{
                  ...paperStyles,
                  height: 169,
                  bgcolor: isYellow ? '#FEFEEB' : '#F6E6A0',
                  display: 'flex', // Apply flexbox layout
                  flexDirection: 'column', // Set flex direction to column
                  justifyContent: 'center', // Center items vertically
                  alignItems: 'center', // Center items horizontally
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
         
                }}
              >
                <Typography className="text">Off</Typography>

              </Paper>
            </Grid>
            <Grid item xs={8} container spacing={0}>
              <Grid item xs={8}>
                <Paper sx={{ ...paperStyles, height: 230, backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="Toy">
           
                  <Typography className="text rotate">ROTATE</Typography> 
                  {/* <Image src={Toy} alt="Toy" /> */}
                  {isPlaying ? (
                    <DotLottiePlayer
                      src="https://lottie.host/bb489335-1601-463e-883b-1f5fced327b9/kcP0nWpA5P.json"
                      background="transparent"
                      speed={1}
                      style={{ width: '300px', height: '300px' }}
                      loop
                      autoplay={isPlaying} // Play animation when isPlaying is true
                    />
                  ) : (
                    <h2>PAUSED</h2>
                        )}
      
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Grid item xs={6}>
                  <Paper sx={{ ...paperStyles, height: 115, backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="Button">
                    <BlockIcon sx={{
                      width: '70%',
                      height: '70%',
                      '&:hover': {
                        transform: 'scale(1.2)', // Enlarge on hover
                      },
                    }}
                    onClick={() => {
                      setIsPlaying(false)
                    }} />
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                <Paper sx={{ ...paperStyles, height: 115, backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="Button">
                  <RotateRightIcon sx={{
                      width: '70%',
                      height: '70%',
                      '&:hover': {
                        transform: 'scale(1.2)', // Enlarge on hover
                      },
                    }}
                    onClick={() => {
                      setIsPlaying(true)
                    }} />
                  </Paper>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ ...paperStyles, height: 100, backgroundImage: 'linear-gradient(to left, #4DA8DA, #00B0F0, #CCE0FF, #FFCCCB, #FF6666, #FF3333)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Typography className="text temp">TEMP: 36°C</Typography> 
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Paper sx={{ ...paperStyles, height: 300, backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)' }}>
                <Typography className="text">SOUND</Typography> 
                {/* <MusicPlayerSlider /> */}
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper sx={{ ...paperStyles, height: 300, backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)' }}>
                <Typography className="text">ALERTS</Typography> 
                {/* <MusicPlayerSlider /> */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
