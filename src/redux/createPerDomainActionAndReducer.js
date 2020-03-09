const createPerDomainActionAndReducer = (actionPostfix, handleStateChanges, createActionPayload) => {
	const createAction = (action) => {
		return createActionPayload(action);
	}

	let actions = {}

	const getActionIdentifier = (domain) => domain + actionPostfix;

	const createReducer = (domain) => {
		const actionIdentifier = getActionIdentifier(domain);
		actions[actionIdentifier] = createAction(actionIdentifier);

		return (state, action) => {
			if (action.type !== actionIdentifier) {
				return state;
			}
			return handleStateChanges(state, action);
		}
	}

	const getAction = (domain) => {
		return actions[getActionIdentifier(domain)];
	}

	return {
		getAction,
		createReducer
	};
};

export default createPerDomainActionAndReducer;

