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
import Api from './Api';

/**
 * making api call to get all post titles
 */

export function getPostTitlesFromApi(){
  return async function(dispatch) {
    const titles = await Api.getPostTitles();
    dispatch(gotPostTitles(titles));
  }
}

/**
 * load titles to redux state
 */

function gotPostTitles(titles) {
  return {
    type: LOAD_POST_TITLES,
    payload: { titles }
  }
}

/**
 * making api call to get post details
 */

export function getPostDetailFromApi(postId){
  return async function(dispatch) {
    const post = await Api.getPostDetail(postId);
    dispatch(gotPostDetail(post));
  }
}

/**
 * load post to redux state
 */

function gotPostDetail(post) {
  return {
    type: LOAD_POST_DETAIL,
    payload: { post }
  }
}

/**
 * making api call to add new comments to backend
 * get comments to load to redux state
 */

export function addCommentToApi(postId, text) {
  return async function(dispatch) {
    const comment = await Api.addComment(postId, text);
    dispatch(addComment(comment));
  }
}

function addComment(comment){
  return {
    type: ADD_COMMENT,
    payload: { comment }
  }
}
/**
 * making api call to delete comment from backend
 * get comments to load to redux state
 */

export function deleteCommentFromApi(postId, commentId) {
  return async function(dispatch) {
    await Api.deleteComment(postId, commentId);
    dispatch(deleteComment(commentId));
  }
}

function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    payload: { commentId }
  }
}

/**
 * load comments to redux state
 */



/**
 * making api call to add new posts to backend
 * get posts to load to redux state
 */

export function addPostToApi(post) {
  return async function(dispatch) {
    const { id, title, description, votes } = await Api.addPost(post);
    dispatch(addPostToTitles({ id, title, description, votes }));
  };
}

function addPostToTitles(title) {
  return {
    type: ADD_TITLE,
    payload: { title }
  }
}

/**
 * making api call to delete post from backend
 * get posts to load to redux state
 */

export function deletePostFromApi(postId) {
  return async function(dispatch) {
    await Api.deletePost(postId);
    dispatch(deletePostFromTitles(postId));
  };
}

function deletePostFromTitles (titleId) {
  return {
    type: DELETE_TITLE,
    payload: { titleId }
  }
}

/**
 * making api call to edit post in backend
 * get post to load to redux state
 */

export function editPostInApi(postId, newPost) {
  return async function(dispatch) {
    const updatedPost = await Api.editPost(postId, newPost);
    dispatch(updatePost(updatedPost));
  };
}

function updatePost(post) {
  return {
    type: UPDATE_POST,
    payload: { post }
  }
}

export function updateVoteToApi(postId, delta) {
  return async function(dispatch) {
    const { votes } = await Api.updateVote(postId, delta);
    dispatch(updateVote(postId, votes));
  }
}

function updateVote(postId, votes){
  return {
    type: UPDATE_VOTES,
    payload: { postId, votes }
  }
}

export function clearPostFromState() {
  return {
    type: CLEAR_POST
  }
}