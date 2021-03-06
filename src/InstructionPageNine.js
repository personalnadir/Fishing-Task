import React from 'react';
import Rule from './Rule';
import { connect } from 'react-redux';
import toBlue from './images/instructions/to_blue_containers.png';
import toOrange from './images/instructions/to_orange_containers.png';
import {getAcceptColour, getRejectColour} from './redux/colourselectors';

const imgSrc = {
	Blue: {
		accept: toBlue,
		reject: toOrange
	},
	Orange: {
		accept: toOrange,
		reject: toBlue
	}
};

function InstructionPageNine({acceptColour, rejectColour}) {
	const imgs = imgSrc[acceptColour];
	return (
		<div className = "InstructionPage">
			<ul className = "InstructionTextBullets">
				<li>You and your colleagues are <b>back at sea fishing.</b></li>
				<li>As bfore, <b>the sorting rules you learned as a trainee apply.</b> This means you do note need to think about tax and subsidies any more as these are now irrelevant.</li>
				<li>You will see the rule whether to accept or reject the catch, you will then need to press the button associated with the correct container</li>
			</ul>

			<div className="HalfWidth">
				<div className="ColumnTextSpan">
					<span className={`SmallRule ${acceptColour}`}>
						Accept
					</span>
					<br />
					<br />
					<img
						className="InstructionImages"
						src={imgs['accept']}
					/>
				</div>
			</div>
			<div className="FifteenthWidth">
			</div>
			<div className="HalfWidth">
				<div className="ColumnTextSpan">
					<span className={`SmallRule ${rejectColour}`}>
						Reject
					</span>
					<br />
					<br />
					<img
						className="InstructionImages"
						src={imgs['reject']}
					/>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		acceptColour: getAcceptColour(state),
		rejectColour: getRejectColour(state),
	}
};

export default connect(
	mapStateToProps,
)(InstructionPageNine);
