'use client';
import Image from "next/image";
import { Container, Typography, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, ThemeProvider, createTheme } from '@mui/material';

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

// Define the common styles for the papers
const paperStyles = {
  height: 150,
  borderRadius: 2,
  boxShadow: 20,
  bgcolor: '#FFD6AF',
  '&:hover': {
    bgcolor: 'primary.dark',
  },
};

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default', minHeight: '100vh' }}>
         <Container maxWidth="sm" sx={{ bgcolor: 'background.default', padding: 0, margin: 0 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Paper sx={{ ...paperStyles, height: 100 }} elevation={24}>
                <Typography variant="h2">Funiki</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ ...paperStyles, height: 100 }} />
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ ...paperStyles, height: 100 }} />
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ ...paperStyles, height: 317 }}>
                <Typography variant="h5">Light</Typography>
              </Paper>
            </Grid>
            <Grid item xs={8} container spacing={1}>
              <Grid item xs={12}>
                <Paper sx={{ ...paperStyles, height: 200 }}>
                  <Typography variant="h5">Toy Rotation</Typography> 
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ ...paperStyles, height: 100 }}>
                  <Typography variant="h5">Temperature</Typography> 
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ ...paperStyles, height: 300 }}>
                <Typography variant="h5">Sound</Typography> 
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
