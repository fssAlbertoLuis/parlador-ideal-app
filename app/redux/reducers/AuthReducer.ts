import { AuthActionType } from "../actions/types";
import { IAuthState, IReducerAction } from "../types";

const initialState: IAuthState = {
  loggedIn: false
}

const AuthReducer = (state=initialState, action: IReducerAction) => {
  switch(action.type) {
    case AuthActionType.LOGIN:
      return {...state, loggedIn: true, user: action.payload}
    case AuthActionType.LOGOUT:
      return {...initialState}
    default:
      return {...state}
  }
}

export default AuthReducer;
