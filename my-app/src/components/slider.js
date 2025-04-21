import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 'Slow',
  },
  {
    value: 100,
    label: 'Animations off',
  },
];

// function valuetext(value) {
//   return `${value}°C`;
// }



export default function AnimationSlider({setAnimationSpeed}) {
    const handleChange = (event, newValue) => {
        //Uncomment to update animationSpeed
        //setAnimationSpeed(newValue/100);
      };
    
    return (
    <Box sx={{ width: 100 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={80}
        //getAriaValueText={valuetext}
        onChange={handleChange}
        step={1}
        //marks={marks}
        valueLabelDisplay="off"
        color = "error"
      />
    </Box>
  );
}
