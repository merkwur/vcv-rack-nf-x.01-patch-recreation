import React, { useContext, useEffect, useState, useRef, createContext, useMemo, useLayoutEffect } from 'react'
import { ClockContext } from '../../App'
import VerticalSlider from "../slider/verticalSlider.component"
import "./sequencer.styles.scss"
import Quantizer from '../quantizer/qunatizer.component'

export const SequencerContext = createContext();

const Sequencer = React.memo(() => {
  const {time} = useContext(ClockContext);
  const {step} = useContext(ClockContext)
  
  
  const sequencerStepsRef = useRef([]);
  const [sliderValues, setSliderValues] = useState(Array(step).fill(0));
  const [sequencerDivs, setSequencerDivs] = useState([]);
  const [sequencerSteps, setSequencerSteps] = useState([]);

  const handleSliderChange = (value, index) => {
    const newValue = Math.abs(value)
    if (newValue !== null) {
      setSliderValues(prevState => {
        const updatedValues = [...prevState];
        updatedValues[index] = Number(newValue);
        return updatedValues;
      });
    }
  };

  const currentStep = useMemo(() => {
    return time % step;
  }, [time, step]);

  
  useLayoutEffect(() => {
    sequencerStepsRef.current.forEach((div, i) => {
      div.style.backgroundColor = currentStep-1 === i ? '#aa4242' : '#000000';
    });
    
  }, [time]);

  
  useEffect(() => {
    const newSequencerDivs = [];
    const newSequencerSteps = [];
    for (let i = 0; i < step; i++) {
      newSequencerDivs.push(
        <VerticalSlider
          key={i}
          className={`sequencer-bar ${i}`}
          min={-100}
          max={0}
          step={1}
          value={sliderValues[i]}
          onChange={(value) => handleSliderChange(value, i)}
        />
      );
      newSequencerSteps.push(
        <div
          key={i}
          className="sequencer-step"
          ref={(ref) => (sequencerStepsRef.current[i] = ref)}
        />
      );
    }
    setSequencerDivs(newSequencerDivs);
    setSequencerSteps(newSequencerSteps);
  }, [step, sliderValues]);

  return (
    <div className='sequence-container'>
      <div className='rows'>
        <div className='range'>
          {sequencerDivs}
          
        </div>
        <div className='step'>
          {sequencerSteps}
        </div>
      </div>
    <div>
    </div>
    </div>        
  )
})

export default Sequencer
