import React from 'react';
import { connect } from 'react-redux';
import { getInstructionPage } from './redux/selectors';
import InstructionPageOne from './InstructionPageOne';
import InstructionPageTwo from './InstructionPageTwo';
import InstructionPageThree from './InstructionPageThree';
import InstructionPageFour from './InstructionPageFour';
import InstructionPageFive from './InstructionPageFive';
import InstructionPageSix from './InstructionPageSix';
import InstructionPageSeven from './InstructionPageSeven';
import InstructionPageEight from './InstructionPageEight';
import InstructionPageNine from './InstructionPageNine';
import InstructionPageTen from './InstructionPageTen';
import InstructionPageEnd from './InstructionPageEnd';
import InstructionPageEndOfPractice from './InstructionPageEndOfPractice';
import InstructionPageStartOfPractice from './InstructionPageStartOfPractice';
import InstructionPhase1Start from './InstructionPhase1Start';
import InstructionPhase2Start from './InstructionPhase2Start';
import InstructionPhase3Start from './InstructionPhase3Start';
import Earnings from './Earnings';
import { nextPage } from './redux/instructionactions';
import { nextPhase } from './redux/globalactions';

const pages = [
	{page: <InstructionPhase1Start />},
	{page: <InstructionPageOne />},
	{page: <InstructionPageTwo />},
	{page: <InstructionPageThree />, returnTask: true},
	{page: <InstructionPageFour />, returnTask: true},
	{page: <InstructionPhase2Start />},
	{page: <InstructionPageFive />},
	{page: <InstructionPageSix />},
	{page: <InstructionPageSeven />},
	{page: <InstructionPageEight />},
	{page: <InstructionPageStartOfPractice />, returnTask: true},
	{page: <InstructionPageEndOfPractice />, returnTask: true},
	{page: <Earnings />},
	{page: <InstructionPhase3Start />},
	{page: <InstructionPageNine />},
	{page: <InstructionPageTen />, returnTask: true},
	{page: <InstructionPageEnd />, endTask: true}
];

class Instructions extends React.Component{
	componentDidUpdate() {
		window.scrollTo(0, 0);
	}

	render() {
		const {page, nextPage} = this.props;
		const instructionPage = pages[page];
		const buttonClick = () => {
			if (instructionPage.endTask) {
				window.confirm("You can close the window, thanks!");
				return;
			}
			nextPage(instructionPage.returnTask);
		};
		return (
			<div>
				{instructionPage.page}
				<button onClick={buttonClick} className="ContinueButton">Continue</button>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		page: getInstructionPage(state)
	}
};

const mapDispatchToProps = dispatch => {
	return {
		nextPage: (goToNextPhase) => {
			if (goToNextPhase) {
				dispatch(nextPhase());
			}
			dispatch(nextPage());
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Instructions);
