import React from 'react';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import StyledButton from '../../utils/components/StyledButton';
import StyledTextInput from '../../utils/components/StyledTextInput';
import HandleCommonErrors from '../../utils/services/handleCommonErrors';
import PostService from '../../services/PostService';
import { IPost } from '../../types';
import PostActions from '../../redux/actions/PostActions';
import { IPostState, RootState } from '../../redux/types';
import { TouchableOpacity, FlatList, Alert } from 'react-native';

const StyledView = styled.View`
  padding: 10px;
  background-color: white;
`;

const StyledFadeView = styled.View`
  background-color: black;
  opacity: 0.2;
  flex: 1;
`;
const StyledModal = styled.Modal`
  background-color: red;
`;

const StyledTitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const StyledTitle = styled.Text`
  font-size: 24px;
  color: gray;
`;

const StyledCharLeftText = styled.Text`
  margin-top: -20px;
  font-size: 14px;
  color: gray;
  text-align: right;
`;

interface Props {
  selectedPost: IPost|null;
  setSelectedPost: (post: IPost|null) => void;
  listRef: FlatList<IPost>|null;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  dispatch: Dispatch;
  postState: IPostState;
  updatePosts: (posts: IPostState) => void;
}

const ComposePost: React.FC<Props> = ({
  openModal, setOpenModal, dispatch, postState, 
  updatePosts, listRef, selectedPost, setSelectedPost
}) => {

  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    if (selectedPost) {
      setContent(selectedPost.content);
    }
  }, [selectedPost]);

  const determineFontSize = () => {
    if (content.length < 120) {
      return 24;
    } else if (content.length > 120 && content.length < 200) {
      return 20;
    } else {
      return 16;
    }
  }

  const addNewPostEntry = async (entry: IPost) => {
    updatePosts({
      generalPosts: {
        ...postState.generalPosts, 
        data: [entry, ...postState.generalPosts.data]
      },
      myPosts: {
        ...postState.myPosts,
        data: [entry, ...postState.myPosts.data]
      }
    });
  }

  const editPostEntry = (entry: IPost) => {
    const generalPostId = postState.generalPosts.data.findIndex(
      p=>p.id === entry.id
    );
    const generalMyPostsId = postState.myPosts.data.findIndex(
      p=>p.id === entry.id
    );
    if (generalPostId > -1 && generalMyPostsId > -1) {
      const generalPosts = [...postState.generalPosts.data];
      const myPosts = [...postState.myPosts.data];
      generalPosts[generalPostId] = {...entry};
      myPosts[generalMyPostsId] = {...entry};
      updatePosts({
        myPosts:{
          ...postState.myPosts,
          data: [...myPosts]
        },
        generalPosts: {
          ...postState.generalPosts, 
          data: [...generalPosts]
        }
      });
    }
  }

  const send = async () => {
    try {
      setLoading(true);
      const result = await PostService.sendPost(content);
      if (result) {
        addNewPostEntry(result);
        setContent('');
        setOpenModal(false);
        listRef?.scrollToIndex({animated: true, index: 0});
      }
    } catch (e) {
      HandleCommonErrors(e, dispatch);
    } finally {
      setLoading(false);
    }
  }

  const edit = async () => {
    if (selectedPost) {
      try {
        setLoading(true);
        const result = await PostService.editPost({
          ...selectedPost, content: content
        });
        if (result) {
          editPostEntry(result);
          setContent('');
          setOpenModal(false);
          setSelectedPost(null);
          Alert.alert('Confirmado', 'Post editado');
        }
      } catch (e) {
        HandleCommonErrors(e, dispatch);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <StyledModal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        if (!loading) {
          setContent('');
          setOpenModal(false);
          setSelectedPost(null);
        }
      }}
    >
      <StyledFadeView></StyledFadeView>
      <StyledView>
        <StyledTitleView>
          <StyledTitle>
            <Icon name="lightbulb-o" size={24} /> 
            {selectedPost ? `Editando post #${selectedPost.id}` : 'Novo post'}
          </StyledTitle>
          <TouchableOpacity onPress={() => {
              if (!loading) {
                setOpenModal(false);
                setSelectedPost(null);
              }
            }}
          >
            <Icon
              color="gray"
              name="remove" 
              size={24} 
            />
          </TouchableOpacity>
        </StyledTitleView>
        <StyledTextInput
          value={content}
          onChangeText={(text: string) => setContent(text)}
          multiline
          fontSize={determineFontSize()}
          maxLength={280}
          editable={!loading}
        />
        <StyledCharLeftText>
          Caracteres sobrando: {280 - content.length}
        </StyledCharLeftText>
        <StyledButton 
          text={loading ? 'Postando...' : 'Enviar'} 
          onPress={() => selectedPost ? edit() : send()} 
          disabled={loading}
        />
      </StyledView>
    </StyledModal>
  )
}

const mapState = (state: RootState) => ({
  postState: state.postState
});

const mapDispatch = (dispatch: Dispatch) => ({
  dispatch,
  updatePosts: 
    (posts: IPostState) => dispatch(PostActions.updatePosts(posts)),
});

export default connect(mapState, mapDispatch)(ComposePost);
