import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { roleReducer } from "./role";

const allReducers = combineReducers({
    loginReducer,
    roleReducer
});

export type RootState = ReturnType<typeof allReducers>;

export default allReducers;