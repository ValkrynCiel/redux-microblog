import {
  LOAD_POST_TITLES,
  LOAD_POST_DETAIL,
  UPDATE_COMMENTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST
} from "./actionTypes";
import Api from './Api';

export function getPostTitlesFromApi(){
  return async function(dispatch) {
    const titles = await Api.getPostTitles();
    dispatch(gotPostTitles(titles));
  }
}

function gotPostTitles(titles) {
  return {
    type: LOAD_POST_TITLES,
    payload: { titles }
  }
}

export function getPostDetailFromApi(postId){
  return async function(dispatch) {
    const post = await Api.getPostDetail(postId);
    dispatch(gotPostDetail(post));
  }
}

function gotPostDetail(post) {
  return {
    type: LOAD_POST_DETAIL,
    payload: { post }
  }
}


export function addCommentToApi(postId, text) {
  return async function(dispatch) {
    await Api.addComment(postId, text);
    const newComments = await Api.getComments(postId);
    dispatch(updateComments(newComments));
  }
}

export function deleteCommentFromApi(postId, commentId) {
  return async function(dispatch) {
    await Api.deleteComment(postId, commentId);
    const newComments = await Api.getComments(postId);
    dispatch(updateComments(newComments));
  }
}

function updateComments(comments) {
  return {
    type: UPDATE_COMMENTS,
    payload: { comments }
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