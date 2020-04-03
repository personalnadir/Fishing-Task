import React from 'react';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import { connect } from 'react-redux'
import {clearShowFeedback} from './redux/phase1actions';
import {getPhase, getFeedbackInfo} from './redux/selectors';

class Feedback extends React.Component{
	constructor(props) {
		super(props);
		this.handleKeyEvent = this.handleKeyEvent.bind(this);
	}

	handleKeyEvent(event) {
	    // We don't want to mess with the browser's shortcuts
	    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
	      return;
	    }

    	this.props.nextPage();
      	this.cleanUp();
    }

	cleanUp() {
		window.removeEventListener('keydown', this.handleKeyEvent);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyEvent);
	}

	componentWillUnmount() {
		this.cleanUp();
	}

	render(){
		const {total, correct, missed, wrong} = this.props;
		const correctBarStyle = {width: `${correct * 100 / total}%`};
		const wrongBarStyle = {width: `${wrong * 100 / total}%`};
		const missedBarStyle = {width: `${missed * 100 / total}%`};
		const mistakeWarning = wrong === 0 && missed === 0? null : <span className = "TextEmphasis">Please try to do better in the next block</span>;
		let missedBar;
		if (missed > 0) {
			missedBar = <dd className = "Bar">
					<div className = "Percentage" style = {missedBarStyle}>
						<span className = "ChartText">Missed</span>
					</div>
				</dd>;
		}

		return (
			<FullScreenVerticalAlign>
			    <span className="ImageVerticalAlignHelper"></span>
			    <span className="TextTitle">Brief Update</span>
				<dl>
					<dt>Your responses so far:</dt>
					<dd className = "Bar">
						<div className = "Percentage" style = {correctBarStyle}>
							<span className = "ChartText">Correct</span>
						</div>
					</dd>
					<dd className = "Bar">
						<div className = "Percentage" style = {wrongBarStyle}>
							<span className = "ChartText">Wrong</span>
						</div>
					</dd>
					{missedBar}
				</dl>
				<br/>
				{mistakeWarning}
				<br/>
				<br/>
				<span className = "TextEmphasis">Press any key to continue</span>
			</FullScreenVerticalAlign>
		);
	}
}


const mapStateToProps = (state, ownProps) => {
  const {total, numCorrect, numMissed, numMistakes} = getFeedbackInfo(state);
  const phase = getPhase(state);
  return {
    total,
    correct: numCorrect,
    missed: (numMissed || 0),
    wrong :numMistakes,
    phase
  }
};

const mapDispathToProps = dispatch => {
  return {
    nextPage: () => dispatch(clearShowFeedback())
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Feedback);
