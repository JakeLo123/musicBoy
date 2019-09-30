import React from 'react';
import { stop, startMusic, playNote, createSequencesSynth, createSequenceKick, createSequenceClap } from '../synth';
import Grid from './Grid';
import { initializeGrid, initializeDrums, updateGrid } from '../utilities';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.clapSequences = [];
		this.synthSequences = [];
		this.kickSequence = [];
		this.rows = 12;
		// this.cols = 32;
		this.state = {
			cols: 16,
			tempo: 60,
			playing: false,
			grid: initializeGrid(this.rows, 16),
			drums: initializeDrums(16)
		};
		this.toggleCell = this.toggleCell.bind(this);
		this.setTempo = this.setTempo.bind(this);
		this.setLength = this.setLength.bind(this);
		this.resetGrid = this.resetGrid.bind(this);
		this.playMusic = this.playMusic.bind(this);
	}

	setTempo(event) {
		this.setState({
			tempo: event.target.value
		});
	}

	setLength(event) {
		this.setState({
			cols: event.target.value,
			grid: initializeGrid(this.rows, event.target.value),
			drums: initializeDrums(event.target.value)
		});
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

	resetGrid() {
		let cols = this.state.cols;
		this.setState({
			playing: false,
			grid: initializeGrid(this.rows, cols),
			drums: initializeDrums(cols)
		});
	}

	playMusic() {
		const playing = this.state.playing;
		if (!playing) {
			const claps = [ this.state.drums[0], this.state.drums[1] ];
			this.clapSequences = createSequenceClap(claps);
			this.kickSequence = createSequenceKick(this.state.drums[2]);
			this.synthSequences = createSequencesSynth(this.state.grid);
			startMusic(this.state.tempo);
		} else {
			this.clapSequences.forEach((sequence) => sequence.stop());
			this.kickSequence.stop();
			this.synthSequences.forEach((sequence) => sequence.stop());
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
				<div className="user-controls">
					<div>
						<label htmlFor="tempo">set tempo</label>
						<input value={this.state.tempo} type="number" onChange={this.setTempo} name="tempo" />
					</div>
					<div>
						<label htmlFor="length">set meaures</label>
						<select value={this.cols} type="number" onChange={this.setLength} name="length">
							<option value="16">4</option>
							<option value="20">5</option>
							<option value="24">6</option>
							<option value="28">7</option>
							<option value="32">8</option>
						</select>
					</div>
					<button className="button" id="reset-btn" type="button" onClick={this.resetGrid}>
						reset
					</button>
				</div>
			</div>
		);
	}
}

export default Main;
