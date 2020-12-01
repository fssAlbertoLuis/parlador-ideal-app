import React from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  width: 100%;
  marginVertical: 2px;
`;

const StyledInput = 
  styled.TextInput<{error: string|undefined, fontSize: number|undefined}>`
  font-size: ${props => props.fontSize ? props.fontSize : 20}px;
  border-bottom-width: 2px;
  border-bottom-color: ${({theme, ...props}) => (
    props.error && props.error.length ? 
      theme.colors.danger.default : theme.colors.primary.alternative
  )}
`;

const StyledErrorMsg = styled.Text`
  color: ${({theme}) => theme.colors.danger.default}
  font-size: 14px;
  margin-left: 8px;
`;

interface Props extends TextInputProps {
  fontSize?: number;
  error?: string;
}

const StyledTextInput: React.FC<Props> = ({...props}) => {

  const [errText, setErrText] = React.useState(props.error);

  React.useEffect(() => {
    setErrText(props.error);
  }, [props.error]);

  return (
    <StyledView>
      <StyledInput
        {...props}
        fontSize={props.fontSize}
        error={errText}
        onKeyPress={() => setErrText('')} 
      />
      <StyledErrorMsg>
        {errText ? errText : ''}
      </StyledErrorMsg>
    </StyledView>
  )
};

export default StyledTextInput;
