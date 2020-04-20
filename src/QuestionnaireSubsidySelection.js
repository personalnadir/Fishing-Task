import React from 'react';
import { connect } from 'react-redux';
import GalleryButtons from './GalleryButtons';
import { nextPage } from './redux/questionnaireactions';
import {QUESTIONNAIRE} from './redux/globalconstants';
import {phase1} from './images';

class QuestionnaireSubsidySelection extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showButton: false
		};
		this.handleSelectionChange = this.handleSelectionChange.bind(this);
	}

	componentDidUpdate() {
		window.scrollTo(0, 0);
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
	        	<span className="TextEmphasis">Please select the 6 catches that were eligible for subsidies:</span>
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
		}))
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
)(QuestionnaireSubsidySelection);
