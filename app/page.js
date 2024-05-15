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

export default function Home() {
    
    const [position, setPosition] = useState(1); // State to store the current position of the cards
    const [isPlaying, setIsPlaying] = useState(false);

    const Logo = require('./funiki-logo.png');
    const Toy = require('./toy.png');
    const ToyPause = require('./toypause.png');



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
  
      window.addEventListener('wheel', handleScroll);
      return () => {
        window.removeEventListener('wheel', handleScroll);
      };
      
    }, []); // Empty dependency array ensures the effect runs only once
  
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

      
  
    return (
      <div className="main">
      {position ? (<Image src={Logo} width={150} alt="Funiki Logo" />) : <></> }
      <div className="carousel">
          <div className="card" style={getCardStyles(1)}>
            <div className="card-label"> Alerts </div>
            <Alert className='alert' severity="info">No disturbances detected</Alert>
            <Alert className='alert' severity="warning">Baby crying 2 hrs ago</Alert>
          </div>
          <div className="card" style={getCardStyles(2)}>
            <div className="card-label"> ✨ Light ✨</div>
            <div className="card-text"> Wirelessly control the lighting intensity and color of the toy</div>
            <Switch sx={{ transform: "scale(3.5)" }} defaultChecked color="secondary" />
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
                      '&:hover': {
                        transform: 'scale(1.2)', // Enlarge on hover
                      },
                    }}
                    onClick={() => {
                      setIsPlaying(false)
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
                    }} />       
          </div>
          <div className="card" style={getCardStyles(4)}>
            <div className="card-label sound-text">  ♬ Sound ♬ </div>
            <MediaControlCard />
          </div>
          <div className="card" style={getCardStyles(5)}>
            <div className="card-label">  🌡 Temp 🌡 </div>
            <div className="temp">  29°C </div>
            <div className="card-text"> It's recommended that the best temperature for babies is between 20 to 22 degrees Celsius.</div>
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