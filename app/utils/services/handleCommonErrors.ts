import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { Alert } from "react-native";
import { Dispatch } from "redux";
import AuthActions from "../../redux/actions/AuthActions";
import PostActions from "../../redux/actions/PostActions";
import api from "../../services/api";

const HandleCommonErrors = (error: AxiosError, dispatch: Dispatch) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 500:
        Alert.alert('Erro de requisição', 'Erro de requisição, entre em contato com a administração do aplicativo ou tente novamente mais tarde.')
        console.log(error);
        break;
      case 401:
        if (error.response && error.response.data) {
          checkAuthError(error.response.data.message, dispatch);
        }
        break;
      case 404:
        Alert.alert('Conteúdo não encontrado', 'Conteúdo não encontrado ou indisponível. Tente novamente mais tarde.');
        break;
      default:
        console.log('Uncaught error: ', error, error.response.data);
        break;
    }
  } else {
    Alert.alert('Erro de conexão', 'Não foi possível conectar-se com o servidor, verifique sua conexão ou tente novamente.');
    console.log(error);
  }
}

const checkAuthError = async (message: string, dispatch: Dispatch) => {
  if (message === 'Unauthenticated.') {
    try {
      await AsyncStorage.removeItem('token');
      api.defaults.headers.common['Authorization'] = null;
      dispatch(AuthActions.logout());
      dispatch(PostActions.updatePosts({
        generalPosts: {data: [], perPage: 0, currentPage: 0, lastPage: 0},
        myPosts: {data: [], perPage: 0, currentPage: 0, lastPage: 0}
      }));
      Alert.alert('Não autenticado', 'Autenticação expirou, faça login novamente');
    } catch (e) {
      console.log('Errors: ', e);
    }
  }
}
export default HandleCommonErrors;
