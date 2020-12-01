import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostReducer from "./PostReducer";

const rootReducer = combineReducers({
  authState: AuthReducer,
  postState: PostReducer,
});

export default rootReducer;