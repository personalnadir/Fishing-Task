import React from 'react';
import cross from './images/fixation_cross.png';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import {getPhase, getCurrentTrialIndex} from './redux/selectors';
import {startTimeout} from './redux/action';
import {getNextPageAction} from './redux/phaseactions';
import { connect } from 'react-redux'

class FixationCross extends React.Component {
  componentDidMount() {
    this.props.startTimeout(this.props.phase, this.props.trialIndex);
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
  const trialIndex = getCurrentTrialIndex(state);
  return {
    phase,
    trialIndex
  }
};

const mapDispathToProps = dispatch => {
  return {
    startTimeout: (phase, trialIndex) => dispatch(startTimeout(() => getNextPageAction(phase)(trialIndex),1000))
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(FixationCross);
