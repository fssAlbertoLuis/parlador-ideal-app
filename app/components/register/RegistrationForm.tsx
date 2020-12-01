import React from 'react';
import { View } from 'react-native';
import { IUserRegistration, IUserRegistrationErrors } from '../../types';
import StyledButton from '../../utils/components/StyledButton';
import StyledTextInput from '../../utils/components/StyledTextInput';

interface Props {
  registration: IUserRegistration;
  setRegistration: (index: string, text: string) => void;
  sendRegistration: () => void;
  loading: boolean;
  errors: IUserRegistrationErrors;
}

const RegistrationForm: React.FC<Props> = ({
  registration, setRegistration, sendRegistration, loading, errors,
}) => {
  return (
    <View style={{marginTop: 10}}>
      <StyledTextInput 
        placeholder="Nome de usuário"
        value={registration.name}
        onChangeText={text => setRegistration('name', text)}
        editable={!loading}
        error={errors.name? errors.name[0] : undefined}
      />
      <StyledTextInput 
        placeholder="Email de usuário"
        value={registration.email}
        onChangeText={text => setRegistration('email', text)}
        autoCapitalize="none"
        textContentType ="emailAddress"
        editable={!loading}
        error={errors.email? errors.email[0] : undefined}
      />
      <StyledTextInput 
        placeholder="Senha"
        value={registration.password}
        onChangeText={text => setRegistration('password', text)}
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
        error={errors.password?errors.password[0] : undefined}
      />
      <StyledTextInput 
        placeholder="Confirme a senha"
        value={registration.passwordConfirmation}
        onChangeText={text => setRegistration('passwordConfirmation', text)}
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
        error={errors.password?errors.password[0] : undefined}
      />
      <StyledButton
        text={loading ? 'Enviando...' : 'Cadastrar'}
        onPress={() => sendRegistration()}
        disabled={loading}
      />
    </View>
  )
}

export default RegistrationForm;
