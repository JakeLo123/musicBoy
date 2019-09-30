const Tone = require('tone');
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

function createSequenceClap(rows) {
	let sequences = rows.map((row) => {
		let sequence = new Tone.Sequence(
			function(time) {
				row[0].instrument.triggerAttackRelease(time);
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
		row.reduce((accum, node) => {
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
}

function playNote(node) {
	if (node.pitch !== '16n') node.instrument.triggerAttackRelease(node.pitch, '16n');
	else node.instrument.triggerAttackRelease(node.pitch);
}

export { stop, startMusic, createSequencesSynth, createSequenceKick, createSequenceClap, playNote };
