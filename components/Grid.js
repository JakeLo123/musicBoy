import React from 'react';

function Row(props) {
	let cellShade = true;
	let count = 0;
	return props.nodes.map((node) => {
		if (count % 4 === 0) {
			cellShade = !cellShade;
		}
		count += 1;
		let cellClassName = node.status ? 'cell on' : cellShade ? 'cell even' : 'cell odd';
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
								<Row toggleCell={this.props.toggleCell} nodes={row} />
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

export default Grid;
