import React from 'react';
import { connect } from 'react-redux'

export default function InstructionPageThree() {
	return (
		<div className = "InstructionPage">
			<ul className = "InstructionTextBullets">
				<li>As a trainee fisherman, <b>your performance will be closely monitored by your colleagues</b>, who will tell you immediately whether you did the right thing.</li>
				<li>They give you feedback on what you have done and they will show you the colour of the container you have selected, even if you made a mistake.</li>
				<li>This should help you <b className="ExtraEmphasis">learn the releationship between the four buttons and the four containers</b></li>
				<li>Good fishermen sort their catch quickly and efficiently; <b>make sure you remember what you do!</b></li>
				<li>We will now give you a demonstration of the task and ask you follow the instructions on the screen as we go along</li>
			</ul>
		</div>
	);
}
