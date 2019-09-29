class AudioNode {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.status = false;
	}
}

function initializeGrid(width, height) {
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
