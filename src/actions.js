import {
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_POST,
    DELETE_POST,
    EDIT_POST
} from "./actionTypes";

export function addComment(postId, comment) {
    return {
        type: ADD_COMMENT,
        payload: { postId, comment }
    }
}

export function deleteComment(postId, commentId) {
    return {
        type: DELETE_COMMENT,
        payload: { postId, commentId }
    }
}

export function addPost(postId, post) {
    return {
        type: ADD_POST,
        payload: { postId, post }
    }
}

export function deletePost(postId) {
    return {
        type: DELETE_POST,
        payload: { postId }
    }
}

export function editPost(postId, post) {
    return {
        type: EDIT_POST,
        payload: { postId, post }
    }
}