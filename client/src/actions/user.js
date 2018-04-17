import axios from 'axios';
import {API_URL} from '../env';

exports.getUser = (username) => {
    return (dispatch) => {
        axios.get(`${API_URL}/users/${username}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res =>{
            dispatch({type: "GET_USER_SUCCESS", payload: res.data.user});
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.updateUser = (user, body) => {
    return (dispatch) => {
        axios.put(`${API_URL}/users/${user}`, body, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            let user = res.data.user
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({type: "UPDATE_USER_SUCCESS", payload: user});
            console.log(res);
        }).catch(err => {
            console.log(err)
        }); 
    }
}