import React from 'react';
import { connect } from 'react-redux'

export default function InstructionPageFour() {
	return (
		<div className = "InstructionPage">
			<ul className = "InstructionTextBullets">
				<li>This was the demonstration. <b>We will now start the training trials,</b> which means that the instructions will disappear from the screen.</li>
				<li><b>Please continue sorting your catch by applying the rules that you have just learned</b> so that over time you will be able to sort your catch quickly and efficiently.</li>
				<li>There will be short breaks in between the training blocks in which we will give you feedback on your perfomance.</li>
				<li>Please try to do your best.</li>
			</ul>
		</div>
	);
}
