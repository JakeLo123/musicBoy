const Tone = require('tone');

const synth = new Tone.PolySynth({
	polyphony: 9,
	volume: 0,
	detune: 0,
	voice: Tone.Synth
}).toMaster();

module.exports = { synth };
