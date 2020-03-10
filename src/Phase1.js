import React from 'react';
import Rule from './Rule';
import Catch from './Catch';
import Feedback from './Feedback';
import { connect } from 'react-redux';
import * as phase1 from './redux/phase1constants';
import {getPage} from './redux/selectors';

function Phase1({page}) {
	switch (page) {
		case phase1.PAGE_RULE:
			return <Rule />;
		case phase1.PAGE_CATCH:
			return <Catch />;
		case phase1.PAGE_FEEDBACK:
			return <Feedback />;
		default:
			console.log(`Phase1: ${page} Not found `);
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
)(Phase1);
