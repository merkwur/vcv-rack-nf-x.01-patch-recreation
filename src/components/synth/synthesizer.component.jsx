import * as Tone from "tone";

export const carrier = new Tone.FMOscillator({
                                              frequency: 200,
                                              type: "sine",
                                              modulationType: "sine",
                                              harmonicity: 1,
                                              modulationIndex: 2
                                            }).toDestination()
 
export const modulator = new Tone.FMOscillator({
                                              frequency: 200,
                                              type: "sine",
                                              modulationType: "sine",
                                              harmonicity: 1,
                                              modulationIndex: 2
                                            }).toDestination()

