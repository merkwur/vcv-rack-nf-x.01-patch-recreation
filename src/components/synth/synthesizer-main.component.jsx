import "./synthesizer-main.styles.scss"
import * as Tone from "tone";
import React, { useContext, useEffect, useRef, useState } from 'react'
import CircularSlider from '@fseehawer/react-circular-slider';
import { ClockContext } from "../../App";
import { PitchContext} from "../../App";

const Synthesizer = ({carrier, carrierFrequencyShift ,modulator}) => {
  const [isContinuous, setIsContinuous] = useState(true)
  const {run, time} = useContext(ClockContext)
  const [pitch, setPitch] = useContext(PitchContext)
  const [isRunning, setIsRunning] = useState(false)
  const isOscPlaying = useRef(true)
  const [CMFrequencyShift, setCMFrequencyShift] = useState(0)
  const [MMFrequencyShift, setMMFrequencyShift] = useState(0)

  const width = 55

  
  const handleCarrierSelfModulation = (value) => {
    carrier.modulationIndex.value = value
  }
  
  const handleModulatorSelfModulation = (value) => {
    modulator.modulationIndex.value = value
  }

  const handleCarrierHarmonicity = (value) => {
    carrier.harmonicity.value = value
  }

  const handleModulatorHarmonicity = (value) => {
    modulator.harmonicity.value = value
  }

  const handleCarrierFrequencyShiftChange = (value) => {
    setCMFrequencyShift(value*240)
  }
            
  useEffect(() => {
    carrierFrequencyShift.frequency.value = CMFrequencyShift
  }, [CMFrequencyShift])

  const handleModulatorFrequencyShiftChange = (value) => {
    setMMFrequencyShift(value*240)
  }
            
  useEffect(() => {
    carrierFrequencyShift.frequency.value = MMFrequencyShift
  }, [MMFrequencyShift])
  

  useEffect(() => {
      carrier.frequency.value = pitch
      modulator.frequency.value = pitch
      // console.log("what is pitch?", pitch)
  }, [time])


  useEffect(() => {
    if (run & !isRunning){
      carrier.start()
      // carrier.connect(carrierFrequencyShift)
      
      modulator.start()
      setIsRunning(true)

    } else {
      carrier.stop()
      // carrier.disconnect(carrierFrequencyShift)
      modulator.stop()
      setIsRunning(false)
    }
  }, [run])


  return (
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
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
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
            width={width}
            className="cross-mod-pan"
            hideKnob={false}
            valueFontSize={'10pt'}
            labelFontSize={"7pt"}
            verticalOffset={"-2px"}
            label="C<P>M"
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
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
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
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
            label="CMI"
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
            data={[...Array(24).keys()].map((e) => `${e}`)} 
            dataIndex={0}
            onChange={(value) => {
              if (typeof value === 'string') {
                handleCarrierSelfModulation(value)
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
            valueFontSize={'7pt'}
            labelFontSize={"7pt"}
            verticalOffset={"8px"}
            label="CHC"
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
            data={Array.from({length: 140}, (_, i) => (.1 * i).toPrecision(3))} 
            dataIndex={0}
            onChange={(value) => {
              if (typeof value === 'string') {
                handleCarrierHarmonicity(value);
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
            valueFontSize={'7pt'}
            labelFontSize={"7pt"}
            verticalOffset={"8px"}
            label="MHC"
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
            data={Array.from({length: 140}, (_, i) => (.1 * i).toPrecision(3))} 
            dataIndex={0}
            onChange={(value) => {
              if (typeof value === 'string') {
                handleModulatorHarmonicity(value);
              }
            }}
        />
        </div>

        <div className="X-M-C">
          <CircularSlider
            key={1}
            width={width}
            className="cross-mod"
            hideKnob={false}
            valueFontSize={'10pt'}
            labelFontSize={"7pt"}
            verticalOffset={"-2px"}
            label="MMI"
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
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
            label="cfShift"
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
            data={[...Array(100).keys()].map((e) => `${(e-50)/100}`)} //...
            dataIndex={50}
            onChange={(value) => {
              if (typeof value === 'string') {
                handleCarrierFrequencyShiftChange(value);
              }
            }}
        />

        </div>

        <div className="X-M-P">
          <CircularSlider
            key={1}
            width={width}
            className="cross-mod-pan"
            hideKnob={false}
            valueFontSize={'10pt'}
            labelFontSize={"7pt"}
            verticalOffset={"-2px"}
            label="fOff"
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
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
            label="mfShift"
            labelColor="#aa4242"
            knobColor="#aa4242"
            progressColorFrom="#aa4242"
            progressColorTo="#ff4242"
            progressSize={6}
            knobSize={18}
            knobColor="#aa4242"
            trackColor="#000000"
            trackSize={6}
            data={[...Array(100).keys()].map((e) => `${(e-50)/100}`)} //...
            dataIndex={50}
            onChange={(value) => {
              if (typeof value === 'string') {
                handleModulatorFrequencyShiftChange(value);
              }
            }}
        />
        </div>

      </div>

      
    </div>
  )
}

export default Synthesizer 
