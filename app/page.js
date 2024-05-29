'use client';
import Image from "next/image";
import { Container, Typography, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import "./page.css"
import RotateRightIcon from '@mui/icons-material/RotateRight';
import BlockIcon from '@mui/icons-material/Block';
import React, { useEffect, useState, useRef } from 'react';
import { DotLottiePlayer, Controls } from '@dotlottie/react-player';
import Alert from '@mui/material/Alert';
import MediaControlCard from "./MediaController";
import data from "./utils/firebaseConfig";
import {get, ref, set, onValue} from 'firebase/database';
import {db} from './utils/firebaseConfig';
import { MuiColorInput } from 'mui-color-input';
import Button from '@mui/material/Button';

export default function Home() {
    
  const [position, setPosition] = useState(1); // State to store the current position of the cards
  const [isPlaying, setIsPlaying] = useState(false);
  const [music, setMusic] = useState(0);

  const Logo = require('./funiki-logo.png');

  const [heatIndex, setHeatIndex] = useState(0);
  const [ldr, setLdr] = useState(0);
  const [brightness, setBrightness] = useState(30);
  const [motorStep, setmotorStep] = useState(0);
  const [color, setColor] = useState(0);

  useEffect(() => {
    const heatRef = ref(db, 'Sensor/heatIndex_data');
    const ldrRef = ref(db, 'Sensor/ldr_data');
    const brightnessRef = ref(db, 'Actuator/LED/brightness');
    const stepRef = ref(db, 'Actuator/Motor/step');

    const handleDataChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (snapshot.ref.key === 'heatIndex_data') setHeatIndex(data);
        if (snapshot.ref.key === 'ldr_data') setLdr(data);
        if (snapshot.ref.key === 'brightness') setBrightness(data);
        if (snapshot.ref.key === 'step') setmotorStep(data);
      }
    };

    const listeners = [
      onValue(heatRef, handleDataChange),
      onValue(ldrRef, handleDataChange),
      onValue(brightnessRef, handleDataChange),
      onValue(stepRef, handleDataChange),
    ];

    // Initial data fetch
    get(heatRef).then((snapshot) => {
      if (snapshot.exists()) {
        setHeatIndex(snapshot.val());
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.log(error);
    });

    get(ldrRef).then((snapshot) => {
      if (snapshot.exists()) {
        setLdr(snapshot.val());
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.log(error);
    });

    get(brightnessRef).then((snapshot) => {
      if (snapshot.exists()) {
        setBrightness(snapshot.val());
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.log(error);
    });

    get(stepRef).then((snapshot) => {
      if (snapshot.exists()) {
        setmotorStep(snapshot.val());
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.log(error);
    });

    // Clean up listeners on unmount
    return () => {
      listeners.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  console.log(`heatIndex: ${heatIndex}`);
  console.log(`ldr: ${ldr}`);
  console.log(`brifght: ${brightness}`);
  console.log(`step: ${motorStep}`);
  
    useEffect(() => {
      const handleScroll = (event) => {
          if (event.deltaY > 0) {
              setPosition((prevPosition) => (prevPosition === 5 ? 1 : prevPosition + 1)); // Move up
          } else {
              setPosition((prevPosition) => (prevPosition === 1 ? 5 : prevPosition - 1)); // Move down
          }
      };

      const handleTouchStart = (event) => {
          const touchStartY = event.touches[0].clientY;
          event.currentTarget.touchStartY = touchStartY;
      };

      const handleTouchMove = (event) => {
          if (!event.currentTarget.touchStartY) return;
          const touchEndY = event.touches[0].clientY;
          const touchDeltaY = event.currentTarget.touchStartY - touchEndY;

          if (touchDeltaY > 50) {
              setPosition((prevPosition) => (prevPosition === 5 ? 1 : prevPosition + 1));
              event.currentTarget.touchStartY = null;
          } else if (touchDeltaY < -50) {
              setPosition((prevPosition) => (prevPosition === 1 ? 5 : prevPosition - 1));
              event.currentTarget.touchStartY = null;
          }
      };

      window.addEventListener('wheel', handleScroll);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);

      return () => {
          window.removeEventListener('wheel', handleScroll);
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchmove', handleTouchMove);
      };
  }, []);
  
    const getCardStyles = (index) => {
      let adjustedPosition = position;
      if (position === 5 && index === 1) {
        adjustedPosition = 6; // Wrap around to position 1 when at position 5
      } else if (position === 1 && index === 5) {
        adjustedPosition = 0; // Wrap around to position 5 when at position 1
      }
      
      const cardPosition = index - adjustedPosition;
      let transform, opacity, visibility;
  
      if (cardPosition === 0) {
        transform = 'translateY(0) scale(1)';
        opacity = 1;
        visibility = 'visible';
      } else if (Math.abs(cardPosition) === 1) {
        transform = `translateY(${cardPosition * 100}%) scale(0.7)`;
        opacity = 0.4;
        visibility = 'visible';
      } else {
        transform = 'translateY(-100%) scale(0.5)';
        opacity = 0;
        visibility = 'hidden';
      }
  
      return {
        transform,
        opacity,
        visibility
      };
    };

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

      const handleBrightnessChange = (event, newValue) => {
        setBrightness(newValue * 2.5);
        const brightnessRef = ref(db, 'Actuator/LED/brightness');
        set(brightnessRef, newValue).catch((error) => {
          console.log(error);
        });
      };

      const handleMotorChange = (motorSwitch) => {
        if (motorSwitch === 'on') {
          setmotorStep(5);
          const stepRef = ref(db, 'Actuator/Motor/step');
          // console.log("ON")
          set(stepRef, 5).catch((error) => {
            console.log(error);
          });
        }
        else {
          // console.log("OFF")
        setmotorStep(0);
        const stepRef = ref(db, 'Actuator/Motor/step');
        set(stepRef, 0).catch((error) => {
          console.log(error);
        });
        }
      };

      const handleColorChange = (newValue) => {
        setColor(newValue);
        const updatedValue = parseInt(newValue.slice(1), 16)
        const colorRef = ref(db, 'Actuator/LED/color');
        set(colorRef, updatedValue).catch((error) => {
          console.log(error);
        });
      };

      const handleMusicChange = (newValue) => {
        setMusic(newValue);
        const musicRef = ref(db, 'Actuator/Music');
        set(musicRef, newValue).catch((error) => {
          console.log(error);
        });
      };

      

      

      
  
    return (
      <div className="main">
      {position ? (<Image src={Logo} width={150} alt="Funiki Logo" />) : <></> }
      <div className="carousel">
          <div className="card" style={getCardStyles(1)}>
            <div className="card-label"> 🔔 Alerts 🔔 </div>
            { (ldr <= 2047) && (heatIndex <= 35) && (heatIndex >= 16) ? <Alert className='alert' severity="success"> Room is in optimal condtion</Alert> : <> </>}
            { ldr >= 2047 ? <Alert className='alert' severity="info"> Room is too bright </Alert> : <> </>}
            { heatIndex >= 35 ? <Alert className='alert' severity="info" > Room is too hot </Alert> : <> </>}
            { heatIndex <= 16 ? <Alert className='alert' severity="info"> Room is too cold </Alert> : <> </>}
            
          </div>
          <div className="card" style={getCardStyles(2)}>
            <div className="card-label"> ✨ Light ✨</div>
            <div className="card-text light-text"> Wirelessly control the lighting intensity and color of the toy</div>
          
                <Slider
                  aria-label="Brightness"
                  value={brightness}
                  onChange={handleBrightnessChange}
                  color="secondary"
                  valueLabelDisplay="auto"
                  className="lightslider"
                />

                <MuiColorInput className="colorpicker" format="hex" value={color} onChange={handleColorChange} />
                    
          </div>
          <div className="card" style={getCardStyles(3)}>
            <div className="card-label">  🗘 Rotation 🗘</div> 
            {isPlaying ? (
                    <DotLottiePlayer
                      src="https://lottie.host/bb489335-1601-463e-883b-1f5fced327b9/kcP0nWpA5P.json"
                      background="transparent"
                      speed={1}
                      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                      loop
                      autoplay={isPlaying} // Play animation when isPlaying is true
                    />
                  ) : (
                    <div className="paused">PAUSED</div>
                        )}   

                <BlockIcon sx={{
                      width: '20%',
                      height: '20%',
                      color: '#551D62',
                      mt: 20,
                      mr: 7,
                      '&:hover': {
                        transform: 'scale(1.2)', // Enlarge on hover
                      },
                    }}
                    onClick={() => {
                      setIsPlaying(false)
                      handleMotorChange("off")
                    }} />

                <RotateRightIcon sx={{
                      width: '20%',
                      height: '20%',
                      color: '#551D62',
                      '&:hover': {
                        transform: 'scale(1.2)', // Enlarge on hover
                      },
                    }}
                    onClick={() => {
                      setIsPlaying(true)
                      handleMotorChange("on")
                    }} />       
          </div>
          <div className="card" style={getCardStyles(4)}>
            <div className="card-label sound-text">  ♬ Sound ♬ </div>
            {/* <MediaControlCard /> */}
            <iframe height="180" src="https://www.youtube.com/embed/W-vBu2rf8TI?si=ruyWR9tC_TfSPgp6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            <div className="button-container">
              <Button className="music-btn" onClick={() => handleMusicChange(1)} variant="contained">1</Button>
              <Button className="music-btn" onClick={() => handleMusicChange(2)} variant="contained">2</Button>
              <Button className="music-btn" onClick={() => handleMusicChange(3)} variant="contained">3</Button>
            </div>
          </div>

          
          <div className="card" style={getCardStyles(5)}>
            <div className="card-label">  🌡 Heat Index 🌡 </div>
            <div className="temp">  {heatIndex.toFixed(1)}°C </div>
            <div className="card-text"> It is recommended that the best temperature for babies is between 20 to 22 degrees Celsius.</div>
          </div>
          <div className="card" style={getCardStyles(6)}>
            <div className="card-label"> 🔔 Alerts 🔔 </div>
            { ldr > 2047 ? <Alert className='alert' severity="info"> Room is too bright </Alert> : <> </>}
            { heatIndex > 35 ? <Alert className='alert' severity="info"> Room is too hot </Alert> : <> </>}
            { heatIndex < 16 ? <Alert className='alert' severity="info"> Room is too cold </Alert> : <> </>}
          </div>
      </div>
      </div>
    );
  };