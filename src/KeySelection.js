import React from 'react';
import { connect } from 'react-redux';
import {getPage} from './redux/selectors';
import {getQuestionnaireTrialBlock} from './redux/questionnaireselectors';
import {nextTrialBlock} from './redux/questionnaireactions';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import KeyListener from './KeyListener';
import {getAcceptColour, getRejectColour} from './redux/colourselectors';
import {setKeySelected} from './redux/questionnairedataactions';
import {getQuestionnaireName} from './redux/questionnairedataselectors';
import {
	PAGE_KEY_SELECT_SUBSIDY,
	PAGE_KEY_SELECT_TAX,
	PAGE_KEY_SELECT_OUTCOME
} from './redux/questionnaireconstants';
import {PHASE2} from './redux/globalconstants';

const keyChars = ['X', 'C', 'N', 'M'];
const keyCodes = {'KeyC': true, 'KeyX': true, 'KeyN': true, 'KeyM': true};
const instructions = {
	[PAGE_KEY_SELECT_SUBSIDY]: "For the catch shown below, which button did you press to get the subsidy",
	[PAGE_KEY_SELECT_TAX]: "For the catch shown below, which button did you press to avoid the tax",
	[PAGE_KEY_SELECT_OUTCOME]: "Which button did you press to receive this outcome?"
};

class KeySelection extends React.Component {
	constructor(props) {
		super(props);
		this.handleKeyEvent = this.handleKeyEvent.bind(this);
	}

	handleKeyEvent(code) {
		if (!keyCodes[code]) {
			return;
		}
		this.props.logKey(this.props.questionnaire, this.props.image, code, this.props.correctKey);
		this.props.nextPage();
		return false;
	}

	render() {
		const {image, rule} = this.props;

		let decoration = null;

		if (this.props.showTrialColour){
			decoration = "Filled";
			if (rule === 'Reject') {
			  decoration += " " + this.props.rejectColour;
			} else if (rule === 'Accept') {
			  decoration += " " + this.props.acceptColour;
			}
		}

		return (
			<FullScreenVerticalAlign>
			 	<KeyListener onKeyEvent = {this.handleKeyEvent} />
				<div className="TextEmphasis">{this.props.instruction}</div>
				<br />
				<br />
				<div id="catchcontainer">
		            <span className="ImageVerticalAlignHelper"></span>
		            <img
		                alt="Catch"
		                src={image}
		                className="CatchImage"
		              />
		              <div className={decoration}>
		              </div>
	            </div>
				<div>
					<div className = "BucketColumn">
						<div className = "Key">{keyChars[0]}</div>
					</div>
					<div className = "BucketColumn">
						<div className = "Key">{keyChars[1]}</div>
					</div>
					<div className = "BucketColumn">
						<div className = "Key">{keyChars[2]}</div>
	          		</div>
					<div className = "BucketColumn">
						<div className = "Key">{keyChars[3]}</div>
	          		</div>
				</div>
			</FullScreenVerticalAlign>
		);
	}
}


const mapStateToProps = (state, ownProps) => {
	const block = getQuestionnaireTrialBlock(state);
	const page = getPage(state);
	const correctKey = state[PHASE2].keyLookUp[block.image];
	return {
		questionnaire: getQuestionnaireName(state),
		showTrialColour: page === PAGE_KEY_SELECT_OUTCOME,
		image: block.image,
		rule: block.rule,
		instruction: instructions[page],
		acceptColour: getAcceptColour(state),
		rejectColour: getRejectColour(state),
		correctKey
	};
};

const mapDispatchToProps = dispatch => {
  return {
  	logKey: (questionnaire, img, selected, correct) => dispatch(setKeySelected(questionnaire, img, selected, correct)),
    nextPage: (phase) => dispatch(nextTrialBlock()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeySelection);
