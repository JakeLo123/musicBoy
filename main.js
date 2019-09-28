import React from 'react';
import { song, startBeeping } from './synth';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: false
		};
		this.playMusic = this.playMusic.bind(this);
	}

	playMusic() {
		const play = this.state.playing;
		startBeeping();
		this.setState({ playing: !play });
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<h1>HELLO WORLD!!!</h1>
				<button type="button" onClick={this.playMusic}>
					play
				</button>
			</div>
		);
	}
}

export default Main;
