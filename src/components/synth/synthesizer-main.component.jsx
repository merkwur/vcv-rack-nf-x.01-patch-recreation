import "./synthesizer-main.styles.scss"
import * as Tone from "tone";
import React, { useContext, useEffect, useRef, useState } from 'react'
import CircularSlider from '@fseehawer/react-circular-slider';
import { ClockContext } from "../../App";
import { PitchContext} from "../../App";

const Synthesizer = ({carrier, 
                      carrierFrequencyShift, 
                      carrierAmplitude, 
                      carrierEnv,
                      carrierReverb, 
                      modulator, 
                      modulatorFrequencyShift, 
                      modulatorReverb}) => {

  const [isContinuous, setIsContinuous] = useState(true)
  const {run, time, tick} = useContext(ClockContext)
  const [pitch, setPitch] = useContext(PitchContext)
  const [isRunning, setIsRunning] = useState(false)
  const isOscPlaying = useRef(true)
  const [CMFrequencyShift, setCMFrequencyShift] = useState(0)
  const [MMFrequencyShift, setMMFrequencyShift] = useState(0)

  // Slider styles
  const width = 60
  const knobSizeS = 18
  const knobSizeM = 24
  const trackSizeS = 3
  const trackSizeM = 4


  // Mixer



  const handleCarrierSelfModulation = (value) => {
    carrier.modulationIndex.value = value
  }

  const handleCarrierHarmonicity = (value) => {
    carrier.harmonicity.value = value
  }

  const handleCarrierFrequencyShiftChange = (value) => {
    setCMFrequencyShift(value*200)
  }

  useEffect(() => {
    carrierFrequencyShift.frequency.value = CMFrequencyShift
  }, [CMFrequencyShift])

  const handleModulatorSelfModulation = (value) => {
    carrier.modulationIndex.value = value
  }

  const handleModulatorHarmonicity = (value) => {
    carrier.harmonicity.value = value
  }

  const handleModulatorFrequencyShiftChange = (value) => {
    setMMFrequencyShift(value*200)
  }

  const handleCarrierReverbChange= (value) => {
    carrierReverb.decay = value
  }

  const handleModulatorReverbChange = (value) => {
    
    modulatorReverb.decay = value
  }

  useEffect(() => {
    carrierFrequencyShift.frequency.value = CMFrequencyShift
  }, [CMFrequencyShift])

  useEffect(() => {
    modulatorFrequencyShift.frequency.value = MMFrequencyShift
  }, [MMFrequencyShift])

  useEffect(() => {
      carrier.frequency.value = pitch
      modulator.frequency.value = pitch
      modulator.frequency.value /= 2 
  }, [time])


  useEffect(() => {
    if (run & !isRunning){
      
      console.log(carrier.get())
      carrier.start()
      modulator.start()
      setIsRunning(true)

    } else {
      carrier.stop()
      modulator.stop()
      setIsRunning(false)
    }
  }, [run])


  useEffect(() =>{
    if (!isContinuous){
      carrierEnv.attack = .02
      carrierEnv.attackCurve = "exponential"
      carrierEnv.decay = .6
      carrierEnv.decayCurve = "exponential"
      carrierEnv.sustain = .1
      carrierEnv.release = .3
      carrierEnv.releaseCurve = "exponential"
      console.log(carrierEnv)
      console.log(carrierEnv.attack)
      console.log(carrierEnv.decay)
      console.log(carrierEnv.sustain)
      console.log(carrierEnv.release)

    } else {
      carrierEnv.attack = .0
      carrierEnv.decay = .0
      carrier.sustain = 1
      carrierEnv.release = .0
    }
  }, [isContinuous])

  useEffect(() => {
    if (isContinuous){
      carrierEnv.triggerAttackRelease(16)
    } else {
      carrierEnv.triggerAttackRelease(1/(tick/60))
    }
  }, [time])


  return (
    <div className="synth-container">
      <div className='synthesizer-panel'>
        <div className="head-panel">
          <button className='discrete-continuous'
                  onClick={()=> setIsContinuous(!isContinuous)}>
                    {isContinuous ? "____" : "_-_-"}
          </button>
        </div>

        <div className="cross-mod">
          <div className="X-M-C">
            <CircularSlider
              key={1}
              width={width}
              className="cross-mod"
              hideKnob={false}
              valueFontSize={'10pt'}
              labelFontSize={"7pt"}
              verticalOffset={"-2px"}
              label="X<=>C"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeM}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeM}
              data={Array(10).fill(0)} //...
              dataIndex={0}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleScaleChange(value);
                }
              }}
          />

          </div>

          <div className="X-M-P">
            <CircularSlider
              key={1}
              width={width-5}
              className="cross-mod-pan"
              hideKnob={false}
              valueFontSize={'10pt'}
              labelFontSize={"7pt"}
              verticalOffset={"-2px"}
              label="C<P>M"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeS}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeS}
              data={Array(10).fill(0)} //...
              dataIndex={0}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleScaleChange(value);
                }
              }}
          />
          </div>

          <div className="X-M-M">
            <CircularSlider
              key={1}
              width={width}
              className="cross-mod"
              hideKnob={false}
              valueFontSize={'10pt'}
              labelFontSize={"7pt"}
              verticalOffset={"-2px"}
              label="X<=>M"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeM}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeM}
              data={Array(10).fill(0)} //...
              dataIndex={0}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleScaleChange(value);
                }
              }}
          />
          </div>

        </div>

        <div className="self-mod">
          <div className="S-M-C">
            <CircularSlider
              key={1}
              width={width}
              className="cross-mod"
              hideKnob={false}
              valueFontSize={'10pt'}
              labelFontSize={"7pt"}
              verticalOffset={"-2px"}
              label="CMI"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeM}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeM}
              data={[...Array(24).keys()].map((e) => `${e}`)}
              dataIndex={0}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleCarrierSelfModulation(value)
                }
              }}
          />
          </div>

          <div className="self-mod-harms-carrier">
            <CircularSlider
              key={1}
              width={width-5}
              className="cross-mod-pan"
              hideKnob={false}
              valueFontSize={'7pt'}
              labelFontSize={"7pt"}
              verticalOffset={"8px"}
              label="CHC"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeS}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeS}
              data={[...Array(1400).keys()].map((e) => `${(e/100)}`)}
              dataIndex={0}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleCarrierHarmonicity(value);
                }
              }}
          />
          </div>

          <div className="self-mod-harms-modulator">
            <CircularSlider
              key={1}
              width={width-5}
              className="cross-mod-pan"
              hideKnob={false}
              valueFontSize={'7pt'}
              labelFontSize={"7pt"}
              verticalOffset={"8px"}
              label="MHC"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeS}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeS}
              data={[...Array(1400).keys()].map((e) => `${(e/100)}`)}
              dataIndex={0}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleModulatorHarmonicity(value)
                }
              }}
          />
          </div>

          <div className="S-M-M">
            <CircularSlider
              key={1}
              width={width}
              className="cross-mod"
              hideKnob={false}
              valueFontSize={'10pt'}
              labelFontSize={"7pt"}
              verticalOffset={"-2px"}
              label="MMI"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeM}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeM}
              data={[...Array(24).keys()].map((e) => `${e}`)}
              dataIndex={0}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleModulatorSelfModulation(value)
                }
              }}
          />
          </div>
        </div>

        <div className="freq-shift">
          <div className="F-S-C">
            <CircularSlider
              key={1}
              width={width}
              className="cross-mod"
              hideKnob={false}
              valueFontSize={'10pt'}
              labelFontSize={"7pt"}
              verticalOffset={"-2px"}
              label="cfShift"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeM}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeM}
              data={[...Array(100).keys()].map((e) => `${(e-50)/100}`)} //...
              dataIndex={50}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleCarrierFrequencyShiftChange(value);
                }
              }}
          />

          </div>
          <div className="F-S-P">
            <CircularSlider
              key={1}
              width={width-5}
              className="cross-mod-pan"
              hideKnob={false}
              valueFontSize={'10pt'}
              labelFontSize={"7pt"}
              verticalOffset={"-2px"}
              label="fOff"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff42ff00"
              progressSize={6}
              knobSize={knobSizeS}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeS}
              data={Array(10).fill(0)} //...
              dataIndex={0}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleScaleChange(value);
                }
              }}
          />
          </div>

          <div className="F-S-M">
            <CircularSlider
              key={1}
              width={width}
              className="cross-mod"
              hideKnob={false}
              valueFontSize={'10pt'}
              labelFontSize={"7pt"}
              verticalOffset={"-2px"}
              label="mfShift"
              labelColor="#fa8423"
              progressColorFrom="#aa424200"
              progressColorTo="#ff424200"
              progressSize={6}
              knobSize={knobSizeM}
              knobColor="#d65d0e"
              trackColor="#000000"
              trackSize={trackSizeM}
              data={[...Array(100).keys()].map((e) => `${(e-50)/100}`)} //...
              dataIndex={50}
              onChange={(value) => {
                if (typeof value === 'string') {
                  handleModulatorFrequencyShiftChange(value)
                }
              }}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Synthesizer
