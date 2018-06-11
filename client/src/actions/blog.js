import axios from 'axios';
import {API_URL} from '../env';
import { exportSpecifier } from 'babel-types';

exports.createBlogPost = (data) => {
    return (dispatch) => {
        dispatch({type: "CREATE_POST_START"});
        axios.post(`${API_URL}/blog/posts`, data, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).then(res=>{
            dispatch({type: "CREATE_POST_SUCCESS"});
        }).catch(err=>{
            dispatch({type: "CREATE_POST_ERROR"});
        });
    }
}

exports.getPost = (id) => {
    return (dispatch) => {
        dispatch({type: "GET_POST_START"});
        axios.get(`${API_URL}/blog/posts/${id}`).then(res=>{
            dispatch({type: "GET_POST_SUCCESS", payload: res.data.post})
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.updatePost = (data, id) => {
    return (dispatch) => {
        dispatch({type: "UPDATE_POST_START"});
        axios.post(`${API_URL}/blog/posts/${id}`, data, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).then(res=>{
            dispatch({type: "UPDATE_POST_SUCCESS", payload: res.data.post});
        }).catch(err=>{
            console.log(err);
            dispatch({type: "UPDATE_POST_ERROR", payload: err.response.data.message});
        });
    }
}

exports.deletePost = (id) => {
    return (dispatch) => {
        dispatch({type: "DELETE_POST_START"});
        axios.delete(`${API_URL}/blog/posts/${id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).then(res=>{
            dispatch({type:"DELETE_POST_SUCCESS", payload: id});
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.getAllPosts = () => {
    return (dispatch) => {
        dispatch({type: "GET_ALL_POSTS_START"});
        axios.get(`${API_URL}/blog/posts`).then(res=>{
            dispatch({type: "GET_ALL_POSTS_SUCCESS", payload: res.data.posts});
        }).catch(err=>{
            console.log(err);
        });
    }
}