import React from 'react';

function Cell(props) {
	return props.nodes.map((node) => {
		const cellClassName = node.status ? 'cell on' : 'cell off';
		return <td key={node.col} className={cellClassName} />;
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
							<tr key={key}>
								<Cell nodes={row} />
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

export default Grid;
