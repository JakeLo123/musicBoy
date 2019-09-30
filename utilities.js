const { kick, clap, cymbal, synth } = require('./instruments');

const assignPitch = {
	0: 'D5',
	1: 'C5',
	2: 'B4',
	3: 'A4',
	4: 'G4',
	5: 'F#4',
	6: 'E4',
	7: 'D4',
	8: 'C4',
	9: 'B3',
	10: 'A3',
	11: 'G3'
};

const assignDrumSound = {
	0: '16n',
	1: '16n',
	2: 'D1'
};

const assignInstrument = {
	0: cymbal,
	1: clap,
	2: kick
};

class AudioNode {
	constructor(row, col, pitch, instrument) {
		this.instrument = instrument;
		this.row = row;
		this.col = col;
		this.status = false;
		this.pitch = pitch;
	}
}

function initializeDrums(width) {
	const output = [];
	for (let i = 0; i < 3; ++i) {
		output.push([]);
		for (let j = 0; j < width; ++j) {
			let node = new AudioNode(i, j, assignDrumSound[i], assignInstrument[i]);
			output[i].push(node);
		}
	}
	return output;
}

function initializeGrid(height, width) {
	const output = [];
	for (let i = 0; i < height; ++i) {
		output.push([]);
		for (let j = 0; j < width; ++j) {
			let node = new AudioNode(i, j, assignPitch[i], synth);
			output[i].push(node);
		}
	}
	return output;
}

function updateGrid(grid, rowToUpdate, node) {
	return grid.map((row, idx) => {
		if (idx === node.row) return rowToUpdate;
		else return row;
	});
}

export { initializeGrid, initializeDrums, updateGrid };
