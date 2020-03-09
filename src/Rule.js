import React from 'react';
import { connect } from 'react-redux'
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import {startTimeout} from './redux/action';
import getTrial, {getPhase, getNextPageAction} from './redux/selectors';

class Rule extends React.Component {
	componentDidMount() {
		this.props.startTimeout(this.props.phase);
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
			case 'Free':
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
	return {
		type: trial.rule,
		showText: true,
		phase
	}
};

const mapDispathToProps = dispatch => {
	return {
		startTimeout: (phase) => dispatch(startTimeout(getNextPageAction(phase),1000))
	}
}

export default connect(
	mapStateToProps,
	mapDispathToProps
)(Rule);