const Tone = require('tone');
let counter = 0;
const { kick, cymbal, clap, synth } = require('./instruments');

function createAllSequences(rows) {
	return rows.map((row) => {
		new Tone.Sequence(
			function(time, note) {
				synth.triggerAttackRelease(note, '32n', time);
			},
			row.reduce((accum, node) => {
				if (node.status) accum.push(node.pitch);
				else accum.push(null);
				return accum;
			}, []),
			'16n'
		).start(0);
	});
}

// const sequence = new Tone.Sequence(
// 	function(time, note) {
// 		synth.triggerAttackRelease(note, '16n', time);
// 	},
// 	[ 'G4', 'A4', 'B4', 'D5' ],
// 	'16n'
// );

// const sequence2 = new Tone.Sequence(
// 	function(time, note) {
// 		synth.triggerAttackRelease(note, '16n', time);
// 	},
// 	[ 'B4', 'C5', 'D5', 'G5' ],
// 	'16n'
// );

function startMusic() {
	Tone.Transport.bpm.value = 100;
	// sequence.start(0);
	// sequence2.start(0);
	Tone.Transport.start();
}

function stop() {
	counter = 0;
	synth.releaseAll(0);
	Tone.Transport.stop();
}

function playNote(node) {
	synth.triggerAttackRelease(node.pitch, '16n');
}

export { stop, startMusic, createAllSequences, playNote };
