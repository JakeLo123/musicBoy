const Tone = require('tone');
const synth = new Tone.Synth().toMaster();

function startBeeping() {
	const loopBeat = new Tone.Loop(song, '4n');

	Tone.Transport.bpm.value = 100;
	Tone.Transport.start();
	loopBeat.start(1);
}

function song() {
	synth.triggerAttackRelease('G4', '16n');
}

export { song, startBeeping };
