import React from 'react';
import {connect} from 'react-redux';
import { Alert } from 'react-native';
import CenteredView from '../utils/components/CenteredView';
import StyledButton from '../utils/components/StyledButton';
import StyledTextInput from '../utils/components/StyledTextInput';
import {Logo, Title, RegisterText} from '../components/login/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../routes';
import DefaultView from '../utils/components/DefaultView';
import HandleCommonErrors from '../utils/services/handleCommonErrors';
import AuthService from '../services/AuthService';
import { Dispatch } from 'redux';
import { IUser } from '../types';
import AuthActions from '../redux/actions/AuthActions';
import PostService from '../services/PostService';
import PostActions from '../redux/actions/PostActions';
import { IPostState } from '../redux/types';

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, 'Login'>;
  login: (user: IUser) => void;
  dispatch: Dispatch,
  updatePosts: (posts: IPostState) => void;
}

const LoginScreen: React.FC<Props> = ({
  navigation, login, dispatch, updatePosts,
}) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const send = async () => {
    try {
      setLoading(true);
      const loginResult = await AuthService.loginUser(email, password);
      const generalData = await PostService.getGeneralPostList();
      const myData = await PostService.getOwnedPostList();
      updatePosts({
        generalPosts: generalData,
        myPosts: myData
      });
      login(loginResult);
    } catch (e) {
      HandleCommonErrors(e, dispatch);
      if (e && e.response && [422, 401].includes(e.response.status)) {
        Alert.alert('Erro de autenticação', 'Login ou senha inválidos');
      }
      setLoading(false);
    }
  }

  return (
    <CenteredView>
      <Logo source={require('../assets/logo.png')} />
      <Title>Parlador Ideal - Login</Title>
      <DefaultView>
        <StyledTextInput 
          placeholder="Email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          autoCapitalize="none"
          editable={!loading}
        />
        <StyledTextInput 
          placeholder="Senha" value={password}
          onChangeText={(text: string) => setPassword(text)}
          secureTextEntry
          autoCapitalize="none"
          editable={!loading}
        />
        <StyledButton
          text="Acessar"
          onPress={() => send()}
          disabled={loading}
        />
        <RegisterText 
          onPress={() => navigation.navigate('Register')}
        >Ou cadastre-se
        </RegisterText>
      </DefaultView>
    </CenteredView>
  );
}

const dispatchProps = (dispatch: Dispatch) => ({
  dispatch,
  login: (user: IUser) => dispatch(AuthActions.login(user)),
  updatePosts: 
    (posts: IPostState) => dispatch(PostActions.updatePosts(posts)),
})

export default connect(null, dispatchProps)(LoginScreen);
