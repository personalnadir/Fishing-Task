import React from 'react';
import Rule from './Rule';
import Buckets from './Buckets';
import Catch from './Catch';
import Feedback from './Feedback';
import { connect } from 'react-redux';
import * as phase3 from './redux/phase3constants';
import {getPage} from './redux/selectors';

function Phase1({page}) {
	switch (page) {
		case phase3.PAGE_RULE:
			return <Rule />;
		case phase3.PAGE_CATCH:
			return <Catch />;
		default:
			console.log(`Phase3: ${page} Not found `);
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
