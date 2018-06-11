import axios from 'axios';
import {API_URL} from '../env';

//TODO:
//the reducers are a giant monolithic fucking mess fix it
//find ways to split them into smaller more manageable reducers
//error handling is also pretty much non-existent fix that too


//gets list of existing users for project invtation suggestions
exports.getUsers = (username) => {
    return (dispatch) => {
        axios.post(`${API_URL}/users`, {username}, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res =>{
            dispatch({type: 'GET_USERS_SUCCESS', payload: res.data.users});
        }).catch(err=>{
            console.log(err);
        });
    }
}

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
        }).catch(err => {
            console.log(err)
        }); 
    }
}