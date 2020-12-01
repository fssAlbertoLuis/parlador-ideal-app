import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components/native';
import RegistrationForm from '../components/register/RegistrationForm';
import AuthActions from '../redux/actions/AuthActions';
import PostActions from '../redux/actions/PostActions';
import { IPostState } from '../redux/types';
import { RootStackParamsList } from '../routes';
import AuthService from '../services/AuthService';
import PostService from '../services/PostService';
import { IUser, IUserRegistration, IUserRegistrationErrors } from '../types';
import DefaultView from '../utils/components/DefaultView';
import HandleCommonErrors from '../utils/services/handleCommonErrors';

const Title = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${({theme}) => theme.colors.primary.alternative};
  padding: 10px;
  border-bottom-color: ${({theme}) => theme.colors.primary.alternative};
  border-bottom-width: 1px;
`;

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, 'Register'>;
  login: (user: IUser) => void;
  dispatch: Dispatch;
  updatePosts: (posts: IPostState) => void;
}

const RegisterScreen: React.FC<Props> = ({
  navigation, login, dispatch, updatePosts
}) => {

  const [registration, setRegistration] = React.useState<IUserRegistration>({
    name: '', email: '', password: '', passwordConfirmation: ''
  });
  const [errors, setErrors] = React.useState<IUserRegistrationErrors>({});
  const [loading, setLoading] = React.useState(false);

  const send = async () => {
    try {
      setErrors({});
      setLoading(true);
      const result = await AuthService.registerUser(registration);
      const generalData = await PostService.getGeneralPostList();
      const myData = await PostService.getOwnedPostList();
      updatePosts({
        generalPosts: generalData,
        myPosts: myData
      });
      login(result);
      setLoading(false);
      navigation.navigate('Main');
    } catch (e) {
      setLoading(false);
      HandleCommonErrors(e, dispatch);
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  return (
    <DefaultView>
      <Title>Parlador oficial - Cadastro</Title>
      <RegistrationForm 
        registration={registration} 
        setRegistration={
          (index, text) => setRegistration({...registration, [index]: text})
        }
        sendRegistration={send}
        loading={loading}
        errors={errors}
      />
    </DefaultView>
  );
}

const mapDispatch = (dispatch: Dispatch) => ({
  dispatch,
  login: (user: IUser) =>  dispatch(AuthActions.login(user)),
  updatePosts: (posts: IPostState) => dispatch(PostActions.updatePosts(posts))
});

export default connect(null, mapDispatch)(RegisterScreen);
