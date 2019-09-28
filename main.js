import React from 'react';
import { stop, startBeeping } from './synth';

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
		if (!play) startBeeping();
		else stop();
		this.setState({ playing: !play });
	}

	render() {
		return (
			<div>
				<h1>HELLO WORLD!!!</h1>
				<button type="button" onClick={this.playMusic}>
					{this.state.playing ? 'stop' : 'play'}
				</button>
			</div>
		);
	}
}

export default Main;
