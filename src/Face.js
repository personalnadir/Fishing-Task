import React from 'react';
import { connect } from 'react-redux'
import mildNegativeFace from './images/faces/mild_negative_face.png';
import mildPositiveFace from './images/faces/mild_positive_face.png';
import strongNegativeFace from './images/faces/strong_negative_face.png';
import strongPositiveFace from './images/faces/strong_positive_face.png';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import getTrial, {getPhase, getWasCorrect, getWasLate, getReward, getCurrentTrialIndex} from './redux/selectors';
import { progressThroughCurrentTrial }  from './redux/trialactions';
import {startTimeout} from './redux/action';
import {Howl, Howler} from 'howler';

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

class Face extends React.Component {
  constructor(props) {
    super(props);
    this.errorSound = new Howl({
      src: ['Error phase 1_edited.wav'],
      loop: false
    });
    this.successSound = new Howl({
      src: ['Correct phase 1_edited.wav'],
      loop: false
    });

  }

  componentDidMount() {
    if (this.props.wasCorrect) {
      this.successSound.play();
    } else {
      this.errorSound.play();
    }

    this.props.startTimeout(this.props.phase, this.props.trialIndex);
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
  const trialIndex = getCurrentTrialIndex(state);
  const phase = getPhase(state);
  const wasCorrect = getWasCorrect(state);
  const wasLate = getWasLate(state);
  const reward = getReward(state);
  const faceLookUp = trial.rule === 'Tax' ? avoidanceFaces: approachFaces;
  let face;

  if (wasCorrect) {
    face = faceLookUp['correct'];
  } else {
    face = faceLookUp['incorrect'];
  }

  if (typeof face === 'object') {
    face = face[wasLate? "late" : 'timely'];
  }

  return {
    face,
    phase,
    reward,
    trialIndex,
    wasCorrect
  }
};

const mapDispathToProps = dispatch => {
  return {
    startTimeout: (phase, trialIndex) => dispatch(startTimeout(() =>progressThroughCurrentTrial(phase,trialIndex),1000))
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Face);