const Tone = require('tone');
let counter = 0;
const { kick, cymbal, clap } = require('./instruments');

const synth = new Tone.PolySynth({
	polyphony: 9,
	volume: 0,
	detune: 0,
	voice: Tone.Synth
}).toMaster();

const sequence = new Tone.Sequence(
	function(time, note) {
		synth.triggerAttackRelease(note, '16n', time);
	},
	[ 'G4', 'A4', 'B4', 'D5' ],
	'16n'
);

function startMusic() {
	Tone.Transport.bpm.value = 100;
	console.log('clicked');
	sequence.start(0);
	Tone.Transport.start();
}

function stop() {
	counter = 0;
	synth.releaseAll(0);
	Tone.Transport.stop();
}

export { stop, startMusic };
