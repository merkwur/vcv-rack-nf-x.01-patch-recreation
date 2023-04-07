import './App.scss'
import React, {useState,  createContext} from 'react';
import Clock from './components/clock/clock.component'
import Sequencer from './components/sequencer/sequencer.component';
import Quantizer from './components/quantizer/quantizer.component';
import FineTune from './components/fine-tune-keys/fine-tune-keys.component';
import Synthesizer from './components/synth/synthesizer-main.component';
import { Key } from 'tonal';
import {carrier, 
        carrierFrequencyShift, 
        carrierAmplitude,
        carrierEnv,
        carrierReverb,
        modulator, 
        modulatorFrequencyShift,
        modulatorAmplitude,
        modulatorReverb} from './components/synth/synthesizer';
import ErrorBoundary from './errorBoundary.component';

export const ClockContext = createContext();
export const ScaleContext = createContext();
export const SliderContext = createContext();
export const PitchContext = createContext();


const App = React.memo(() => {
  const [time, setTime] = useState(0)
  const [step, setStep] = useState(8)
  const [run, setRun] = useState(false)
  const [tick, setTick] = useState(120)
  const [scale, setScale] = useState(Key.majorKey("C").scale)
  const [pitch, setPitch] = useState("C1")
  const [sliderValues, setsliderValues] = useState([...Array(step).fill(0)])

  return (
    <div className="App">
        <ClockContext.Provider value={{time, setTime, 
                                       step, setStep, 
                                       run,  setRun,
                                       tick,  setTick}}>          
          <div>
            <Clock bpm={120}/>
          </div>
          <SliderContext.Provider value={[sliderValues, setsliderValues]}>
            <div>
              <Sequencer />
            </div>
              <ScaleContext.Provider value={[scale, setScale]}>
                <PitchContext.Provider value={[pitch, setPitch]}>
                  <div>
                    <FineTune /> 
                  </div>
                  <div>
                    <Quantizer /> 
                  </div>
                  <div>
                    
                      <Synthesizer carrier={carrier}
                                   carrierFrequencyShift={carrierFrequencyShift}
                                   carrierAmplitude={carrierAmplitude}
                                   carrierEnv={carrierEnv}
                                   carrierReverb={carrierReverb}
                                   modulator={modulator}
                                   modulatorFrequencyShift={modulatorFrequencyShift}
                                   modulatorAmplitude={modulatorAmplitude}
                                   modulatorReverb={modulatorReverb}
                                   
                                                                                               
                      />
                    
                  </div>
                </PitchContext.Provider>
              </ScaleContext.Provider>
          </SliderContext.Provider>
        </ClockContext.Provider>
    </div>
  )
})

export default App
