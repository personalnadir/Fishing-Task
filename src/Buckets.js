import React from 'react';
import { connect } from 'react-redux'
import getTrial, {getPhase, getTrialRule} from './redux/selectors';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import KeyPressed from './KeyPressed';
import acceptFish from './images/phase1practice/accept_fish_bucket.png';
import rejectFish from './images/phase1practice/reject_fish_bucket.png';
import acceptCrab from './images/phase1practice/accept_crab_bucket.png';
import rejectCrab from './images/phase1practice/reject_crab_bucket.png';

const keyChars = ['X', 'C', 'N', 'M'];

function Buckets({rule, forceKey, highlightKey, phase}) {
  const highlightClasses = highlightKey && [
    rule === "Accept Fish" ? "KeyHighlight Accept" : "",
    rule === "Reject Fish" ? "KeyHighlight Reject" : "",
    rule === "Reject Crab" ? "KeyHighlight Reject" : "",
    rule === "Accept Crab" ? "KeyHighlight Accept" : "",
  ];
	return (
		<FullScreenVerticalAlign>
			<KeyPressed />
			<div className="Instruction">What's to do?</div>
			<div className = "BucketContainer">
				<div className = "BucketColumn">
					<img className = "Bucket" src={acceptFish} alt = "Bucket"/>
					<div className = "Key">{keyChars[0]}</div>
          <div className = {highlightClasses[0]}></div>
				</div>
				<div className = "BucketColumn">
					<img className = "Bucket" src={rejectFish} alt = "Bucket"/>
					<div className = "Key">{keyChars[1]}</div>
          <div className = {highlightClasses[1]}></div>

				</div>
				<div className = "BucketColumn">
					<img className = "Bucket" src={rejectCrab} alt = "Bucket"/>
					<div className = "Key">{keyChars[2]}</div>
          <div className = {highlightClasses[2]}></div>

				</div>
				<div className = "BucketColumn">
					<img className = "Bucket" src={acceptCrab} alt = "Bucket"/>
					<div className = "Key">{keyChars[3]}</div>
          <div className = {highlightClasses[3]}></div>
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
    phase
  }
};


export default connect(
  mapStateToProps,
)(Buckets);
