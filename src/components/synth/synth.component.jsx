import React, { useContext, useEffect, useRef } from "react";
import * as Tone from "tone";
import "./synth.styles.scss";
import { ClockContext } from "../../App";

const Synth = React.memo((props) => {
  const { time } = useContext(ClockContext);
  const { run } = useContext(ClockContext);

  const fmSynth = useRef(
    new Tone.FMSynth({
      harmonicity: 0,
      modulationIndex: 10,
      detune: 0,
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.2,
        release: 1,
      },
      modulation: {
        type: "sine",
      },
      modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5,
      },
    }).toDestination()
  ).current;

  useEffect(() => {
    if (run) {
      fmSynth.triggerAttackRelease(props.pitch, "16n");
    }
  }, [time]);

  return null; // Since we don't need to render anything in the component
});

export default Synth;
