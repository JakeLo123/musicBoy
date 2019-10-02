import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>,
	document.getElementById('main')
);
