const Tone = require('tone');

const cymbal = new Tone.MetalSynth({
	frequency: 300,
	envelope: {
		attack: 0.001,
		decay: 0.1,
		release: 0.01
	},
	harmonicity: 5.1,
	modulationIndex: 32,
	resonance: 4000,
	octaves: 1.5
}).toMaster();

const clap = new Tone.NoiseSynth({
	noise: {
		type: 'white'
	},
	envelope: {
		attack: 0.005,
		decay: 0.1,
		sustain: 0
	}
}).toMaster();

const kick = new Tone.MembraneSynth({
	pitchDecay: 0.05,
	octaves: 10,
	oscillator: {
		type: 'triangle'
	},
	envelope: {
		attack: 0.001,
		decay: 0.4,
		sustain: 0.01,
		release: 1.4,
		attackCurve: 'exponential'
	}
}).toMaster();

module.exports = { kick, cymbal, clap };
