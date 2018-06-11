import axios from 'axios';
import {API_URL} from '../env';

exports.getInvitation = (id) => {
    return  (dispatch) => {
        axios.get(`${API_URL}/project-invitations/${id}`).then(res=>{
            dispatch({type: "GET_INVITATION_SUCCESS", payload: res.data.invitation});
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.acceptInvitation = (id) => {
    return (dispatch) => {
        dispatch({type: "ACCEPT_INVITATION_START"});
        axios.post(`${API_URL}/project-invitations/${id}/accept`, {id}, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).then(res=>{
            dispatch({type: "ACCEPT_INVITATION_SUCCESS", payload: res.data.message});
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.declineInvitation = (id) => {
    return (dispatch) => {
        axios.post(`${API_URL}/project-invitations/${id}/decline`, {id}, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }
}