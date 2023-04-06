import * as Tone from "tone";

export const carrierFrequencyShift = new Tone.FrequencyShifter(0).toDestination()
export const modulatorFrequencyShift = new Tone.FrequencyShifter(0).toDestination()

export const carrier = new Tone.FMOscillator({
                                              frequency: 200,
                                              type: "sine",
                                              modulationType: "sine",
                                              harmonicity: 0,
                                              modulationIndex: 0
                                            }).connect(carrierFrequencyShift)
 
export const modulator = new Tone.FMOscillator({
                                              frequency: 120,
                                              type: "sine",
                                              modulationType: "sine",
                                              harmonicity: 0,
                                              modulationIndex: 0
                                            }).connect(modulatorFrequencyShift)


