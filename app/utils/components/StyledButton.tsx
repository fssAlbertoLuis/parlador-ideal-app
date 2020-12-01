import React, { useContext } from 'react';
import { TouchableHighlightProps } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';

const StyledTouchable = styled.TouchableHighlight`
  marginVertical: 8px;
  padding: 10px;
  background-color: ${({theme, disabled}) => 
    disabled ? 'gray' : theme.colors.primary.default
  };
`;

const StyledText = styled.Text`
  text-align: center;
  color: white;
  font-size: 20px;
`;

interface Props extends TouchableHighlightProps {
  text: string;
}

const StyledButton: React.FC<Props> = ({text, ...props}) => {
  const theme = useContext(ThemeContext);
  return (
    <StyledTouchable 
      underlayColor={theme.colors.primary.alternative} {...props}
    >
      <StyledText>{text}</StyledText>
    </StyledTouchable>
  )
}
export default StyledButton;
