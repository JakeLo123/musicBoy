import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initializeGrid } from '../utilities';
import socket from '../socketClient';

const UPDATE_NODE = 'UPDATE_NODE';
const EMIT_TO_SOCKET = 'EMIT_TO_SOCKET';

export const updateNodeAction = (node) => {
	return {
		type: UPDATE_NODE,
		node: node
	};
};

export const emitToSocketThunk = (node) => {
	return () => {
		console.log('got to EMIT THUNK');
		socket.emit('update-grid', node);
	};
};

const initialState = {
	grid: initializeGrid(12, 16)
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_NODE: {
			const rowToUpdate = state.grid[action.node.row];
			const updatedRow = [ ...rowToUpdate ];
			updatedRow[action.node.col].status = action.node.status;
			return {
				...state,
				grid: state.grid.map((row, idx) => {
					if (idx === action.node.row) return updatedRow;
					else return row;
				})
			};
		}
		default:
			return state;
	}
};
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));

export default createStore(reducer, middleware);
