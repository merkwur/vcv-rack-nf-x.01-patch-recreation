import "./fine-tune-keys.styles.scss"
import React, { useContext, useEffect, useCallback, useState } from 'react';
import { ClockContext, PitchContext, ScaleContext, SliderContext } from '../../App';

const convertToSharp = (note) => {
  const flatToSharp = {
    'Cb': 'B',
    'C': 'C',
    'C#': 'C#',
    'Db': 'C#',
    'D': 'D',
    'D#': 'D#',
    'Eb': 'D#',
    'E': 'E',
    'Fb': 'E',
    'F': 'F',
    'F#': 'F#',
    'Gb': 'F#',
    'G': 'G',
    'G#': 'G#',
    'Ab': 'G#',
    'A': 'A',
    'A#': 'A#',
    'Bb': 'A#',
    'B': 'B',
    'B#': 'C'
  };
  
  return flatToSharp[note];
}

const FineTune = React.memo(() => {
  const [active, setActive] = useState(false)
  const [activeKeys, setActiveKeys] = useState([]);
  const {time, step, run} = useContext(ClockContext)
  const [scale, setScale] = useContext(ScaleContext)
  const [sliderValues, setSliderValues] = useContext(SliderContext)
  const [resultKeys, setResultKeys] = useState([])
  const [pitch, setPitch] = useContext(PitchContext)
  const currentStep = time % step
  const scaleSharpNotes = scale.map((note) => convertToSharp(note));

  const handleKeyClick = (key) => {
    
    setActiveKeys((prevActiveKeys) => {
      let updatedKeys;
      if (prevActiveKeys.includes(key)) {
        updatedKeys = prevActiveKeys.filter((activeKey) => activeKey !== key);
      } else {
        updatedKeys = [...prevActiveKeys, key];
      }

      // remove in-scale class from clicked key if it's in the specified scale
      const isInScale = scaleSharpNotes.includes(key);
      if (isInScale) {
        const keyElement = document.querySelector(`.key.${key.replace('#', '\\#')}`);

        keyElement.classList.remove('in-scale');
  
        // if key is already in activeKeys, remove it without adding the red highlight
        if (prevActiveKeys.includes(key)) {
          return updatedKeys;
        }
      }
          
      return updatedKeys;
    });
  };

  const updateResultKeys = useCallback((keys) => {
    setResultKeys(keys)},
    [setResultKeys])
  
  useEffect(() => {
    if (activeKeys.length) {
      updateResultKeys(activeKeys);
    } else {
      updateResultKeys(scale);
    } 
  }, [activeKeys, updateResultKeys, scale]);
  
  useEffect(() => {
    const selectedKey = sliderValues[currentStep] % resultKeys.length
    setPitch(`${resultKeys[selectedKey]}${Math.floor(sliderValues[currentStep] / 12.5)+1}`)

  }, [time, run, sliderValues]);
  
  const renderKey = (key, isBlack) => {
    const isActive = activeKeys.includes(key);
    const isInScale = scaleSharpNotes.includes(key);
    let className = `key ${isBlack ? 'black' : 'white'} ${key}`;
    if (isActive) {
      className += ' active';
    } else if (!isActive && isInScale) {
      className += ' in-scale';
    }
    return (
      <div
        className={className}
        onClick={() => handleKeyClick(key)}
      >
        <span>{key}</span>
      </div>
    );
  };

  return (
    <div>
      <div className='piano'>
        <div className='keys'>
          {renderKey('B')}
          {renderKey('A#', true)}
          {renderKey('A')}
          {renderKey('G#', true)}
          {renderKey('G')}
          {renderKey('F#', true)}
          {renderKey('F')}
          {renderKey('E')}
          {renderKey('D#', true)}
          {renderKey('D')}
          {renderKey('C#', true)}
          {renderKey('C')}
        </div>
      </div>
      {/* <div className='synthes'>
        <Synth pitch={pitch}/>
      </div> */}
    </div>
  );
})

export default FineTune;
