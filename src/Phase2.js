import React from 'react';
import Catch from './Catch';
import Face from './Face';
import FixationCross from './FixationCross';
import { connect } from 'react-redux';
import * as phase2 from './redux/phase2constants';
import {getPage} from './redux/selectors';

function Phase2({page}) {
	switch (page) {
		case phase2.PAGE_FIXATION:
			return <FixationCross />;
		case phase2.PAGE_CATCH:
			return <Catch />;
		case phase2.PAGE_FACE:
			return <Face />;
		default:
			console.log(`Phase2: ${page} Not found `);
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
)(Phase2);
