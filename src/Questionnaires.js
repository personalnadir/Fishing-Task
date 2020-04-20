import React from 'react';
import { connect } from 'react-redux';
import * as questionniare from './redux/questionnaireconstants';
import {getPage} from './redux/selectors';
import KeySelection from './KeySelection';
import QuestionnaireTaxSubsidySelection from './QuestionnaireTaxSubsidySelection';
import QuestionnaireConfidence from './QuestionnaireConfidence';

function Questionnaires({page}) {
	switch (page) {
		case questionniare.PAGE_GALLERY_SUBSIDY:
		case questionniare.PAGE_GALLERY_TAX:
			return <QuestionnaireTaxSubsidySelection />;
		case questionniare.PAGE_KEY_SELECT_SUBSIDY:
		case questionniare.PAGE_KEY_SELECT_TAX:
		case questionniare.PAGE_KEY_SELECT_OUTCOME:
			return <KeySelection />;
		case questionniare.PAGE_CONFIDENCE_SUBSIDY:
		case questionniare.PAGE_CONFIDENCE_TAX:
			return <QuestionnaireConfidence />;
		default:
			console.log(`Questionnaires: ${page} Not found `);
			return null;
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		page: getPage(state)
	}
};

export default connect(
	mapStateToProps,
)(Questionnaires);
