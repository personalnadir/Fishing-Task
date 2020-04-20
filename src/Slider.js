import React from 'react';

export default function Slider(props){
	return (
		<div className="ConfidenceSliderContainer">
			<input
				className="ConfidenceSlider"
				type="range"
				min={0}
				max={100}
				step= "any"
				onInput = {props.handleInput}
			/>
		</div>
	);
};