import React from 'react';
import { connect } from 'react-redux'
import {
	getEarnings
} from './redux/selectors';

function Earnings(props) {
	const earningsSign = props.earnings < 0? "-" :"";
	const earningsText = Math.abs(props.earnings).toFixed(2);

	return (
		<div className = "InstructionPage">
			<div className = "TextTitle">
				Well done, you have earned:
			</div>
			<br />
			<br />
			<div className = "TextSuperLarge">
				{earningsSign}£{earningsText}
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
  const earnings = getEarnings(state);
  return {
  	earnings,
  };
}

export default connect(
  mapStateToProps,
  null
)(Earnings);