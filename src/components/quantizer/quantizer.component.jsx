import { Scale, Key } from "tonal";
import CircularSlider from '@fseehawer/react-circular-slider';
import React, { useContext, useState } from "react";
import "./quantizer.styles.scss"
import { ScaleContext } from "../../App";


const Quantizer = React.memo((props) => {
  const [scale, setScale] = useContext(ScaleContext)
  const width = 75  

  const handleScaleChange = (value) =>{
    setScale(Key.majorKey(value).scale)
  }

  return (
    <div className="qunatizer-container">
      {/* <div className="quant-header">
        Quantizer
      </div> */}
      <div className="quant-placer">
        <div className="radio">
          <div className="rb-columns scale ocatva">
            <div className="quant-scale">
              <CircularSlider
                    key={1}
                    width={width}
                    className="scale-picker"
                    hideKnob={false}
                    valueFontSize={'18pt'}
                    labelFontSize={"8.5pt"}
                    verticalOffset={"-2px"}
                    label="scale"
                    labelColor="#83a598"
                    knobColor="#458588"
                    progressColorFrom="#aa424200"
                    progressColorTo="#ff424200"
                    progressSize={6}
                    knobSize={28}
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
                    width={width}
                    className="octave-picker"
                    hideKnob={false}
                    valueFontSize={'7pt'}
                    labelFontSize={"7pt"}
                    verticalOffset={"-9px"}
                    label="dysfunctional"
                    labelColor="#000"
                    knobColor="#000"
                    progressColorFrom="#aa424200"
                    progressColorTo="#ff424200"
                    progressSize={6}
                    knobSize={18}
                    trackColor="#000000"
                    trackSize={6}
                    data={["0", "1", "2", "3", "4", "5", "6", "7", "8"]} //...
                    dataIndex={0}
                    // onChange={ value => { console.log(value); } }
                />
           </div>
          </div>
          <div className="rb-columns-mode chord">
            <div className="quant-mode">
              <CircularSlider
                    key={3}
                    width={width}
                    className="mode-picker"
                    hideKnob={false}
                    valueFontSize={'7pt'}
                    labelFontSize={"7pt"}
                    verticalOffset={"-9px"}
                    label="dysfunctional"
                    labelColor="#000"
                    knobColor="#000"
                    progressColorFrom="#aa424200"
                    progressColorTo="#ff424200"
                    progressSize={6}
                    knobSize={18}           
                    trackColor="#000000"
                    trackSize={6}
                    data={Array(10).fill(0)} //...
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
                    key={4}
                    width={width}
                    className="chord-picker"
                    hideKnob={false}
                    valueFontSize={'7pt'}
                    labelFontSize={"7pt"}
                    verticalOffset={"-9px"}
                    label="dysfunctional"
                    labelColor="#000"
                    knobColor="#000"
                    progressColorFrom="#aa424200"
                    progressColorTo="#ff424200"
                    progressSize={6}
                    knobSize={18}
                    trackColor="#000000"
                    trackSize={6}
                    data={Array(10).fill(0)} //...
                    dataIndex={0}
                    // onChange={ value => { console.log(value); } }
                />
           </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
})


export default Quantizer