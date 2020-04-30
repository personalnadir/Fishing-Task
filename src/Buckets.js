import React from 'react';
import { connect } from 'react-redux'
import getTrial, {getPhase, getTrialRule} from './redux/selectors';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import {getAcceptColour} from './redux/colourselectors';
import KeyPressed from './KeyPressed';
import acceptFish from './images/phase1practice/accept_fish_bucket.png';
import rejectFish from './images/phase1practice/reject_fish_bucket.png';
import acceptCrab from './images/phase1practice/accept_crab_bucket.png';
import rejectCrab from './images/phase1practice/reject_crab_bucket.png';

const keyChars = ['X', 'C', 'N', 'M'];

const ruleHighlights = {
	Blue: {
		"Accept Fish": "KeyHighlight Blue",
		"Reject Fish": "KeyHighlight Orange",
		"Reject Crab": "KeyHighlight Orange",
		"Accept Crab": "KeyHighlight Blue",
	},
	Orange: {
		"Accept Fish": "KeyHighlight Orange",
		"Reject Fish": "KeyHighlight Blue",
		"Reject Crab": "KeyHighlight Blue",
		"Accept Crab": "KeyHighlight Orange",
	}
};

const bucketOrder = {
	Blue: [
		"Accept Fish",
		"Reject Fish",
		"Reject Crab",
		"Accept Crab"
	],
	Orange: [
		"Reject Fish",
		"Accept Fish",
		"Accept Crab",
		"Reject Crab"
	]
};

function Buckets({acceptColour, rule, forceKey, highlightKey, phase}) {
	const ruleColours = ruleHighlights[acceptColour];
	const buckets = bucketOrder[acceptColour];
	const highlightColours = [
		buckets[0] === rule? ruleColours[buckets[0]]: "",
		buckets[1] === rule? ruleColours[buckets[1]]: "",
		buckets[2] === rule? ruleColours[buckets[2]]: "",
		buckets[3] === rule? ruleColours[buckets[3]]: ""
	];

	return (
		<FullScreenVerticalAlign>
			<KeyPressed />
			<div className="Instruction">What's to do?</div>
			<div className = "BucketContainer">
				<div className = "BucketColumn">
					<img className = "Bucket" src={acceptFish} alt = "Bucket"/>
					<div className = "Key">{keyChars[0]}</div>
          <div className = {highlightColours[0]}></div>
				</div>
				<div className = "BucketColumn">
					<img className = "Bucket" src={rejectFish} alt = "Bucket"/>
					<div className = "Key">{keyChars[1]}</div>
          <div className = {highlightColours[1]}></div>

				</div>
				<div className = "BucketColumn">
					<img className = "Bucket" src={rejectCrab} alt = "Bucket"/>
					<div className = "Key">{keyChars[2]}</div>
          <div className = {highlightColours[2]}></div>

				</div>
				<div className = "BucketColumn">
					<img className = "Bucket" src={acceptCrab} alt = "Bucket"/>
					<div className = "Key">{keyChars[3]}</div>
          <div className = {highlightColours[3]}></div>
				</div>
			</div>
		</FullScreenVerticalAlign>
	);
}


const mapStateToProps = (state, ownProps) => {
  const trial = getTrial(state);
  const phase = getPhase(state);

  return {
    rule: getTrialRule(state),
    forceKey: trial.forceKey,
    highlightKey: trial.highlightKey,
    acceptColour: getAcceptColour(state),
    phase
  }
};


export default connect(
  mapStateToProps,
)(Buckets);
