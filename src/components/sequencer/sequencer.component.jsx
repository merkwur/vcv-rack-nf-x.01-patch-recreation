import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import VerticalSlider from "../slider/verticalSlider.component"
import "./sequencer.styles.scss"


const Sequencer = (props) => {
  const sequencerDivsRef = useRef([]);
  const sequencerStepsRef = useRef([]);
  const [senderVals, setSenderVals] = useState(Array(10).fill(0))
  const currentStep = props.currentStep % props.steps
  const [sliderValues, setSliderValues] = useState(Array(10).fill(0));
  const [sequencerDivs, setSequencerDivs] = useState([]);
  const [sequencerSteps, setSequencerSteps] = useState([]);

  const handleSliderChange = (value, index) => {
    // console.log(sliderValues, value, index)
    const newValue = Math.abs(value)
    
    if (newValue !== null) {
      setSliderValues(prevState => {
        const updatedValues = [...prevState];
        updatedValues[index] = Number(newValue);
        setSenderVals(updatedValues)
        return updatedValues;
      });
    }
  };
  
  useEffect(() => {
    sequencerStepsRef.current.forEach((div, i) => {
      div.style.backgroundColor = currentStep === i ? '#aa4242' : '#000000';
    });

    // console.log(senderVals[currentStep])
  }, [currentStep]);
  
  useEffect(() => {
    const newSequencerDivs = [];
    const newSequencerSteps = [];
    for (let i = 0; i < props.steps; i++) {
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
  }, [props.steps, sliderValues]);

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
    </div>        
  )
}

export default Sequencer
