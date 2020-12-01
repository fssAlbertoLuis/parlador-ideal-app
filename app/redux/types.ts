import { IPost, IUser } from "../types";
import rootReducer from "./reducers";

export interface IAuthState {
  loggedIn: boolean;
  user?: IUser
}

export interface IPostState {
  generalPosts: IDataCollection;
  myPosts: IDataCollection;
}

export interface IDataCollection {
  perPage: number;
  currentPage: number;
  lastPage: number;
  data: IPost[];
}

export interface IReducerAction {
  type: string;
  payload?: any;
}

export type RootState = ReturnType<typeof rootReducer>;
