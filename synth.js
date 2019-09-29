const Tone = require('tone');
let counter = 0;
const { kick, cymbal, clap, synth } = require('./instruments');

function createAllSequences(rows) {
	let sequences = rows.map((row) => {
		let sequence = new Tone.Sequence(
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
		return sequence;
	});
	return sequences;
}

function startMusic(tempo) {
	Tone.Transport.bpm.value = tempo;
	Tone.Transport.start();
}

function stop() {
	synth.releaseAll(0);
	Tone.Transport.stop();
}

function playNote(node) {
	synth.triggerAttackRelease(node.pitch, '16n');
}

export { stop, startMusic, createAllSequences, playNote };
