import React from 'react';
import { connect } from 'react-redux'
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import {startTimeout} from './redux/action';
import getTrial, {getPhase, getCurrentTrialIndex} from './redux/selectors';
import {getNextPageAction} from './redux/phaseactions';

class Rule extends React.Component {
	componentDidMount() {
		this.props.startTimeout(this.props.phase, this.props.trialIndex);
	}

	render() {
		const {showText, type} = this.props;
		const instructionClass = "Instruction" + (showText? "": " Hidden");
		let className;
		let text;
		switch (type) {
			case 'Accept':
				className = 'Rule Accept';
				text = 'Accept';
				break;
			case 'Reject':
				className = 'Rule Reject';
				text = 'Reject';
				break;
			case 'FreeChoice':
				className = 'Rule Free';
				text = 'Free Choice';
				break;
			default:
				text = type;
		}
		return (
			<div>
				<div className={instructionClass}>What's the rule?</div>
				<FullScreenVerticalAlign>
					<div className={className}>
						{text}
					</div>
				</FullScreenVerticalAlign>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
    const trial = getTrial(state);
    const phase = getPhase(state);
    const trialIndex = getCurrentTrialIndex(state);
	return {
		type: trial.rule,
		showText: true,
		trialIndex,
		phase
	}
};

const mapDispathToProps = dispatch => {
	return {
		startTimeout: (phase, trialIndex) => dispatch(startTimeout(()=>getNextPageAction(phase)(trialIndex),1000))
	}
}

export default connect(
	mapStateToProps,
	mapDispathToProps
)(Rule);