import * as Tone from "tone";

export const FMSynth = new Tone.FMSynth({
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
 


