import {
  LOAD_POST_TITLES,
  LOAD_POST_DETAIL,
  ADD_COMMENT,
  DELETE_COMMENT,
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