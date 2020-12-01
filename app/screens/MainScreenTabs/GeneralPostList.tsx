import React from 'react';
import { connect } from 'react-redux';
import { 
  IAuthState, IDataCollection, IPostState, RootState
} from '../../redux/types';
import DefaultView from '../../utils/components/DefaultView';
import UserHeader from '../../components/main/UserHeader';
import { IPost } from '../../types';
import PostItem from '../../components/main/PostItem';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ComposePost from '../../components/main/ComposePost';
import PostButton from '../../components/main/PostButton';
import HandleCommonErrors from '../../utils/services/handleCommonErrors';
import { Dispatch } from 'redux';
import PostService from '../../services/PostService';
import PostActions from '../../redux/actions/PostActions';
import { Alert, FlatList } from 'react-native';
import EmptyList from '../../components/main/EmptyList';

const StyledText = styled.Text`
  font-size: 18px;
  padding: 10px;
  color: ${({theme}) => theme.colors.primary.alternative}
`;

const StyledView = styled.View`
  flex-flow: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
interface Props {
  postState: IPostState;
  authState: IAuthState;
  dispatch: Dispatch;
  updatePosts: (data: IPostState) => void;
}

const GeneralPostList: React.FC<Props> = ({
  postState, authState, dispatch, updatePosts
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<IPost|null>(null);
  const [listRef, setListRef] = React.useState<FlatList<IPost>|null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedPost) {
      setOpenModal(true);
    }
  }, [selectedPost]);

  const dataHasDuplicates = (newPosts: IPost[]): boolean => {
    const ids = postState.generalPosts.data.map(p => p.id);
    let duplicate = false;
    for (let i=0; i < newPosts.length; i++) {
      if (ids.includes(newPosts[i].id)) {
        duplicate = true;
        break;
      }
    }
    return duplicate;
  }

  const getNextPage = async () => {
    const collection = postState.generalPosts;
    if (collection.currentPage < collection.lastPage) {
      try {
        setLoading(true)
        const nextPage = collection.currentPage+1;
        const newData = await PostService.getGeneralPostList(nextPage);
        if (newData && newData.data.length) {
          if (dataHasDuplicates(newData.data)) {
            refreshList();
            listRef?.scrollToIndex({index: 0, animated: true});
          } else {
            const oldData = collection.data;
            oldData.length = collection.perPage * collection.currentPage;
            const nextData: IDataCollection = {
              ...newData,
              data: [...oldData, ...newData.data]
            };
            updatePosts({
              generalPosts: nextData,
              myPosts: postState.myPosts
            });
          }
        }
      } catch (e) {
        HandleCommonErrors(e, dispatch);
      } finally {
        setLoading(false);
      }
    }
  }

  const refreshList = async () => {
    try {
      setLoading(true);
      const data = await PostService.getGeneralPostList();
      updatePosts({
        generalPosts: data,
        myPosts: postState.myPosts
      });
    } catch (e) {
      HandleCommonErrors(e, dispatch);
    } finally {
      setLoading(false);
    }
  }

  const editPost = async (post: IPost) => {
    setSelectedPost(post);
  }

  const deletePost = async (post: IPost) => {
    try {
      const result = await PostService.deletePost(post);
      if (result) {
        const generalIndex = postState.generalPosts.data.findIndex(
          p => p.id === post.id
        );
        const myIndex = postState.myPosts.data.findIndex(
          p => p.id === post.id
        );
        if (generalIndex > -1 && myIndex > -1) {
          postState.generalPosts.data.splice(generalIndex, 1);
          const generalData = [...postState.generalPosts.data];
          postState.myPosts.data.splice(myIndex, 1)
          const myData = [...postState.myPosts.data];
          updatePosts({
            generalPosts: {...postState.generalPosts, data: generalData},
            myPosts: {...postState.myPosts, data: myData}
          });
          Alert.alert('Confirmado', 'Post excluido');
        }
      }
    } catch (e) {
      HandleCommonErrors(e, dispatch);
    }
  }

  const ListItem = ({item}: {item: IPost}) => (
    authState.user ?
    <PostItem 
      post={item} 
      authUser={authState.user}
      editPost={editPost} deletePost={deletePost}
    /> : <></>
  );

  return (
    <DefaultView flex={1}>
      <UserHeader />
      <StyledView>
        <Icon name="lightbulb-o" size={18} color="gray" />
        <StyledText>
          Pensamentos recentes
        </StyledText>
      </StyledView>
      <FlatList ref={ref => setListRef(ref)}      
        contentContainerStyle={{minHeight: '100%'}}
        data={postState.generalPosts.data}
        renderItem={ListItem}
        keyExtractor={(item: IPost) => String(item.id)}
        onEndReached={() => getNextPage()}
        onRefresh={() => refreshList()}
        refreshing={loading}
        ListEmptyComponent={EmptyList}
      />
      <PostButton setOpenModal={setOpenModal} />
      <ComposePost
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        listRef={listRef}
        openModal={openModal} 
        setOpenModal={setOpenModal}
      />
    </DefaultView>
  )
}

const mapState = (state: RootState) => ({
  authState: state.authState,
  postState: state.postState,
});

const mapDispatch = (dispatch: Dispatch) => ({
  dispatch,
  updatePosts: (data: IPostState) => dispatch(PostActions.updatePosts(data)),
});


export default connect(mapState, mapDispatch)(GeneralPostList);
