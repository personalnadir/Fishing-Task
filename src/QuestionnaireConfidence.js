import React from 'react';
import { connect } from 'react-redux';
import GalleryButtons from './GalleryButtons';
import { nextPage } from './redux/questionnaireactions';
import {sendVAS} from './redux/questionnairedataactions';
import {QUESTIONNAIRE} from './redux/globalconstants';
import {phase1} from './images';
import {getPage} from './redux/selectors';
import {getQuestionnaireName} from './redux/questionnairedataselectors';
import Slider from './Slider';
import {PAGE_CONFIDENCE_SUBSIDY, PAGE_CONFIDENCE_TAX} from './redux/questionnaireconstants';

const instructions = {
	[PAGE_CONFIDENCE_SUBSIDY]: "How confident were you when answering the questions about the buttons that you pressed to get the subsidies?",
	[PAGE_CONFIDENCE_TAX]: "How confident were you when answering the questions about the buttons that you pressed to get the tax?"
};

class QuestionnaireConfidence extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showButton: false
		};
		this.handleInputSelection = this.handleInputSelection.bind(this);
	}

	componentDidUpdate() {
		window.scrollTo(0, 0);
	}

	handleInputSelection(event) {
		this.setState({
			showButton: true
		});
		this.selectedValue = event.target.value;
	}

	render() {
		const {nextPage} = this.props;
		const button = this.state.showButton? <button onClick={() => nextPage(this.props.questionnaire, this.selectedValue)} className="ContinueButton">Continue</button>
		: null;
		return (
			<div className = "InstructionPage">
	        	<span className="TextEmphasis">{this.props.instruction}</span>
		                <Slider handleInput = {this.handleInputSelection} />
		        {button}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		instruction: instructions[getPage(state)],
		questionnaire: getQuestionnaireName(state),
	};
}

const mapDispatchToProps = dispatch => {
	return {
		nextPage: (questionnaire, value) => {
			dispatch(sendVAS(questionnaire, value));
			dispatch(nextPage());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuestionnaireConfidence);
