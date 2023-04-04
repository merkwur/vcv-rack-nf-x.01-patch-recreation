import React, { useContext, useEffect, useState } from 'react';
import "./fine-tune-keys.styles.scss"
import { ClockContext } from '../clock/clock.component';
import { SequencerContext } from '../sequencer/sequencer.component';
import Synth from '../synth/synth.component';

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

const FineTune = React.memo((props) => {
  const [active, setActive] = useState(false)
  const [activeKeys, setActiveKeys] = useState([]);
  const [resKey, setResKey] = useState(props.scale)
  const {time, step} = useContext(ClockContext)
  const {sliderValues} = useContext(SequencerContext)
  const [pitch, setPitch] = useState("C4")
  const currentStep = time % step
  const scaleSharpNotes = props.scale.map((note) => convertToSharp(note));

  const handleKeyClick = (key) => {
    setActive(true)
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
      
      if (updatedKeys.length){
        setResKey(updatedKeys)
      } else {
        setResKey(props.scale)
        setActive(false)
      }


      return updatedKeys;
    });
  };
  

  useEffect(() => {
    if (!active){
      setResKey(props.scale)
    }  
  }, [props.scale])
  
  useEffect(() => {
    const selectedKey = sliderValues[currentStep] % resKey.length
    setPitch(`${resKey[selectedKey]}${Math.floor(sliderValues[currentStep] / 12.5)+1}`)
    console.log(pitch)
    
  }, [time])
  
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
          {renderKey('C')}
          {renderKey('C#', true)}
          {renderKey('D')}
          {renderKey('D#', true)}
          {renderKey('E')}
          {renderKey('F')}
          {renderKey('F#', true)}
          {renderKey('G')}
          {renderKey('G#', true)}
          {renderKey('A')}
          {renderKey('A#', true)}
          {renderKey('B')}
        </div>
      </div>
      <div className='synthes'>
        <Synth pitch={pitch}/>
      </div>
    </div>
  );
})

export default FineTune;
