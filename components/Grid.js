import React from 'react';

function Cell(props) {
	return props.nodes.map((node) => {
		const cellClassName = node.status ? 'cell on' : 'cell off';
		return <td key={node.col} onClick={() => props.toggleCell(node)} className={cellClassName} />;
	});
}

class Grid extends React.Component {
	render() {
		let key = 0;
		return (
			<table>
				<tbody className="grid">
					{this.props.grid.map((row) => {
						key += 1;
						return (
							<tr className="grid-row" key={key}>
								<Cell toggleCell={this.props.toggleCell} nodes={row} />
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

export default Grid;
