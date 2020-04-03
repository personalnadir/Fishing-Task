export const PAGE_FIXATION = 'FIXATION';
export const PAGE_CATCH = 'CATCH';
export const PAGE_FACE = 'FACE';

export const PAGE_FLOW = [PAGE_FIXATION, PAGE_CATCH, PAGE_FACE];

export const AVOIDANCE_REWARDS = {
  correct: 0,
  incorrect : {
    timely: -.10,
    late:-.50
  }
};

export const APPROACH_REWARDS = {
  correct: {
    timely: 0.50,
    late: .10,
  },
  incorrect: 0
};

