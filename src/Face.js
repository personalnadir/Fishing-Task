import React from 'react';
import { connect } from 'react-redux'
import mildNegativeFace from './images/faces/mild_negative_face.png';
import mildPositiveFace from './images/faces/mild_positive_face.png';
import strongNegativeFace from './images/faces/strong_negative_face.png';
import strongPositiveFace from './images/faces/strong_positive_face.png';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import getTrial, {getPhase, getNextPageAction, getWasCorrect, getWasLate} from './redux/selectors';
import {startTimeout} from './redux/action';
import {adjustEarnings} from './redux/phase2actions';

const avoidanceFaces = {
  correct: strongPositiveFace,
  incorrect : {
    timely: mildNegativeFace,
    late: strongNegativeFace
  }
};

const approachFaces = {
  correct: {
    timely: strongPositiveFace,
    late: mildPositiveFace,
  },
  incorrect: mildNegativeFace
};

const avoidanceRewards = {
  correct: 0,
  incorrect : {
    timely: -.10,
    late:-.50
  }
};

const approachRewards = {
  correct: {
    timely: 0.50,
    late: .10,
  },
  incorrect: 0
};


class Face extends React.Component {
  componentDidMount() {
    this.props.startTimeout(this.props.phase);
    this.props.adjustEarnings(this.props.reward);
  }

  render () {
    const {reward} = this.props;
    const rewardString = (reward * 100).toFixed(0);

    return (
      <div className = "FullScreen BlackBackground">
        <FullScreenVerticalAlign>
            <div id="catchcontainer">
              <span className="ImageVerticalAlignHelper"></span>
              <img
                  alt=""
                  src={this.props.face}
                  className="CatchImage"
                />
            </div>
            <span className = "FaceText">{rewardString}p</span>
        </FullScreenVerticalAlign>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const trial = getTrial(state);
  const phase = getPhase(state);
  const wasCorrect = getWasCorrect(state);
  const wasLate = getWasLate(state);
  const faceLookUp = trial.rule === 'Tax' ? avoidanceFaces: approachFaces;
  const rewardLookUp = trial.rule === 'Tax' ? avoidanceRewards: approachRewards;
  let face;
  let reward;

  console.log(`${trial.rule} ${wasCorrect}`);

  if (wasCorrect) {
    face = faceLookUp['correct'];
    reward = rewardLookUp['correct'];
  } else {
    face = faceLookUp['incorrect'];
    reward = rewardLookUp['incorrect'];
  }

  if (typeof face === 'object') {
    face = face[wasLate? "late" : 'timely'];
    reward = reward[wasLate? "late" : 'timely'];
  }

  return {
    face,
    phase,
    reward
  }
};

const mapDispathToProps = dispatch => {
  return {
    adjustEarnings: (reward) => dispatch(adjustEarnings(reward)),
    startTimeout: (phase) => dispatch(startTimeout(getNextPageAction(phase),1000))
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Face);