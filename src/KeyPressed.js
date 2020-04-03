import React from 'react';
import { connect } from 'react-redux'
import getTrial, {
  getPhase,
  getTrialRule,
  getCustomCorrectKey,
  getCurrentTrialIndex
} from './redux/selectors';

import {
  getNextPageAction,
  getStoreKeyStrokeAction,
  getStoreKeyReactionTimeAction,
  getHandleKeyStroke
} from './redux/phaseactions';

const keyCodes = {'KeyC': true, 'KeyX': true, 'KeyN': true, 'KeyM': true};
const ruleToKey = {
   "Accept Fish":  'KeyX',
   "Reject Fish":  'KeyC',
   "Reject Crab":  'KeyN',
   "Accept Crab":  'KeyM'
}

const isReject = {
   'KeyX': false,
   'KeyC': true,
   'KeyN': true,
   'KeyM': false
}

export function getKeyCodes() {
  return Object.keys(keyCodes);
}

class KeyPressed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {keyPressed : null};
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.allowKeyPress = false;
  }

  handleKeyEvent(event) {
    if (!this.allowKeyPress) {
      return;
    }
    // We don't want to mess with the browser's shortcuts
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
      return;
    }
    const correct =  this.props.checkCorrect(event.code);

  	let dispatchPressed = false;
    if (this.props.forceKey) {
      dispatchPressed = correct;
    } else {
      dispatchPressed = keyCodes[event.code];
    }

    if (dispatchPressed) {
      const reactionTime = Date.now() - this.mountTime;
      this.props.correctKeyPressed(this.props.phase, this.props.trialIndex, event.code, correct && !this.props.forcedMistake, reactionTime);
      this.props.nextPage(this.props.phase, this.props.trialIndex);
      this.cleanUp();
    }
  }

  cleanUp() {
    this.allowKeyPress = false;
    window.removeEventListener('keydown', this.handleKeyEvent);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEvent);
    this.allowKeyPress = true;
    this.mountTime = Date.now();
  }

  componentWillUnmount() {
    this.cleanUp();
  }

  render() {
    return (
      <div className="Hidden">
        {this.state.keyPressed} and I {this.state.care? 'care' : 'don\'t care'}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const rule = getTrialRule(state);
  const trial = getTrial(state);
  const trialIndex = getCurrentTrialIndex(state);
  const phase = getPhase(state);
  const forcedMistake = trial.forceMistake;

  return {
  	forceKey: trial.forceKey,
    forcedMistake,
    trialIndex,
    checkCorrect: code => {
      const customCorrect = getCustomCorrectKey(state);
      if (customCorrect) {
        return customCorrect === code;
      } else {
        return ruleToKey[rule] === code;
      }
    },
    phase,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    nextPage: (phase, trialIndex) => dispatch(getNextPageAction(phase)(trialIndex)),
    correctKeyPressed: (phase, trialIndex, code, correct, reactionTime) => {
      dispatch(getStoreKeyReactionTimeAction(phase)(code, reactionTime));
      const wasReject = isReject[code];
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