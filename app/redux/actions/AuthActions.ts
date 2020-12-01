import { IUser } from "../../types"
import { IReducerAction } from "../types";
import { AuthActionType } from "./types"

const login = (user: IUser): IReducerAction => ({
  type: AuthActionType.LOGIN,
  payload: user
});

const logout = (): IReducerAction => ({
  type: AuthActionType.LOGOUT,
});

export default {login, logout};
