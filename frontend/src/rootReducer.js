import {
  LOAD_POST_TITLES,
  LOAD_POST_DETAIL,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  UPDATE_COMMENTS
} from "./actionTypes";

const INITIAL_STATE = { post: {},
                        seenPosts: {},
                        titles:[] };

function rootReducer(state = INITIAL_STATE, action) {

  switch (action.type) {

    case LOAD_POST_TITLES: {
      const { titles } = action.payload;
      return {...state, titles};
    }

    case LOAD_POST_DETAIL: {
      const { post } = action.payload;
      return {...state, post};
    }

    case UPDATE_COMMENTS: {
      const { comments } = action.payload;
      
      return { ...state, post: {...state.post, comments} }
    }

    case ADD_POST: {
      const { postId, post } = action.payload;
      const newPost = { ...post, comments: [] };

      return { ...state, posts: { ...state.posts, [postId]: newPost } };
    }

    case DELETE_POST: {
      const { postId } = action.payload;
      const { [postId]: removedValue, ...newPostState } = state.posts

      return { ...state, posts: newPostState }
    }

    case EDIT_POST: {
      const { postId, post } = action.payload;
      const comments = state.posts[postId].comments;
      const newPost = { ...post, comments };

      return { ...state, posts: { ...state.posts, [postId]: newPost } };
    }

    default: {
      return state;
    }
  }
}

export default rootReducer;