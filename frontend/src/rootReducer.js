import {
  LOAD_POST_TITLES,
  UPDATE_POST,
  ADD_TITLE,
  DELETE_TITLE,
  DELETE_POST,
  DELETE_COMMENT,
  ADD_COMMENT,
  UPDATE_VOTES,
  ADD_TO_SEEN,
} from "./actionTypes";

const INITIAL_STATE = {
  seen: {},
  titles: [],
};

function rootReducer(state = INITIAL_STATE, action) {

  switch (action.type) {

    case LOAD_POST_TITLES: {
      const { titles } = action.payload;
      return { ...state, titles: titles.sort((a,b) => b.votes - a.votes) };
    }

    case UPDATE_POST: {
      const { post } = action.payload;
      const { id, title, description, body } = post;
      const newTitles = state.titles.map( t => {
        return t.id === id ? { id, title, description } : t
      });

      const { [id]: oldPost } = state.seen;
      const updatedPost = {...oldPost, title, description, body};

      return {
        ...state,
        seen:{...state.seen, [id]: updatedPost},
        titles: newTitles
      }
    }

    case DELETE_TITLE: {
      const { titleId } = action.payload;
      const newTitles = state.titles.filter(({ id }) => id !== titleId);
      return { ...state, titles: newTitles };
    }

    case DELETE_POST: {
      const { postId } = action.payload;
      const {[postId]: deleted, ...newSeen} = state.seen;

      return {...state, seen: newSeen };
    }

    case ADD_TITLE: {
      const { title } = action.payload;

      const newTitles = [...state.titles, title].sort( (a,b ) => b.votes - a.votes);

      return {...state, titles: newTitles};
    }

    case ADD_COMMENT: {
      const { comment, postId } = action.payload;
      const { [postId]: currPost }= state.seen;
      const { comments: currComments }= currPost;

      return { ...state, seen: { ...state.seen, [postId]:{...currPost, comments:[...currComments, comment]} }};
    }

    case DELETE_COMMENT: {
      const { postId, commentId } = action.payload;
      const { [postId]: currPost }= state.seen;
      const { comments: currComments }= currPost;

      const newComments = currComments.filter(({ id }) => id !== commentId);

      return { ...state, seen: { ...state.seen, [postId]:{...currPost, comments: newComments }} };
    }

    case UPDATE_VOTES: {
      const { postId, votes } = action.payload;
      const { [postId]: currPost }= state.seen;

      const newTitles = state.titles
        .map(t => {
          return t.id === postId ? { ...t, votes } : t;
        })
        .sort( (a,b) => b.votes - a.votes);

      if (currPost !== undefined) {
        return {
          ...state,
          seen: { ...state.seen, [postId]:{ ...currPost, votes }},
          titles: newTitles
        }
      }

      return { ...state, titles: newTitles };

    }

    case ADD_TO_SEEN: {
      const { post } = action.payload;

      return { ...state, seen: {...state.seen, [post.id]: post} };
    }


    default: {
      return state;
    }
  }
}

export default rootReducer;