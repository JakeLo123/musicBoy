import io from 'socket.io-client';
import store, { updateNodeAction } from './redux/store';

const socket = io(window.location.origin);
socket.on('connect', () => {
	console.log('I am now connected to the server!');
});
socket.on('grid-updated', (node) => {
	console.log('grid updated SOCKET CLIENT');
	store.dispatch(updateNodeAction(node));
});
export default socket;
