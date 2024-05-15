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


const Logo = require('./funiki-logo.png');
const Toy = require('./toy.png');
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
  boxShadow: 24,
  '&:hover': {
    boxShadow: 50,
  },
};

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="sm" sx={{ bgcolor: 'background.default', padding: 0, margin: 0 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} >
                <Paper sx={{ ...paperStyles, height: 100, bgcolor: 'pink'}} className="fill">
                <Image src={Logo} alt="Funiki Logo" />
                </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                sx={{
                  ...paperStyles,
                  height: 317,
                  backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)',
                  display: 'flex', // Apply flexbox layout
                  flexDirection: 'column', // Set flex direction to column
                  justifyContent: 'center', // Center items vertically
                  alignItems: 'center', // Center items horizontally
                  padding: '10px',
                }}
              >
                <Typography className="text light">LIGHT</Typography>
                <Switch
                  {...label}
                  defaultChecked
                  color="warning"
                  sx={{ transform: "scale(4.5) rotate(-90deg)" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={8} container spacing={1}>
              <Grid item xs={12}>
                <Paper sx={{ ...paperStyles, height: 230, backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="Toy">
                  <Grid item xs={9}>
                  <Typography className="text rotate">ROTATE</Typography> 
                  <Image src={Toy} alt="Toy" />
                  </Grid>
                  <Grid item xs={3}>
                  <VerticalToggleButtons />
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ ...paperStyles, height: 100, backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography className="text temp">TEMP: 36°C</Typography> 
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ ...paperStyles, height: 300, backgroundImage: 'linear-gradient(to right, #FDF2DC, #FCE3C5)' }}>
                <Typography className="text">SOUND</Typography> 
                {/* <MusicPlayerSlider /> */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
