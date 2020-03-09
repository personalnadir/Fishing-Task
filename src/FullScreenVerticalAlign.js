import React from 'react';

function FullScreenVerticalAlign(props) {
	return (
		<div className="FullScreen">
			<span className="ImageVerticalAlignHelper"></span>
			<div className="VerticalAlignContainer">
				{props.children}
			</div>
		</div>
	);
}

export default FullScreenVerticalAlign;