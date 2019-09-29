const assignPitch = {
	0: 'G3',
	1: 'A3',
	2: 'B3',
	3: 'C4',
	4: 'D4',
	5: 'E4',
	6: 'F#5',
	7: 'G4',
	8: 'A4'
};

class AudioNode {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.status = false;
		this.pitch = assignPitch[this.row];
	}
}

function initializeGrid(height, width) {
	const output = [];
	for (let i = 0; i < height; ++i) {
		output.push([]);
		for (let j = 0; j < width; ++j) {
			let node = new AudioNode(i, j);
			output[i].push(node);
		}
	}
	return output;
}

export default initializeGrid;
