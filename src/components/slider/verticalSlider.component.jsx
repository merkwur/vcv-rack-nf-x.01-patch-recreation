import React, { useState } from 'react';
import Slider from 'react-slider';
import "./verticalSlider.styles.scss"

const VerticalSlider = ({ min, max, step, value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <Slider
      orientation="vertical"
      min={min}
      max={max}
      step={step}
      value={sliderValue}
      onChange={handleSliderChange}   
      className="vertical-slider"
    />
  );
};

export default VerticalSlider;
