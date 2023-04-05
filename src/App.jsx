import './App.scss'
import * as Tone from "tone";
import React, { useContext, useEffect, useState,  createContext } from 'react';
import Clock from './components/clock/clock.component'
import Sequencer from './components/sequencer/sequencer.component';
import Quantizer from './components/quantizer/qunatizer.component';
import FineTune from './components/fine-tune-keys/fine-tune-keys.component';
import { Key } from 'tonal';

export const ClockContext = createContext();
export const ScaleContext = createContext();
export const SliderContext = createContext();


const App = React.memo(() => {
  const [time, setTime] = useState(0)
  const [step, setStep] = useState(8)
  const [run, setRun] = useState(false)
  const [scale, setScale] = useState(Key.majorKey("C").scale)

  const [sliderValues, setsliderValues] = useState([])


  return (
    <div className="App">
        <ClockContext.Provider value={{time, setTime, 
                                      step, setStep, 
                                      run, setRun}}>
          
          <div>
            <Clock  bpm={120}/>
          </div>
          <SliderContext.Provider value={{sliderValues}}>
            <div>
              <Sequencer />
            </div>
              <ScaleContext.Provider value={[scale, setScale]}>
                <div>
                  <FineTune /> 
                </div>
                <div>
                  <Quantizer /> 
                </div>
              </ScaleContext.Provider>
          </SliderContext.Provider>
        </ClockContext.Provider>
        <div>
        </div>
    </div>
  )
})

export default App
