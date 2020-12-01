import { IDataCollection, IPostState, IReducerAction } from "../types";
import { PostActionType } from "./types";

const getGeneralPostList = (posts: IDataCollection): IReducerAction => ({
  type: PostActionType.UPDATE,
  payload: posts
});

const getOwnedPostList = (posts: IDataCollection): IReducerAction => ({
  type: PostActionType.UPDATE_OWNED,
  payload: posts
});

const updatePosts = (postState: IPostState): IReducerAction => ({
  type: PostActionType.UPDATE_ALL,
  payload: postState
});

export default {
  getGeneralPostList, getOwnedPostList, updatePosts
};
