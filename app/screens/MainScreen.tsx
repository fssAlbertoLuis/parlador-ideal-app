import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamsList } from '../routes';
import GeneralPostList from './MainScreenTabs/GeneralPostList';
import MyPostList from './MainScreenTabs/MyPostList';
import { ThemeContext } from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

const Tab = createBottomTabNavigator<RootTabParamsList>();

const StyledTabText = styled.Text`
  font-size: 12px;
  color:gray;
`;

const MainScreen = () => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator 
      initialRouteName="GeneralPostList"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          return <Icon name="list" size={size} color={color} />;
        },
        tabBarLabel: () => {
          if (route.name === 'GeneralPostList') {
            return <StyledTabText>Posts gerais</StyledTabText>
          } else {
            return <StyledTabText>Meus posts</StyledTabText>
          }
        }
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary.default,
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name="GeneralPostList" component={GeneralPostList} />
      <Tab.Screen name="MyPostList" component={MyPostList} />
    </Tab.Navigator>
  );
}


export default MainScreen;
