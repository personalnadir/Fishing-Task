const DOMAIN = 'instructions';
export const NEXT_PAGE = DOMAIN + '/nextPage';

export const nextPage = () => ({
	type: NEXT_PAGE
});

