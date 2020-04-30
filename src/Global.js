import React from 'react';
import Phase1Practice from './Phase1Practice';
import Phase1 from './Phase1';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import LoginPage from './LoginPage';
import Questionnaires from './Questionnaires';
import Instructions from './Instructions';
import { connect } from 'react-redux';
import * as global from './redux/globalconstants';
import {getPhase} from './redux/selectors';

function Global({phase}) {
	switch (phase) {
		case global.LOGIN_PAGE:
			return <LoginPage />;
		case global.PHASE1_PRACTICE_INSTRUCTIONS:
		case global.PHASE2_PRACTICE_INSTRUCTIONS:
		case global.PHASE1_INSTRUCTIONS:
		case global.PHASE2_INSTRUCTIONS:
		case global.PHASE3_INSTRUCTIONS:
		case global.PHASE_END_INSTRUCTIONS:
			return <Instructions />;
		case global.PHASE1_PRACTICE:
			return <Phase1Practice />;
		case global.PHASE1:
			return <Phase1 />;
		case global.PHASE2:
		case global.PHASE2_PRACTICE:
			return <Phase2 />;
		case global.PHASE3:
			return <Phase3 />;
		case global.QUESTIONNAIRE:
			return <Questionnaires />;
		default:
			return null;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		phase: getPhase(state)
	}
};

export default connect(
	mapStateToProps,
)(Global);
