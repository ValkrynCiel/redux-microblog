import {
  LOAD_POST_TITLES,
  LOAD_POST_DETAIL,
  UPDATE_COMMENTS
} from "./actionTypes";

const INITIAL_STATE = { post: {},
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

    default: {
      return state;
    }
  }
}

export default rootReducer;