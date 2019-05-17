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

    // loads titles for blog info and sorts in descending order
    case LOAD_POST_TITLES: {
      const { titles } = action.payload;
      return { ...state, titles: titles.sort((a,b) => b.votes - a.votes) };
    }

    // updates post details (title, description, body text)
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

    //deletes title from list of titles of blog post is deleted
    case DELETE_TITLE: {
      const { titleId } = action.payload;
      const newTitles = state.titles.filter(({ id }) => id !== titleId);
      return { ...state, titles: newTitles };
    }
    //deletes post
    case DELETE_POST: {
      const { postId } = action.payload;
      const {[postId]: deleted, ...newSeen} = state.seen;

      return {...state, seen: newSeen };
    }
    // adds a title to list of titles when a new post is created
    case ADD_TITLE: {
      const { title } = action.payload;

      const newTitles = [...state.titles, title].sort( (a,b ) => b.votes - a.votes);

      return {...state, titles: newTitles};
    }
    // adds a new comment in list of comments of a blog post
    case ADD_COMMENT: {
      const { comment, postId } = action.payload;
      const { [postId]: currPost }= state.seen;
      const { comments: currComments }= currPost;

      return { ...state, seen: { ...state.seen, [postId]:{...currPost, comments:[...currComments, comment]} }};
    }
    // deletes a comment from list of comments of a blog post
    case DELETE_COMMENT: {
      const { postId, commentId } = action.payload;
      const { [postId]: currPost }= state.seen;
      const { comments: currComments }= currPost;

      const newComments = currComments.filter(({ id }) => id !== commentId);

      return { ...state, seen: { ...state.seen, [postId]:{...currPost, comments: newComments }} };
    }
    // posts are reordered by votes in descending order
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