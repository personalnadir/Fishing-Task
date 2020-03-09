
export function startTimeout(action, time){
	return (dispatch) => {
		setTimeout(() => {
			dispatch(action());
		}, time);
	};
}

