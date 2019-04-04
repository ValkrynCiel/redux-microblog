import {
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_POST,
    DELETE_POST,
    EDIT_POST
} from "./actionTypes";

const INITIAL_STATE = { posts: {} };

function rootReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case ADD_COMMENT: {
            const { postId, comment } = action.payload;
            const post = state.posts[postId];

            const newComments = [ ...post.comments, comment ];
        
            const newPost = { ...post, comments: newComments };
        
            return { ...state, posts: { ...state.posts, [postId]: newPost } };
        }

        case DELETE_COMMENT: {
            const { postId, commentId } = action.payload;
            const post = state.posts[postId];

            const newComments = post.comments.filter(c => c.id !== commentId);
            const newPost = { ...post, comments: newComments };
          
            return {...state, posts: { ...state.posts, [postId]: newPost } };

        }

        case ADD_POST: {
            const { postId, post } = action.payload;
            const newPost = { ...post, comments: [] };

            return { ...state, posts: { ...state.posts, [postId]: newPost } };
        }

        case DELETE_POST: {
            const { postId } = action.payload;
            const { [postId]:removedValue, ...newPostState } = state.posts

            return { ...state, posts: newPostState }
        }

        case EDIT_POST:{
            const { postId, post } = action.payload;
            const comments = state.posts[postId].comments;
            const newPost = { ...post, comments };
    
            return { ...state, posts: { ...state.posts, [postId]: newPost } };
    }

        default: {
            return { ...state };
        }
    }
}

export default rootReducer;