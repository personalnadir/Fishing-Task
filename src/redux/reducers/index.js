import { combineReducers } from "redux";
import phase1practice from "./phase1practice";
import phase2practice from "./phase2practice";
import phase1 from "./phase1";
import phase2 from "./phase2";
import phase3 from "./phase3";
import global from "./global";
import data from "./data";
import instructions from "./instructions";
import questionnaires from "./questionnaires";
import questionnairedata from "./questionnairedata";
import {
	PHASE1_INSTRUCTIONS,
	PHASE1_PRACTICE,
	PHASE1_INTRODUCTION,
	PHASE1,
	PHASE2_INSTRUCIONS,
	PHASE2_PRACTICE,
	PHASE2,
	PHASE3_INSTRUCIONS,
	PHASE3,
	QUESTIONNAIRE
} from '../globalconstants';

export default combineReducers({
	global,
	data,
	questionnairedata,
	[PHASE1_INSTRUCTIONS]: instructions,
	[PHASE1_PRACTICE]: phase1practice,
	[PHASE1]: phase1,
	[PHASE2]: phase2,
	[PHASE2_PRACTICE]: phase2practice,
	[PHASE3]: phase3,
	[QUESTIONNAIRE]: questionnaires
});
