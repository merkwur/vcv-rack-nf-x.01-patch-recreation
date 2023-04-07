import "./clock.styles.scss"
import React, { useState, useEffect, useContext } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import { ClockContext } from '../../App';

const sequenceLenght = Array.from({length: 16}, (_, i) => i + 1)

const Clock = React.memo(({ bpm }) => {
  const {time, setTime} = useContext(ClockContext);
  const {step, setStep} = useContext(ClockContext)
  const {run, setRun} = useContext(ClockContext)
  const [BPM, setBPM] = useState(bpm);
  const [intervalId, setIntervalId] = useState(0);
  const [doubleIt, setdoubleIt] = useState(false);
  const [quadrupleIt, setQuadrupleIt] = useState(false);
  
  const handleClock = () => {
    if (!run){
      clearInterval(intervalId);
      const id = setInterval(() => setTime(prevTime => prevTime + 1), 60000 / BPM);
      setIntervalId(id);
      setRun(true)

    } else {
        clearInterval(intervalId);
        setIntervalId(null);
        setTime(0);
        setRun(false)
    }
  };

  const handleStepChange = (value)=>{
    setStep(value)
  }

  const handleDoubleIt = () => {
    if(!doubleIt & !quadrupleIt){
      setBPM(BPM*2)
      setdoubleIt(true)
    } else if (!quadrupleIt){
      setBPM(Math.floor(BPM*.5))
      setdoubleIt(false)
    }
  }
  
  const handleQuadrupleIt = () => {
    if(!quadrupleIt & !doubleIt){
      setBPM(BPM*4)
      setQuadrupleIt(true)
    } else if (!doubleIt){
      setBPM(Math.floor(BPM*.25))
      setQuadrupleIt(false)
    }
  }

  const stopClock = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTime(0);
    setRun(false)
  };
  
  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      const id = setInterval(() => setTime(prevTime => prevTime + 1), 60000 / BPM);
      setIntervalId(id);
    }
    
  }, [BPM]);

  const handleBPMChange = (value) => {    
    setBPM(value)

  };
  

  return (
    <div className='about-time'>
      <div className='clock-panel'>
        <div className='counter'>
          {time}
        </div>
        <div className='bpm-panel'>
          <CircularSlider
            key={1}
            width={100}
            className="steps"
            hideKnob={false}
            labelFontSize={"14pt"}
            valueFontSize={'18pt'}
            verticalOffset={"0px"}
            label="BPM"
            labelColor="#d3869d"
            knobColor="#b16286"
            progressColorFrom="#aa424200"
            progressColorTo="#ff424200"
            progressSize={6}
            knobSize={24}
            trackColor="#000000"
            trackSize={4}
            data={Array.from({length: 240}, (_, i) => i + 1)} //...
            dataIndex={bpm-1}
            onChange={ (value) => { handleBPMChange(value) } }
          />
        </div>
        <div className='multiplier'>
          <button className='twox'
                  onClick={handleDoubleIt}
          >
            2x
          </button>
          <button className='twox'
                  onClick={handleQuadrupleIt}
          >
            4x
          </button>
        </div>
        <div className='step-wrapper'>
          <CircularSlider
              key={1}
              width={100}
              className="steps"
              hideKnob={false}
              labelFontSize={"14pt"}
              valueFontSize={'18pt'}
              verticalOffset={"0px"}
              label="steps"
              labelColor="#d3869d"
              knobColor="#b16286"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={24}
              trackColor="#000000"
              trackSize={4}
              data={sequenceLenght} //...
              dataIndex={7}
              onChange={ (value) => { handleStepChange(value) } }
          />
        </div>
            <div className='buttons'>
              <button className='start' onClick={() => handleClock()}>
                <span>
                  {!run ? `>` : `|`}  
                </span>
              </button>      
            </div>
          </div>    

      </div>

  );
})

export default Clock;
