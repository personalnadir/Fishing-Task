import React from 'react';
import { connect } from 'react-redux';
import GalleryButtons from './GalleryButtons';
import { nextPage } from './redux/questionnaireactions';
import {phase1} from './images';
import {getPage} from './redux/selectors';
import {PAGE_GALLERY_SUBSIDY, PAGE_GALLERY_TAX} from './redux/questionnaireconstants';
import {QUESTIONNAIRE} from './redux/globalconstants';

const instructions = {
	[PAGE_GALLERY_SUBSIDY]: "Please select the 6 catches that were eligible for subsidies:",
	[PAGE_GALLERY_TAX]: "Please select the 6 catches that were liable to tax:"
};

class QuestionnaireTaxSubsidySelection extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showButton: false
		};
		this.handleSelectionChange = this.handleSelectionChange.bind(this);
	}

	handleSelectionChange(img, isSelected, numSelected) {
		this.setState({
			showButton: numSelected === 6
		});
	}

	render() {
		const {nextPage} = this.props;
		const button = this.state.showButton? <button onClick={() => nextPage()} className="ContinueButton">Continue</button>
		: null;
		return (
			<div className = "InstructionPage">
	        	<span className="TextEmphasis">{this.props.instruction}</span>
		        <GalleryButtons cols = {4} images={this.props.images} maxSelected = {6} onSelectionChange = {this.handleSelectionChange} />
		        {button}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		images: state[QUESTIONNAIRE].taxSubsidyImages.map(trial => ({
			...trial,
			path: trial.image
		})),
		instruction: instructions[getPage(state)]
	};
};

const mapDispatchToProps = dispatch => {
	return {
		nextPage: () => dispatch(nextPage())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuestionnaireTaxSubsidySelection);
