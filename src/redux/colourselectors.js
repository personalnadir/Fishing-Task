import {getAcceptColour} from './selectors';

const colours = [
	"Blue",
	"Orange"
];

export function getRejectColour(state) {
	const acceptIndex = colours.indexOf(getAcceptColour(state));
	return colours[(acceptIndex + 1) % colours.length];
};

export {getAcceptColour};