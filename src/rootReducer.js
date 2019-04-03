import {
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_POST,
    DELETE_POST,
    EDIT_POST
} from "./actionTypes"

const INITIAL_STATE = { posts: {} };

function rootReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case ADD_COMMENT:{

            return
        }

        case DELETE_COMMENT: {
            return
        }

        case ADD_POST: {
            const { postId, post } = action.payload;
            const newPost = { ...post, comments: [] };

            return { ...state, posts: { ...this.state.posts, [postId]: newPost } }
        }

        case DELETE_POST: {
            return
        }

        case EDIT_POST:{
            const { postId, }
            const comments = state.posts[action.postId].comments;
            const newPost = { ...postObj, comments };
    
        this.setState({
          posts: { ...this.state.posts, [id]: newPost },
        });
    }

        default:{}
    }
}