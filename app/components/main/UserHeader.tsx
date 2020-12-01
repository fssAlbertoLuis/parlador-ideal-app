import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ConnectedProps } from 'react-redux';
import styled from 'styled-components/native';
import { Dispatch } from 'redux';
import AuthActions from '../../redux/actions/AuthActions';
import { IPostState, RootState } from '../../redux/types';
import { Alert, TouchableOpacity } from 'react-native';
import AuthService from '../../services/AuthService';
import HandleCommonErrors from '../../utils/services/handleCommonErrors';
import PostActions from '../../redux/actions/PostActions';

const StyledView = styled.View`
  border-top-color: ${({theme}) => theme.colors.primary.alternative};
  border-top-width: 2px;
  background-color: white;
  padding: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 18px;
  color: gray;
  flex: 1;
`;

type Props = PropsFromRedux & {};

const UserHeader: React.FC<Props> = ({
  authState, logout, dispatch, updatePosts
}) => {

  const sendLogout = async () => {
    try {
      const result = await AuthService.logoutUser();
      if (result) {
        logout();
        updatePosts({
          generalPosts: {data: [], perPage: 0, currentPage: 0, lastPage: 0},
          myPosts: {data: [], perPage: 0, currentPage: 0, lastPage: 0}
        });
      }
    } catch (e) {
      HandleCommonErrors(e, dispatch);
    }
  }

  const confirmLogout = () => {
    Alert.alert(
      'Confirmação',
      'Você deseja realmente sair da aplicação?',
      [
        {
          text: "Não",
        },
        { 
          text: "Sim", onPress: () => sendLogout()}
      ],
      )
  }

  return (
    <StyledView>
      <StyledText>Seja bem vindo, {authState.user?.name}!</StyledText>
      <TouchableOpacity onPress={() => confirmLogout()}>
        <Icon 
          name="sign-out" size={24} color="gray" 
        />
      </TouchableOpacity>
    </StyledView>
  );
}

const stateProps = (state: RootState) => ({
  authState: state.authState
});

const dispatchProps = (dispatch: Dispatch) => ({
  dispatch,
  logout: () => dispatch(AuthActions.logout()),
  updatePosts: (posts: IPostState) => dispatch(PostActions.updatePosts(posts))
})

const connector = connect(stateProps, dispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserHeader);

