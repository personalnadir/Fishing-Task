import React from 'react';
import { connect } from 'react-redux'
import getTrial, {
  getPhase,
  getTrialRule,
  getNextPageAction,
  getStoreKeyStrokeAction,
  getStoreKeyReactionTimeAction,
  getCustomCorrectKey
} from './redux/selectors';
import {PHASE2} from './redux/globalconstants';

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
      if (correct) {
        this.props.nextPage(this.props.phase);
        dispatchPressed = true;
      }
    } else {
      if (keyCodes[event.code]) {
        this.props.nextPage(this.props.phase);
        dispatchPressed = true;
      }
    }

    if (dispatchPressed) {
      const reactionTime = Date.now() - this.mountTime;
      this.props.correctKeyPressed(this.props.phase, event.code, correct, reactionTime);
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
  const phase = getPhase(state);

  return {
  	forceKey: trial.forceKey,
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
    nextPage: (phase) => dispatch(getNextPageAction(phase)()),
    correctKeyPressed: (phase, code, correct, reactionTime) => {
      dispatch(getStoreKeyReactionTimeAction(phase)(code, reactionTime));
      const wasReject = isReject[code];
     	dispatch(getStoreKeyStrokeAction(phase)(code, correct, wasReject));
    }
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(KeyPressed);