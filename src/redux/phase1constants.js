export const PAGE_RULE = 'RULE';
export const PAGE_BUCKETS = 'BUCKETS';
export const PAGE_CATCH = 'CATCH';
export const PAGE_FEEDBACK = 'FEEDBACK';

export const PAGE_FLOW = [PAGE_RULE, PAGE_CATCH, PAGE_CATCH];

export const PAGE_FLOW_BREAK = state => state.showFeedback && state.pageIndex === 0 ? PAGE_FEEDBACK : null;