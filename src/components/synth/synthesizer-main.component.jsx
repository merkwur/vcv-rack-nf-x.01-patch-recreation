import "./synthesizer-main.styles.scss"
import * as Tone from "tone";
import React, { useContext, useState } from 'react'
import CircularSlider from '@fseehawer/react-circular-slider';
import { ClockContext } from "../../App";

const Synthesizer = ({FMSynth}) => {
  const [isContinuous, setIsContinuous] = useState(true)
  const {run} = useContext(ClockContext)
  const [isRunning, setIsRunning] = useState(false)

  console.log(run)
  const width = 55
  
  if (run){
    if (!isRunning){
      FMSynth.triggerAttack()
      setIsRunning(true)
    }
  } else {
    FMSynth.stop()
    setIsRunning(false)
  }
  
  
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
