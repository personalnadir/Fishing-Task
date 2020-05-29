import React from 'react';
import { connect } from 'react-redux'
import getTrial, {
  getPhase,
  getTrialRule,
  getCorrectKeyForTrial,
  getCurrentTrialIndex
} from './redux/selectors';

import {
  getNextPageAction,
  getStoreKeyStrokeAction,
  getStoreKeyReactionTimeAction,
  getHandleKeyStroke
} from './redux/phaseactions';
import {getAcceptColour} from './redux/colourselectors';

import KeyListener from './KeyListener';

const keyCodes = {'KeyC': true, 'KeyX': true, 'KeyN': true, 'KeyM': true};
const ruleToKey = {
  Blue: {
    "Accept Fish": 'KeyX',
    "Reject Fish": 'KeyC',
    "Reject Crab": 'KeyN',
    "Accept Crab": 'KeyM'
  },
  Orange: {
    "Reject Fish": 'KeyX',
    "Accept Fish": 'KeyC',
    "Accept Crab": 'KeyN',
    "Reject Crab": 'KeyM'
  }
};

const isReject = {
  Blue: {
   'KeyX': false,
   'KeyC': true,
   'KeyN': true,
   'KeyM': false
  },
  Orange: {
   'KeyX': true,
   'KeyC': false,
   'KeyN': false,
   'KeyM': true
  }
}

export function getKeyCodes() {
  return Object.keys(keyCodes);
}

class KeyPressed extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }

  handleKeyEvent(code) {
    const correct = this.props.checkCorrect(code);

  	let dispatchPressed = false;
    if (this.props.forceKey) {
      dispatchPressed = correct;
    } else {
      dispatchPressed = keyCodes[code];
    }

    if (dispatchPressed) {
      const reactionTime = Date.now() - this.mountTime;
      this.props.correctKeyPressed(this.props.phase, this.props.trialIndex, this.props.correctColour, code, correct && !this.props.forcedMistake, reactionTime);
      this.props.nextPage(this.props.phase, this.props.trialIndex);
      return true;
    }
  }

  componentDidMount() {
    this.mountTime = Date.now();
  }

  render() {
    return <KeyListener onKeyEvent = {this.handleKeyEvent} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const rule = getTrialRule(state);
  const trial = getTrial(state);
  const trialIndex = getCurrentTrialIndex(state);
  const phase = getPhase(state);
  const forcedMistake = trial.forceMistake;
  const correctColour = getAcceptColour(state);

  return {
  	forceKey: trial.forceKey,
    forcedMistake,
    trialIndex,
    correctColour,
    checkCorrect: code => {
      const correctKey = getCorrectKeyForTrial(state);
      return correctKey === code;
    },
    phase,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    nextPage: (phase, trialIndex) => dispatch(getNextPageAction(phase)(trialIndex)),
    correctKeyPressed: (phase, trialIndex, correctColour, code, correct, reactionTime) => {
      dispatch(getStoreKeyReactionTimeAction(phase)(trialIndex, code, reactionTime));
      const wasReject = isReject[correctColour][code];
     	dispatch(getStoreKeyStrokeAction(phase)(code, correct, wasReject));
      const handleKeyStroke = getHandleKeyStroke(phase);
      if (handleKeyStroke) {
        dispatch(handleKeyStroke(trialIndex));
      }
    }
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(KeyPressed);