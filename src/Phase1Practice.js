import React from 'react';
import Rule from './Rule';
import Buckets from './Buckets';
import Catch from './Catch';
import { connect } from 'react-redux';
import { getPage } from './redux/selectors';
import * as phase1 from './redux/phase1constants';


function Phase1Practice({page}) {
	switch (page) {
		case phase1.PAGE_RULE:
			return <Rule />;
		case phase1.PAGE_BUCKETS:
			return <Buckets />;
		case phase1.PAGE_CATCH:
			return <Catch />;
		default:
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
)(Phase1Practice);
