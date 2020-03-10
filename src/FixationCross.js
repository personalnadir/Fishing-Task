import React from 'react';
import cross from './images/fixation_cross.png';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import {getPhase, getNextPageAction} from './redux/selectors';
import {startTimeout} from './redux/action';

import { connect } from 'react-redux'

class FixationCross extends React.Component {
  componentDidMount() {
    this.props.startTimeout(this.props.phase);
  }

  render() {
    return (
      <FullScreenVerticalAlign>
        <div id="catchcontainer">
          <span className="ImageVerticalAlignHelper"></span>
          <img
              alt="Fixation Cross"
              src={cross}
              className="CatchImage"
            />
          <div className="Outline Black">
          </div>
        </div>
      </FullScreenVerticalAlign>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const phase = getPhase(state);
  return {
    phase
  }
};

const mapDispathToProps = dispatch => {
  return {
    startTimeout: (phase) => dispatch(startTimeout(getNextPageAction(phase),1000))
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(FixationCross);
