import {
  LOAD_POST_TITLES,
  LOAD_POST_DETAIL,
  UPDATE_POST,
  ADD_TITLE,
  DELETE_TITLE,
  DELETE_COMMENT,
  ADD_COMMENT,
  UPDATE_VOTES,
  CLEAR_POST
} from "./actionTypes";

const INITIAL_STATE = {
  post: {},
  titles: []
};

function rootReducer(state = INITIAL_STATE, action) {

  switch (action.type) {

    case LOAD_POST_TITLES: {
      const { titles } = action.payload;
      return { ...state, titles };
    }

    case LOAD_POST_DETAIL: {
      const { post } = action.payload;
      return { ...state, post };
    }

    case UPDATE_POST: {
      const { post } = action.payload;
      const { id, title, description } = post;
      const newTitles = state.titles.map( t => {
        return t.id === id ? { id, title, description } : t
      });

      return {
        ...state,
        post,
        titles: newTitles
      }
    }

    case DELETE_TITLE: {
      const { titleId } = action.payload;
      const newTitles = state.titles.filter(({ id }) => id !== titleId);
      return { ...state, titles: newTitles };
    }

    case ADD_TITLE: {
      const { title } = action.payload;
      return {...state, titles: [...state.titles, title]};
    }

    case DELETE_COMMENT: {
      const { commentId } = action.payload;
      const newComments = state.post.comments.filter(({ id }) => id !== commentId);
      return { ...state, post: { ...state.post, comments: newComments } };
    }

    case ADD_COMMENT: {
      const { comment } = action.payload;
      return { ...state, post: { ...state.post, comments: [...state.comments, comment] }};
    }
    //FIXME: need to work on this
    case UPDATE_VOTES: {
      const { postId, delta } = action.payload;

      const newTitles = state.titles
        .map(t => {
          return t.id === postId ? { ...t, votes: t.votes + delta } : t;
        })
        .sort( (a,b) => b.votes - a.votes);

      if (state.post.votes) {
        return {
          ...state,
          post: { ...state.post, votes: state.post.votes + delta },
          titles: newTitles
        }
      }

      return { ...state, titles: newTitles };

    }
    //FIXME: need to work
    case CLEAR_POST: {
      return { ...state, post: {} };
    }

    default: {
      return state;
    }
  }
}

export default rootReducer;