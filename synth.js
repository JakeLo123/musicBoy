const Tone = require('tone');
let counter = 0;
const { kick, cymbal, clap } = require('./instruments');

const synth = new Tone.PolySynth({
	polyphony: 4,
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

function startBeeping() {
	Tone.Transport.bpm.value = 100;
	sequence.start(0);
	Tone.Transport.start();
}

function stop() {
	counter = 0;
	synth.releaseAll(0);
	Tone.Transport.stop();
}

function song() {
	if (counter === 0) {
		kick.triggerAttackRelease('D1', '32n');
	}
	if (counter === 2) cymbal.triggerAttackRelease('32n');
	if (counter === 4) {
		clap.triggerAttackRelease('32n');
		kick.triggerAttackRelease('D1', '32n');
	}
	if (counter === 6) cymbal.triggerAttackRelease('32n');
	if (counter === 8) {
		kick.triggerAttackRelease('D1', '32n');
	}
	if (counter === 10) cymbal.triggerAttackRelease('32n');
	if (counter === 12) {
		clap.triggerAttackRelease('32n');
		kick.triggerAttackRelease('D1', '32n');
	}
	if (counter === 14) cymbal.triggerAttackRelease('32n');
	counter = (counter + 1) % 16;
}

export { stop, startBeeping };
