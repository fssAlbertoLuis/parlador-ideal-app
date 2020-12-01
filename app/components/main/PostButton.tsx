import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled, { ThemeContext } from 'styled-components/native';

const StyledView = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const StyledTouchable = styled.TouchableOpacity`
  borderWidth: 1px;
  borderColor: rgba(0,0,0,0.2);
  alignItems: center;
  justifyContent: center;
  width: 70px;
  height: 70px;
  backgroundColor: #fff;
  borderRadius: 100px;
  elevation: 10;
`;

interface Props {
  setOpenModal: (open: boolean) => void;
}

const PostButton: React.FC<Props> = ({setOpenModal}) => {

  const theme = useContext(ThemeContext);

  return (
    <StyledView>
      <StyledTouchable onPress={() => setOpenModal(true)}>
        <Icon 
          name="pencil" size={28} color={theme.colors.primary.default} 
        />
      </StyledTouchable>
    </StyledView>
  );
}

export default PostButton;
