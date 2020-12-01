import { IDataCollection } from '../redux/types';
import { IPost } from '../types';
import api from './api';

const getGeneralPostList = async (page=1): Promise<IDataCollection> => {
  const result = await api.get('/posts', {
    params: {page}, 
  });
  return {
    ...result.data, 
    currentPage: result.data.meta.current_page,
    lastPage: result.data.meta.last_page,
    perPage: result.data.meta.per_page,
  };
}

const getOwnedPostList = async (page=1) => {
  const result = await api.get('/posts/me', {
    params: {page}, 
  });
  return {
    data: result.data.data, 
    currentPage: result.data.meta.current_page,
    lastPage: result.data.meta.last_page,
    perPage: result.data.meta.per_page,
  };
}

const sendPost = async (content: string): Promise<IPost> => {
  const result = await api.post('/posts', {content});
  return result.data;
}

const deletePost = async (post: IPost): Promise<boolean> => {
  const result = await api.delete(`/posts/${post.id}`);
  return result.data;
}

const editPost = async (post: IPost): Promise<IPost> => {
  const result = await api.put(`/posts/${post.id}`, {content: post.content});
  return result.data;
}

export default {
  getGeneralPostList, getOwnedPostList, sendPost, deletePost, editPost
};
