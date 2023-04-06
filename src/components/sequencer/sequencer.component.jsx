import React, { useContext, 
                useEffect, 
                useCallback,
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
  const {time} = useContext(ClockContext);
  const {step} = useContext(ClockContext)
  const [sliderValues, setSliderValues] = useContext(SliderContext)
  const sequencerStepsRef = useRef([]);
  const [sequencerDivs, setSequencerDivs] = useState([]);
  const [sequencerSteps, setSequencerSteps] = useState([]);
  const [sliderArr, setSliderArr] =  useState(Array(step).fill(0))

  const handleSliderChange = (value, index) => {
    console.log("hey here")
    const newValue = Math.abs(value)
    if (newValue !== null) {
      setSliderArr(prevState => {
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

  const updateSliders = useCallback((keys) => {
    setSliderValues(keys);
  }, [setSliderValues]);

  useEffect(() => {
    console.log(sliderValues)
  }, [step])
  
  useEffect(() => {
    updateSliders(sliderArr);
  }, [sliderArr, updateSliders, step]);

  
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
          value={sliderArr[i]}
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
  }, [step, sliderArr]);

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
