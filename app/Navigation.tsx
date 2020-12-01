import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import { RootStackParamsList } from './routes';
import { ThemeProvider } from 'styled-components';
import Theme from './Theme';
import { IPostState, RootState } from './redux/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './services/AuthService';
import HandleCommonErrors from './utils/services/handleCommonErrors';
import { Dispatch } from 'redux';
import { IUser } from './types';
import AuthActions from './redux/actions/AuthActions';
import PostService from './services/PostService';
import PostActions from './redux/actions/PostActions';
import LoadingScreen from './screens/LoadingScreen';

const Stack = createStackNavigator<RootStackParamsList>();

type Props = PropsFromRedux & {};

const App: React.FC<Props> = ({
  authState, login, updatePosts, dispatch
}) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function checkAuthentication() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const loginResult = await AuthService.authenticateUser(token);
          const generalData = await PostService.getGeneralPostList();
          const myData = await PostService.getOwnedPostList();
          updatePosts({
            generalPosts: generalData,
            myPosts: myData
          });
          login(loginResult);
        }
      } catch (e) {
        HandleCommonErrors(e, dispatch);
      } finally {
        setLoading(false);
      }
    }
  
    if (!authState.loggedIn) {
      checkAuthentication();
    }
  }, []);

  const getInitialRouteName = (): "Login" | "Main" | "Loading" => {
    if (loading) {
      return 'Loading';
    } else {
      if (authState.loggedIn) {
        return 'Main';
      } else {
        return 'Login';
      }
    }
  }
  return (
    <NavigationContainer>
      <ThemeProvider theme={Theme}>
        <Stack.Navigator 
          initialRouteName={getInitialRouteName()}
          screenOptions={{headerShown: false}}
        >
          {
            !authState.loggedIn && !authState.user && !loading ?
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </> :
            !loading ?
            <>
              <Stack.Screen name="Main" component={MainScreen} />
            </> :
              <Stack.Screen name="Loading" component={LoadingScreen} />
          }
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};


const stateProps = (state: RootState) => ({
  authState: state.authState
});

const dispatchProps = (dispatch: Dispatch) => ({
  dispatch,
  login: (user: IUser) => dispatch(AuthActions.login(user)),
  updatePosts: 
    (posts: IPostState) => dispatch(PostActions.updatePosts(posts)),
})

const connector = connect(stateProps, dispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
