import { combineReducers } from "redux";
import phase1practice from "./phase1practice";
import phase1 from "./phase1";
import phase2 from "./phase2";
import global from "./global";
import {
	PHASE1_INSTRUCTIONS,
	PHASE1_PRACTICE,
	PHASE1_INTRODUCTION,
	PHASE1,
	PHASE2_INSTRUCIONS,
	PHASE2,
	PHASE3_INSTRUCIONS,
	PHASE3,
	QUESTIONNAIRE
} from '../globalconstants';

export default combineReducers({
	global,
	[PHASE1_PRACTICE]: phase1practice,
	[PHASE1]: phase1,
	[PHASE2]: phase2
});
