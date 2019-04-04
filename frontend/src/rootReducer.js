import {
  LOAD_POST_TITLES,
  LOAD_POST_DETAIL,
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_POST,
  DELETE_POST,
  EDIT_POST
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

    case ADD_COMMENT: {
      const { postId, comment } = action.payload;
      const post = state.posts[postId];

      const newComments = [...post.comments, comment];

      const newPost = { ...post, comments: newComments };

      return { ...state, posts: { ...state.posts, [postId]: newPost } };
    }

    case DELETE_COMMENT: {
      const { postId, commentId } = action.payload;
      const post = state.posts[postId];

      const newComments = post.comments.filter(c => c.id !== commentId);
      const newPost = { ...post, comments: newComments };

      return { ...state, posts: { ...state.posts, [postId]: newPost } };

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