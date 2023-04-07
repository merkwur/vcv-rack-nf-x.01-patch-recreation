import React, { useContext, 
                useEffect, 
                useState, 
                useRef, 
                createContext, 
                useMemo, 
                useLayoutEffect } from 'react'
import { ClockContext, SliderContext } from '../../App'
import VerticalSlider from "../slider/verticalSlider.component"
import "./sequencer.styles.scss"


export const SequencerContext = createContext();

const Sequencer = React.memo(() => {
  const { time } = useContext(ClockContext);
  const { step } = useContext(ClockContext);
  const [sliderValues, setSliderValues] = useContext(SliderContext);
  const sequencerStepsRef = useRef([]);
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


  useEffect(() => {
    const newSliderValues =
      sliderValues.length >= step
        ? sliderValues.slice(0, step)
        : [...sliderValues, ...Array(step - sliderValues.length).fill(0)];
    setSliderValues(newSliderValues);
    
  }, [step]);

  useEffect(() => {
    const newSequencerDivs = [];
    const newSequencerSteps = [];
    const numSteps = Math.min(step, sequencerStepsRef.current.length);
    for (let i = 0; i < numSteps; i++) {
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
    // If there are more steps than before, add new refs to the end of the array
    for (let i = sequencerStepsRef.current.length; i < step; i++) {
      sequencerStepsRef.current.push(null);
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
  }, [step]);

  useLayoutEffect(() => {
    sequencerStepsRef.current.slice(0, step).forEach((div, i) => {
      if (div) {
        div.style.backgroundColor =
          currentStep - 1 === i ? "#d79921" : "#000000";
        div.style.boxShadow =
          currentStep - 1 === i ? "0px 0px 3px 3px #d79921" : "0px 0px 0px 0px #000000";
        
      }
    });
  }, [time, step, currentStep]);


  return (
    <div className="sequence-container">
      <div className="rows">
        <div className="range">{sequencerDivs}</div>
        <div className="step">{sequencerSteps}</div>
      </div>
      <div></div>
    </div>
  );
});



export default Sequencer
