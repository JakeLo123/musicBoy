import React from 'react';
import { stop, startMusic, playNote, createAllSequences } from './synth';
import Grid from './Grid';
import { initializeGrid } from './utilities';
let sequences;
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.rows = 12;
		this.cols = 8;
		this.state = {
			tempo: 60,
			playing: false,
			grid: initializeGrid(this.rows, this.cols)
		};
		this.playMusic = this.playMusic.bind(this);
		this.toggleCell = this.toggleCell.bind(this);
	}

	toggleCell(node) {
		node.status = !node.status;
		const grid = this.state.grid;
		const updatedRow = this.state.grid[node.row];
		const updatedGrid = grid.map((row, idx) => {
			if (idx === node.row) return updatedRow;
			else return row;
		});
		playNote(node);
		this.setState({ grid: updatedGrid });
	}

	playMusic() {
		const playing = this.state.playing;
		if (!playing) {
			sequences = createAllSequences(this.state.grid);
			startMusic(this.state.tempo);
		} else {
			sequences.forEach((sequence) => sequence.stop());
			stop();
		}
		this.setState({ playing: !playing });
	}

	render() {
		return (
			<div>
				<h1>Music 👦 Boy</h1>
				<button className="button" type="button" onClick={this.playMusic}>
					{this.state.playing ? 'stop' : 'play'}
				</button>
				<Grid toggleCell={this.toggleCell} grid={this.state.grid} rows={this.rows} cols={this.cols} />
			</div>
		);
	}
}

export default Main;
