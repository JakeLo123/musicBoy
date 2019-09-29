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

class AudioNode {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.status = false;
		this.pitch = assignPitch[row];
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

export { initializeGrid };
