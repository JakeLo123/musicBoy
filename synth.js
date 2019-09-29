const Tone = require('tone');
let counter = 0;
const { kick, cymbal, clap, synth } = require('./instruments');

function createSequencesSynth(rows) {
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

function createSequenceKick(row) {
	let sequence = new Tone.Sequence(
		function(time, note) {
			kick.triggerAttackRelease(note, '32n', time);
		},
		row[0].reduce((accum, node) => {
			if (node.status) accum.push(node.pitch);
			else accum.push(null);
			return accum;
		}, []),
		'16n'
	).start(0);
	return sequence;
}

function startMusic(tempo) {
	Tone.Transport.bpm.value = tempo;
	Tone.Transport.start();
}

function stop() {
	Tone.Transport.stop();
	// synth.releaseAll(0);
}

function playNote(node) {
	// kick.triggerAttackRelease('D1', '16n');
	node.instrument.triggerAttackRelease(node.pitch, '16n');
}

export { stop, startMusic, createSequencesSynth, createSequenceKick, playNote };
