import React from 'react';
import styled from 'styled-components/native';
import { IPost, IUser } from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Alert, View } from 'react-native';

const StyledContainer = styled.View`
  background-color: white;
  padding: 20px;
  margin-bottom: 10px;
  elevation: 1;
`;

const StyledPostContent = styled.Text`
  font-size: 18px;
  color: gray;
  font-style: italic;
`;

const StyledSubtext = styled.Text`
  font-size: 12px;
  color: gray;
  text-align: right;
`;

const StyledView = styled.View`
  flex-flow: row;
`;

const StyledSubView = styled.View`
  margin-top: 10px;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonView = styled.View`
  flex-direction: row;
  alignItems: center;
  padding: 2px;
`

interface Props {
  post: IPost;
  authUser: IUser;
  deletePost: (post: IPost) => void;
  editPost: (post: IPost) => void;
}

const PostItem: React.FC<Props> = ({post, authUser, editPost, deletePost}) => {
  return (
    <StyledContainer>
      <StyledView>
        <StyledPostContent>
          <Icon name="quote-left" size={14} color="gray"/>
          {' '+post.content+' '}
          <Icon name="quote-right" size={14} color="gray" />
        </StyledPostContent>
      </StyledView>
      <StyledSubView>
        <View>
          {
            (authUser.id === post.user.id) &&
            <StyledView>
              <TouchableHighlight
                underlayColor="#e3e3e3"
                onPress={() => editPost(post)}
              >
                <StyledButtonView>
                  <Icon name="edit" size={14} color="gray" />
                  <StyledSubtext>Editar</StyledSubtext>
                </StyledButtonView>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#e3e3e3"
                onPress={() => {
                  Alert.alert(
                    "Confirmação",
                    "Deseja realmente apagar esse post?",
                    [
                      {
                        text: "Cancelar",
                        style: "cancel"
                      },
                      { 
                        text: "Confirmar", 
                        onPress: () => deletePost(post)
                      }
                    ],
                    { cancelable: true }
                  );
                }}
              >
                <StyledButtonView>
                  <Icon name="trash" size={14} color="red" />
                  <StyledSubtext>Apagar</StyledSubtext>
                </StyledButtonView>
              </TouchableHighlight>
            </StyledView>
          }
          </View>
          <View style={{flex: 1}}>
            <StyledSubtext numberOfLines={1}>por: {post.user.name}</StyledSubtext>
            <StyledSubtext numberOfLines={1}>em: {post.createdAt}</StyledSubtext>
          </View>
      </StyledSubView>
    </StyledContainer>
  )
}

export default React.memo(PostItem, (prev, next) => {
  return (prev.post.content === next.post.content);
});
