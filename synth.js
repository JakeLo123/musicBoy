const Tone = require('tone');
let counter = 0;
const { kick, cymbal, clap, synth } = require('./instruments');

const sequence = new Tone.Sequence(
	function(time, note) {
		synth.triggerAttackRelease(note, '16n', time);
	},
	[ 'G4', 'A4', 'B4', 'D5' ],
	'16n'
);

function startMusic() {
	Tone.Transport.bpm.value = 100;
	sequence.start(0);
	Tone.Transport.start();
}

function stop() {
	counter = 0;
	synth.releaseAll(0);
	Tone.Transport.stop();
}

export { stop, startMusic };
