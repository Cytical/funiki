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
import {get, ref, set} from 'firebase/database';
import {db} from './utils/firebaseConfig';

export default function Home() {
    
    const [position, setPosition] = useState(1); // State to store the current position of the cards
    const [isPlaying, setIsPlaying] = useState(false);

    const Logo = require('./funiki-logo.png');
    // const Toy = require('./toy.png');
    // const ToyPause = require('./toypause.png');

    const [heatIndex, setHeatIndex] = useState(0);
    const [ldr, setLdr] = useState(0);
    const [brightness, setBrightness] = useState(30);
    const [motorStep, setmotorStep] = useState(0);

    useEffect(() => {
      const heatRef = ref(db, 'Sensor/heatIndex_data')
      get(heatRef).then((snapshot) => {
        if (snapshot.exists()){
          const heatIndexFetch = snapshot.val();
          setHeatIndex(heatIndexFetch);
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.log(error);
      });

      const ldrRef = ref(db, 'Sensor/ldr_data')
      get(ldrRef).then((snapshot) => {
        if (snapshot.exists()){
          const ldrFetch = snapshot.val();
          setLdr(ldrFetch);
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.log(error);
      });

      const brightnessRef = ref(db, 'Actuator/LED/brightness')
      get(brightnessRef).then((snapshot) => {
        if (snapshot.exists()){
          const brightnessFetch = snapshot.val();
          setBrightness(brightnessFetch);
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.log(error);
      });

      const stepRef = ref(db, 'Actuator/Motor/step')
      get(stepRef).then((snapshot) => {
        if (snapshot.exists()){
          const stepFetch = snapshot.val();
          setmotorStep(stepFetch);
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.log(error);
      });
    }, []);

    console.log(`heatIndex: ${heatIndex}`);
    console.log(`ldr: ${ldr}`);
    console.log(`brifght: ${brightness}`);
    console.log(`step: ${motorStep}`);
    // useEffect(() => {
    //     console.log(position)}
    // , [position])
  
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
        setBrightness(newValue);
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

      

      
  
    return (
      <div className="main">
      {position ? (<Image src={Logo} width={150} alt="Funiki Logo" />) : <></> }
      <div className="carousel">
          <div className="card" style={getCardStyles(1)}>
            <div className="card-label"> 🔔 Alerts 🔔 </div>
            <Alert className='alert' severity="info">No disturbances detected</Alert>
            <Alert className='alert' severity="warning">Baby crying 2 hrs ago</Alert>
          </div>
          <div className="card" style={getCardStyles(2)}>
            <div className="card-label"> ✨ Light ✨</div>
            <div className="card-text"> Wirelessly control the lighting intensity and color of the toy</div>
          
                <Slider
                  aria-label="Brightness"
                  value={brightness}
                  onChange={handleBrightnessChange}
                  color="secondary"
                  valueLabelDisplay="auto"
                />
                    
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
            <iframe height="200" src="https://www.youtube.com/embed/W-vBu2rf8TI?si=ruyWR9tC_TfSPgp6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className="card" style={getCardStyles(5)}>
            <div className="card-label">  🌡 Heat Index 🌡 </div>
            <div className="temp">  {heatIndex.toFixed(1)}°C </div>
            <div className="card-text"> It is recommended that the best temperature for babies is between 20 to 22 degrees Celsius.</div>
          </div>
          <div className="card" style={getCardStyles(6)}>
            <div className="card-label"> Alerts </div>
            <Alert className='alert' severity="info">No disturbances detected</Alert>
            <Alert className='alert' severity="warning">Baby crying 2 hrs ago</Alert>
          </div>
      </div>
      </div>
    );
  };