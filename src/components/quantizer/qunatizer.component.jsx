import { Scale, Key } from "tonal";
import CircularSlider from '@fseehawer/react-circular-slider';
import React, { useContext, useState } from "react";
import "./quantizer.styles.scss"
import { ScaleContext } from "../../App";


const Quantizer = React.memo((props) => {
  const [scale, setScale] = useContext(ScaleContext)
  

  const handleScaleChange = (value) =>{
    setScale(Key.majorKey(value).scale)
    
  }


  return (
    <div className="qunatizer-container">
      <div className="quant-header">
        Quantizer
      </div>
      <div className="quant-placer">
        <div className="radio">
          <div className="rb-columns scale ocatva">
            <div className="quant-scale">
              <CircularSlider
                    key={1}
                    width={80}
                    className="scale-picker"
                    hideKnob={false}
                    valueFontSize={'1.7rem'}
                    labelFontSize={"11.5pt"}
                    verticalOffset={"-2px"}
                    label="scale"
                    labelColor="#aa4242"
                    knobColor="#aa4242"
                    progressColorFrom="#aa4242"
                    progressColorTo="#ff4242"
                    progressSize={6}
                    knobSize={18}
                    knobColor="#aa4242"
                    trackColor="#000000"
                    trackSize={6}
                    data={Scale.get("C chromatic").notes} //...
                    dataIndex={0}
                    onChange={(value) => {
                      if (typeof value === 'string') {
                        handleScaleChange(value);
                      }
                    }}
                />
            </div>
            <div className="quant-octave">
              <CircularSlider
                    key={2}
                    width={80}
                    className="octave-picker"
                    hideKnob={false}
                    valueFontSize={'1.7rem'}
                    labelFontSize={"11.5pt"}
                    verticalOffset={"-2px"}
                    label="octave"
                    labelColor="#aa4242"
                    knobColor="#aa4242"
                    progressColorFrom="#aa4242"
                    progressColorTo="#ff4242"
                    progressSize={6}
                    knobSize={18}
                    knobColor="#aa4242"
                    trackColor="#000000"
                    trackSize={6}
                    data={["0", "1", "2", "3", "4", "5", "6", "7", "8"]} //...
                    dataIndex={0}
                    // onChange={ value => { console.log(value); } }
                />
           </div>
          </div>
          {/* <div className="rb-columns-mode chord">
            <div className="quant-mode">
              <CircularSlider
                    key={3}
                    width={80}
                    className="mode-picker"
                    hideKnob={false}
                    valueFontSize={'7pt'}
                    labelFontSize={"7pt"}
                    verticalOffset={"-9px"}
                    label="dysfunctional"
                    labelColor="#000"
                    knobColor="#aa4242"
                    progressColorFrom="#aa4242"
                    progressColorTo="#ff4242"
                    progressSize={6}
                    knobSize={18}
                    knobColor="#aa4242"
                    trackColor="#000000"
                    trackSize={6}
                    data={Mode.names()} //...
                    dataIndex={0}
                    // onChange={(value) => {
                    //   if (typeof value === 'string') {
                    //     handleScaleChange(value);
                    //   }
                    // }}
                />
            </div>
            <div className="quant-chord">
              <CircularSlider
                    key={key}
                    width={80}
                    className="chord-picker"
                    hideKnob={false}
                    valueFontSize={'7pt'}
                    labelFontSize={"7pt"}
                    verticalOffset={"-9px"}
                    label="dysfunctional"
                    labelColor="#000"
                    knobColor="#aa4242"
                    progressColorFrom="#aa4242"
                    progressColorTo="#ff4242"
                    progressSize={6}
                    knobSize={18}
                    knobColor="#aa4242"
                    trackColor="#000000"
                    trackSize={6}
                    data={chordData} //...
                    dataIndex={0}
                    // onChange={ value => { console.log(value); } }
                />
           </div>
          </div> */}
        </div>
      </div>
      <div>
      </div>
    </div>
  )
})


export default Quantizer