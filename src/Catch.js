import React from 'react';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';
import { connect } from 'react-redux'
import {startTimeout} from './redux/action';
import getTrial, {
  isFeedbackPage,
  getNextPageAction,
  getPhase,
  getWasCorrect,
  getEarnings,
  getWasReject
} from './redux/selectors';
import KeyPressed from './KeyPressed';
import {PHASE1, PHASE2} from './redux/globalconstants';

class Catch extends React.Component {

  componentDidMount() {
    if (!this.props.timeout) {
      return;
    }
    this.props.startTimeout(this.props.phase, this.props.timeout);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.timeout) {
      return;
    }
    if (this.props.isFilled !== prevProps.isFilled) {
      this.props.startTimeout(this.props.phase, this.props.timeout);
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
    } else if (rule === 'Free') {
      decoration += 'Teal';
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
    return (
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
      </FullScreenVerticalAlign>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const trial = getTrial(state);
  const phase = getPhase(state);
  const isFeedback = isFeedbackPage(state);
  const isPhase1 = phase === PHASE1;
  const isPhase2 = phase === PHASE2;
  const wasCorrect = getWasCorrect(state);
  const earnings = getEarnings(state);
  const wasReject = getWasReject(state);

  let timeout;
  let requireKeyboardInput;
  switch(phase) {
    case PHASE1:
      if (isFeedback) {
        timeout = 1000;
      }
      requireKeyboardInput = !isFeedback;
      break;
    case PHASE2:
      requireKeyboardInput = true;
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
    isFilled: isFeedback,
    isFish: trial.type === "Fish",
    wasWrong: (isPhase1 && !wasCorrect) || trial.forceMistake === true,
    showText: isFeedback,
    requireKeyboardInput: isPhase1 && !isFeedback || isPhase2,
    rule,
    earnings,
    timeout,
    phase,
  }
};

const mapDispathToProps = dispatch => {
  return {
    nextPage: (phase) => dispatch(getNextPageAction(phase)()),
    startTimeout: (phase, timeout) => dispatch(startTimeout(getNextPageAction(phase),1000))
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Catch);