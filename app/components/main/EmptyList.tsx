import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyList = () => (
  <StyledView>
    <Text style={{color: 'gray'}}>Nenhuma postagem encontrada</Text>
  </StyledView>
);

export default EmptyList;
