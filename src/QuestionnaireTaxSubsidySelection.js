import React from 'react';
import { connect } from 'react-redux';
import GalleryButtons from './GalleryButtons';
import { nextPage } from './redux/questionnaireactions';
import {phase1} from './images';
import {getPage} from './redux/selectors';
import {sendGalleryAnimals} from './redux/questionnairedataactions';
import {getQuestionnaireName} from './redux/questionnairedataselectors';
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
		this.selectedImages = [];
		this.handleSelectionChange = this.handleSelectionChange.bind(this);
	}

	handleSelectionChange(img, isSelected, numSelected, selectedImages) {
		this.setState({
			showButton: numSelected === 6
		});

		this.selectedImages = selectedImages;
	}

	render() {
		const {nextPage, questionnaire, correctImages} = this.props;
		const button = this.state.showButton? <button onClick={() => nextPage(questionnaire, this.selectedImages,correctImages)} className="ContinueButton">Continue</button>
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
	const qState = state[QUESTIONNAIRE];
	const imagePool = qState.taxSubsidyImages;
	const name = getQuestionnaireName(state);
	const correctImages = name === "SUBSIDY_IMAGE_SELECTION"? qState.subsidyImages: qState.taxImages;

	return {
		questionnaire: getQuestionnaireName(state),
		images: imagePool.map(trial => ({
			...trial,
			path: trial.image
		})),
		instruction: instructions[getPage(state)],
		correctImages,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		nextPage: (questionnaire, imagesSelected, correctImages) => {
			dispatch(sendGalleryAnimals(questionnaire, imagesSelected, correctImages));
			dispatch(nextPage());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuestionnaireTaxSubsidySelection);
