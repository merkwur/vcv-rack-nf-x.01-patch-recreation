import "./synthesizer-main.styles.scss"
import * as Tone from "tone";
import React, { useContext, useEffect, useRef, useState } from 'react'
import CircularSlider from '@fseehawer/react-circular-slider';
import { ClockContext } from "../../App";
import { PitchContext} from "../../App";

const Synthesizer = ({carrier, modulator}) => {
  const [isContinuous, setIsContinuous] = useState(true)
  const {run, time} = useContext(ClockContext)
  const [pitch, setPitch] = useContext(PitchContext)
  const [isRunning, setIsRunning] = useState(false)
  const isOscPlaying = useRef(true)
  const width = 55
  const chromaticScale = [
    'Cb','C','C#','Db','D', 'D#', 'Eb','E', 'Fb', 'F', 'F#',
    'Gb','G','G#','Ab','A','A#','Bb','B','B#'
    ] 
  
  
  useEffect(() => {
  
      carrier.frequency.value = pitch
      // console.log("what is pitch?", pitch)
  }, [time])



  useEffect(() => {
    if (run & !isRunning){
      carrier.start()
      setIsRunning(true)
    } else {
      carrier.stop()
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

      
    </div>
  )
}

export default Synthesizer 
