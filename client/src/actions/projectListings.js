import axios from 'axios';
import {API_URL} from '../env';

exports.getProjectListings = (recommended) =>{
    return (dispatch) => {
        axios.get(`${API_URL}/project-listings?recommended=${recommended}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
            dispatch({type: "GET_PROJECT_LISTINGS_SUCCESS", payload: res.data.projectListings});
            console.log(res);
        }).catch(err => {
            dispatch({type: "GET_PROJECT_LISTINGS_ERR", payload: "Error getting project listings."})
            console.log(err.response);
        });     
    }
}

exports.searchProjectListings = (query) => {
    return (dispatch) => {
        dispatch({type: "SEARCH_PROJECT_LISTINGS_START"})
        axios.post(`${API_URL}/project-listings/search`, query, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
            dispatch({type: "SEARCH_PROJECT_LISTINGS_SUCCESS", payload: res.data.projectListings});
        }).catch(err => {
            dispatch({type: "SEARCH_PROJECT_LISTINGS_ERR", payload: err.response.data.message});
        }); 
    }
}

exports.getProjectListing = (id) => {
    return (dispatch) => {
        dispatch({type: "GET_PROJECT_LISTING_START"});
        axios.get(`${API_URL}/project-listings/${id}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
            dispatch({type: "GET_PROJECT_LISTING_SUCCESS", payload: res.data.projectListing})
            console.log(res);
        }).catch(err => {
            if(err.response){
                dispatch({type: "GET_PROJECT_LISTING_ERR", payload: err.response.message});
                console.log(err.response);
            }
            console.log(err);
        });
    }
}

exports.applyToProject = (id, message) => {
    return (dispatch) => {
        dispatch({type: "APPLY_PROJECT_START"});
        axios.post(`${API_URL}/project-listings/${id}/apply`, {message}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
            dispatch({type: "APPLY_PROJECT_SUCCESS", payload: {message: res.data.message, application: res.data.newApplication}});
        }).catch(err => {
            if(err.response){
                dispatch({type: "APPLY_PROJECT_ERR", payload: err.response.data.message});
            }
            console.log(err.response);
        });
    }
}

exports.replyToApplication = (id, accept) => {
    return (dispatch) => {
        dispatch({type: "REPLY_APPLICATION_START"});
        axios.post(`${API_URL}/applications/${id}`, {accept}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            console.log(res);
            if(accept === false) return dispatch({type: "DECLINE_APPLICATION_SUCCESS", payload: id});
            dispatch({type: "ACCEPT_APPLICATION_SUCCESS", payload: id});
        }).catch(err => {
            if(accept === false) return dispatch({type: "DECLINE_APPLICATION_ERROR"});
            dispatch({type: "ACCEPT_APPLICATION_ERROR"});
            console.log(err);
            console.log(err.data);
        });
    }
}

//clears message after successful application submission
//will be called after a timeout
exports.clearSuccessMessage = () => {
    return (dispatch) => {
        setTimeout(()=>{
            dispatch({type: "APPLY_PROJECT_SUCCESS_CLEAR"});
        }, 3000);
    }
}