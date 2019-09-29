import React from 'react';
import { stop, startMusic, playNote, createSequencesSynth, createSequenceKick } from '../synth';
import Grid from './Grid';
import { initializeGrid, initializeDrums, updateGrid } from '../utilities';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.sequences = [];
		this.drumSequence = [];
		this.rows = 12;
		this.cols = 16;
		this.state = {
			tempo: 60,
			playing: false,
			grid: initializeGrid(this.rows, this.cols),
			drums: initializeDrums(this.cols)
		};
		this.playMusic = this.playMusic.bind(this);
		this.toggleCell = this.toggleCell.bind(this);
	}

	toggleCell(node) {
		node.status = !node.status;
		const grid = this.state.grid;
		const drums = this.state.drums;
		playNote(node);
		if (grid[node.row].includes(node)) {
			const updatedRow = grid[node.row];
			const updatedGrid = updateGrid(grid, updatedRow, node);
			this.setState({ grid: updatedGrid });
		} else {
			const updatedRow = drums[node.row];
			const updatedDrums = updateGrid(drums, updatedRow, node);
			this.setState({ drums: updatedDrums });
		}
	}

	playMusic() {
		const playing = this.state.playing;
		if (!playing) {
			this.drumSequence = createSequenceKick(this.state.drums);
			this.sequences = createSequencesSynth(this.state.grid);
			startMusic(this.state.tempo);
		} else {
			this.drumSequence.stop();
			this.sequences.forEach((sequence) => sequence.stop());
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
				<div className="grid-container">
					<Grid toggleCell={this.toggleCell} grid={this.state.grid} rows={this.rows} cols={this.cols} />
					<Grid toggleCell={this.toggleCell} grid={this.state.drums} />
				</div>
			</div>
		);
	}
}

export default Main;
