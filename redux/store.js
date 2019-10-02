import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const UPDATE_GRID = 'UPDATE_GRID';

const updateGridAction = (grid) => {
	return {
		type: UPDATE_GRID,
		grid: grid
	};
};

const updateGridThunk = () => {
	return;
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_GRID:

		default:
			return state;
	}
};
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));

const store = createStore();
