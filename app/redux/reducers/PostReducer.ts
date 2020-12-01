import { PostActionType } from "../actions/types";
import { IPostState, IReducerAction } from "../types";

const initialState: IPostState = {
  generalPosts: {data: [], perPage: 0, currentPage: 0, lastPage: 0}, 
  myPosts: {data: [], perPage: 0, currentPage: 0, lastPage: 0}
};

export default (state=initialState, action: IReducerAction) => {
  switch (action.type) {
    case PostActionType.UPDATE:
      return {...state, generalPosts: action.payload}
    case PostActionType.UPDATE_OWNED:
      return {...state, myPosts: action.payload}
    case PostActionType.UPDATE_ALL:
      return {...action.payload};
    default:
      return {...state}
  }
}
