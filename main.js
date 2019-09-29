import React from 'react';
import { stop, startMusic } from './synth';
import Grid from './Grid';
import initializeGrid from './utilities';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.tempo = 80;
		this.rows = 9;
		this.cols = 8;
		this.state = {
			playing: false,
			grid: initializeGrid(this.rows, this.cols)
		};
		this.playMusic = this.playMusic.bind(this);
	}

	playMusic() {
		const playing = this.state.playing;
		if (!playing) startMusic();
		else stop();
		this.setState({ playing: !playing });
	}

	render() {
		console.log('grid', this.state.grid[0][0]);
		return (
			<div>
				<h1>Music 👦 Boy</h1>
				<button className="button" type="button" onClick={this.playMusic}>
					{this.state.playing ? 'stop' : 'play'}
				</button>
				<Grid grid={this.state.grid} rows={this.rows} cols={this.cols} />
			</div>
		);
	}
}

export default Main;
