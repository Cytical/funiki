import Slider from '@mui/material/Slider';

const RotatedSlider = () => (
  <div style={{ width: '100px', height: '300px', position: 'relative' }}>
    <Slider
      orientation="vertical"
      aria-label="Light"
      defaultValue={30}
      valueLabelDisplay="auto"
      shiftStep={30}
      step={10}
      marks
      min={10}
      max={100}
      sx={{
        '& .MuiSlider-track': {
          width: '8px',
          borderRadius: '4px',
          transform: 'inherit',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%) rotate(90deg)',
        },
        '& .MuiSlider-rail': {
          width: '8px',
          borderRadius: '4px',
          transform: 'inherit',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%) rotate(90deg)',
        },
        '& .MuiSlider-thumb': {
          transform: 'rotate(-90deg)',
        },
      }}
    />
  </div>
);

export default RotatedSlider;
