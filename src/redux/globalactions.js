export const NEXT_PHASE = 'global/nextPhase';
export const SET_AB_VARIANT = 'global/setAB';

export const nextPhase = ()=> ({
	type: NEXT_PHASE
});


export const setABVariant = (ab) => ({
	type: SET_AB_VARIANT,
	variant: ab
});