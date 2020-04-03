import React from 'react';
import { connect } from 'react-redux'
import Rule from './Rule';
import fishCrab from './images/instructions/fishcrab.png';
import correct_a from './images/instructions/correct_a.png';
import correct_b from './images/instructions/correct_b.png';
import reject_a from './images/instructions/reject_a.png';
import reject_b from './images/instructions/reject_b.png';
import cross from './images/fixation_cross.png';
import { Markup } from 'interweave';

const keyStrings = {
	a: {
		accept: {
			fish: "<b>button X</b> should be pressed with your <b>left middle finger.</b>",
			crab: "<b>button M</b> should be pressed with your <b>right middle finger.</b>"
		},
		reject: {
			fish: "<b>button C</b> should be pressed with your <b>left index finger.</b>",
			crab: "<b>button N</b> should be pressed with your <b>right index finger.</b>"
		}
	},
	b: {
		accept: {
			fish: "<b>button C</b> should be pressed with your <b>left index finger.</b>",
			crab: "<b>button N</b> should be pressed with your <b>right index finger.</b>"
		},
		reject: {
			fish: "<b>button C</b> should be pressed with your <b>left middle finger.</b>",
			crab: "<b>button N</b> should be pressed with your <b>right middle finger.</b>"
		}
	}
};

const imgSrc = {
	a: {
		accept: correct_a,
		reject: reject_a
	},
	b: {
		accept: correct_b,
		reject: reject_b
	}
};

function InstructionPageTwo({version}) {

	const keyText = keyStrings[version];
	const imgs = imgSrc[version];

	return (
		<div className="InstructionPage">
			<span className="InstructionTitle">The 3 steps of Fishing</span>
			<ol className = "InstructionTextBullets">
				<li>
					<span className="TextEmphasis">Take notice of the rule.</span><br/>
					A sign will appear briefly on the screen to tell you whether you should reject or accept the catch.
					<div className="InstructionRules">
						<span className="SmallRule Accept Left">
							Accept
						</span>
						<span className="SmallRule Reject Right">
							Reject
						</span>
					</div>
				</li>
				<li>
					<span className="TextEmphasis">Check what is in your net.</span><br/>
					You will then see a picture of either a fish or a crab to which you will have to apply the rule you have just seen.<br />
					<img
						className="InstructionImages"
						src={fishCrab}
					/>

				</li>
				<li>
					<span className="TextEmphasis">Act according to the rule.</span><br/>
					You need to press the button associated with the correct container for fish or for crabs.<br />
					<div className="Columns">
						<span className="ColumnTextSpan">To accept the fish, <Markup content={keyText.accept.fish} /></span>
					</div>
					<div className="Columns">
						<div className="ColumnTextSpan">
							<span className="SmallRule Accept">
								Accept
							</span>
							<br />
							<br />
							<img
								className="InstructionImages"
								src={imgs.accept}
							/>
						</div>
					</div>
					<div className="Columns">
						<span className="ColumnTextSpan">To accept the crab, <Markup content={keyText.accept.crab} /></span>
					</div>
					<b>Feedback</b> will tell if you pressed the correct button and show you the colour of the container you selected.
					<br />
					<br />
					If the rule is <b>reject</b>, you should put your catch in a different container and press the relevant button.<br />
					<div className="Columns">
						<span className="ColumnTextSpan">To reject the fish, <Markup content={keyText.reject.fish} /></span>
					</div>
					<div className="Columns">
						<div className="ColumnTextSpan">
							<span className="SmallRule Reject">
								Reject
							</span>
							<br />
							<br />
							<img
								className="InstructionImages"
								src={imgs.reject}
							/>
						</div>
					</div>
					<div className="Columns">
						<span className="ColumnTextSpan">To reject the crab, <Markup content={keyText.reject.crab} /></span>
					</div>
					<b>Feedback</b> will tell if you pressed the correct button and show you the colour of the container you selected.
				</li>
			</ol>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		version: 'a'
	}
};

export default connect(
	mapStateToProps,
)(InstructionPageTwo);

