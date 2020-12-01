import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser, IUserRegistration } from "../types";
import api from "./api";

interface IUserRegisterResponse {
  token: string;
  user: IUser;
}

const registerUser = async (data: IUserRegistration):Promise<IUser> => {
  const response = await api.post<IUserRegisterResponse>('/users', data);
  const token = response.data.token;
  await AsyncStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('Stored token: ', response.data.token);
  return response.data.user;
}

const loginUser = async (email: string, password: string):Promise<IUser> => {
  const data = {email,password};
  const response = await api.post<IUserRegisterResponse>('/login', data);
  const token = response.data.token;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await AsyncStorage.setItem('token', response.data.token);
  return response.data.user;
}

const logoutUser = async ():Promise<boolean> => {
  const response = await api.post<boolean>('/logout');
  await AsyncStorage.removeItem('token');
  return response.data;
}

const authenticateUser = async (token: string): Promise<IUser> => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await api.get<IUser>('/user');
  return response.data;
}

export default {registerUser, loginUser, logoutUser, authenticateUser};
