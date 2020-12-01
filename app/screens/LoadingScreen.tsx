import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { Logo } from '../components/login/styles';

const StyledView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSubView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const StyledText = styled.Text`
  color: gray;
  font-size: 18px;
  text-align: center;
`;

const LoadingScreen = () => {
  const theme = useContext(ThemeContext);
  return (
    <StyledView>
      <Logo source={require('../assets/logo.png')} />
      <StyledSubView>
        <ActivityIndicator color={theme.colors.primary.default} size="large"/>
        <StyledText>Carregando informações...</StyledText>
      </StyledSubView>
    </StyledView>
  );
}

export default LoadingScreen;
