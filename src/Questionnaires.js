import React from 'react';
import { connect } from 'react-redux';
import * as questionnaire from './redux/questionnaireconstants';
import {getPage} from './redux/selectors';
import KeySelection from './KeySelection';
import QuestionnaireTaxSubsidySelection from './QuestionnaireTaxSubsidySelection';
import QuestionnaireConfidence from './QuestionnaireConfidence';

function Questionnaires({page}) {
	switch (page) {
		case questionnaire.PAGE_GALLERY_SUBSIDY:
		case questionnaire.PAGE_GALLERY_TAX:
			return <QuestionnaireTaxSubsidySelection />;
		case questionnaire.PAGE_KEY_SELECT_SUBSIDY:
		case questionnaire.PAGE_KEY_SELECT_TAX:
		case questionnaire.PAGE_KEY_SELECT_OUTCOME:
			return <KeySelection />;
		case questionnaire.PAGE_CONFIDENCE_SUBSIDY:
		case questionnaire.PAGE_CONFIDENCE_TAX:
			return <QuestionnaireConfidence />;
		default:
			console.log(`Questionnaires: ${page} Not found `);
			return null;
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		page: getPage(state)
	};
};

export default connect(
	mapStateToProps,
)(Questionnaires);
