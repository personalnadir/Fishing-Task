import React from 'react';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import { connect } from 'react-redux'
import {startTimeout} from './redux/action';
import getTrial, {
  isFeedbackPage,
  getPhase,
  getWasCorrect,
  getEarnings,
  getWasReject,
  getCurrentTrialIndex,
  userInputForLastTrial
} from './redux/selectors';
import { progressThroughCurrentTrial }  from './redux/trialactions';
import KeyPressed from './KeyPressed';
import {PHASE1_PRACTICE, PHASE1, PHASE2, PHASE2_PRACTICE, PHASE3} from './redux/globalconstants';
import {Howl, Howler} from 'howler';

class Catch extends React.Component {
  constructor(props) {
    super(props);
    this.errorSound = new Howl({
      src: ['Error phase 1_edited.wav'],
      loop: false,
    });
    this.successSound = new Howl({
      src: ['Correct phase 1_edited.wav'],
      loop: false,
    });
    this.pleaseRespond = new Howl({
      src: ['Please respond_1_edited.wav'],
      loop: false,
    });
  }

  componentDidMount() {
    if (this.props.pleaseRespondSfx) {
      this.pleaseRespondTimeout = setTimeout(()=> this.pleaseRespond.play(), 2000);
    }

    if (!this.props.timeout) {
      return;
    }
    this.props.startTimeout(this.props.phase, this.props.trialIndex, this.props.timeout);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.pleaseRespondTimeout) {
      clearTimeout(this.pleaseRespondTimeout);
      this.pleaseRespondTimeout = null;
    }

    if (this.props.feedbackSfx) {
      if (this.props.wasWrong) {
        this.errorSound.play();
      } else {
        this.successSound.play();
      }
    }


    if (!this.props.timeout) {
      return;
    }

    if (this.props.isFilled !== prevProps.isFilled) {
      this.props.startTimeout(this.props.phase, this.props.trialIndex, this.props.timeout);
    }
  }

  componentWillUnmount() {
    if (this.pleaseRespondTimeout) {
      clearTimeout(this.pleaseRespondTimeout);
      this.pleaseRespondTimeout = null;
    }
  }

  render() {
    var decoration;
    var alt = "";
    const {isFilled, rule, showText, wasWrong, earnings} = this.props;
    if (isFilled) {
      decoration = "Filled";
    } else {
      decoration = "Outline";
    }

    let isTax;
    if (rule === 'Reject') {
      decoration += " Orange";
    } else if (rule === 'Accept') {
      decoration += " Blue";
    } else if (rule === 'FreeChoice') {
      decoration += " Teal";
    } else {
      isTax = true;
      decoration += " Black";
    }

    const error = showText && wasWrong? "Error" : "Hidden";
    const correct = showText && !wasWrong? "Instruction" : "Hidden";
    const showEarnings = earnings !== undefined;
    const earningsClass = showEarnings? "Instruction" : "Hidden";
    const earningsText = showEarnings? Math.abs(earnings).toFixed(2) : "";
    const earningsSign = showEarnings && earnings < 0? "-" :"";
    const tax = isTax? "Instruction" : "Hidden";
    const keyPressed = this.props.requireKeyboardInput? <KeyPressed />: null;
    const button = this.props.continueButton? <button onClick={() => this.props.nextPage(this.props.phase, this.props.trialIndex)} className="ContinueButton">Continue</button>: null;
    return (
      <div>
        <FullScreenVerticalAlign>
          {keyPressed}
          <span className={tax}>{rule}</span>
          <div id="catchcontainer">
            <span className="ImageVerticalAlignHelper"></span>
            <img
                alt={alt}
                src={this.props.image}
                className="CatchImage"
              />
            <div className={decoration}>
              <div className={error}>Error!</div>
            </div>
          </div>
          <span className = {correct}>Correct!</span>
          <br/ >
          <span className = {earningsClass}>Your total profit: {earningsSign}£{earningsText}</span>
          <div className = "CatchButton">
            {button}
          </div>
        </FullScreenVerticalAlign>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const trial = getTrial(state);
  const trialIndex = getCurrentTrialIndex(state);
  const phase = getPhase(state);
  const isFeedback = isFeedbackPage(state);
  const isPhase1 = phase === PHASE1;
  const wasCorrect = getWasCorrect(state);
  const wasReject = getWasReject(state);

  let feedbackSfx;
  let earnings;
  let timeout;
  let requireKeyboardInput;
  let continueButton;
  let wasWrong = trial.forceMistake === true
  let showText = isFeedback;
  let haveFeedback = true;
  let pleaseRespondSfx;
  switch(phase) {
    case PHASE1_PRACTICE:
      continueButton = trialIndex === 0 && !isFeedback;
      wasWrong = !wasCorrect;
      if (!continueButton) {
        timeout = isFeedback? 1000: 2000;
      }
      break;
    case PHASE1:
      requireKeyboardInput = !isFeedback;
      wasWrong = !wasCorrect;
      pleaseRespondSfx = true;
      if (isFeedback) {
        feedbackSfx = true;
        timeout = 1000;
      }
      break;
    case PHASE2:
      earnings = getEarnings(state);
      pleaseRespondSfx = true;
      requireKeyboardInput = true;
      break;
    case PHASE2_PRACTICE:
      earnings = undefined;
      requireKeyboardInput = true;
      break;
    case PHASE3:
      // haveFeedback = userInputForLastTrial(state);
      showText = false;
      if (isFeedback) {
        timeout = 1000;
      } else {
        timeout = 2000;
      }
      requireKeyboardInput = !isFeedback;
      break;
    default:
      break;
  }

  let rule = trial.rule;
  if (isFeedback) {
    if (wasReject) {
      rule = 'Reject';
    } else {
      rule = 'Accept';
    }
  }

  return {
    image: trial.image,
    isFilled: haveFeedback && isFeedback,
    isFish: trial.type === "Fish",
    showText,
    trialIndex,
    wasWrong,
    requireKeyboardInput,
    rule,
    earnings,
    timeout,
    phase,
    continueButton,
    feedbackSfx,
    pleaseRespondSfx
  }
};

const mapDispathToProps = dispatch => {
  return {
    nextPage: (phase, trialIndex) => dispatch(progressThroughCurrentTrial(phase,trialIndex)),
    startTimeout: (phase, trialIndex, timeout) => dispatch(startTimeout(() => progressThroughCurrentTrial(phase, trialIndex),timeout))
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Catch);