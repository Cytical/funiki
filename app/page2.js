'use client';
import Image from "next/image";
import { Container, Typography, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePaperClick = (index) => {
    setCurrentIndex(index);
  };

  const Logo = require('./funiki-logo.png');
  const papers = [
    { title: "Light" },
    { title: "Rotation" },
    { title: "Temperature" },
    { title: "Sound" }
  ];

  // Define a custom theme
  const theme = createTheme({
    palette: {
      background: {
        default: 'white',
      },
      primary: {
        main: '#FEFEEB',
        text: '#FEFEEB',
      },
    },
  });

  // Define the common styles for the papers
  const paperStyles = {
    fontFamily: 'Arial Black',
    borderRadius: 10,
    justifyContent: 'center', // Center items horizontally
    boxShadow: 4,
    transition: 'transform 0.5s ease', // Smooth sliding animation
    '&:hover': {
      boxShadow: 50,
    },
  };

  const selectedPaperStyles = {
    ...paperStyles,
    transform: 'scale(1.1)', // Enlarge the selected paper
    zIndex: 1, // Ensure the selected paper is on top
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ bgcolor: 'background.default', padding: 0, margin: 0 }}>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <Image
                src={Logo} // Pass the logo source as a prop
                alt="Funiki Logo" // Alt text for accessibility
                width={150} // Specify the width
              />
            </Grid>
            {papers.map((paper, index) => (
              <Grid xs={12} md={6} key={index}>
                <Paper
                  onClick={() => handlePaperClick(index)}
                  sx={currentIndex === index ? selectedPaperStyles : paperStyles}
                  className="fill"
                >
                  <Typography className="text">{paper.title}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
