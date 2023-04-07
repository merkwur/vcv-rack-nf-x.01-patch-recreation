import * as Tone from "tone";


const merge = new Tone.Merge().toDestination();

export const modulatorAmplitude = new Tone.Gain(1).connect(merge, 0, 0);
export const carrierAmplitude = new Tone.Gain(1).connect(merge, 0, 1);

export const carrierFrequencyShift = new Tone.FrequencyShifter(0).connect(carrierAmplitude)
export const modulatorFrequencyShift = new Tone.FrequencyShifter(0).connect(modulatorAmplitude)

export const carrierEnv = new Tone.AmplitudeEnvelope({
                                              attack: 0.01,
                                              decay: 2,
                                              sustain: 0,
                                              release: 1
                                              })

export const modulatorEnv = new Tone.AmplitudeEnvelope({
                                                attack: 0.01,
                                                decay: 2,
                                                sustain: 0,
                                                release: 1
                                                })

export const carrier = new Tone.FMOscillator({
                                              frequency: 200,
                                              phase: 42,
                                              type: "sine",
                                              modulationType: "sine",
                                              harmonicity: 0,
                                              modulationIndex: 0
                                            }).connect(carrierFrequencyShift)
 

export const modulator = new Tone.FMOscillator({
                                              frequency: 167,
                                              type: "sine",
                                              modulationType: "square",
                                              harmonicity: 0,
                                              modulationIndex: 0
                                            }).connect(modulatorFrequencyShift)


              