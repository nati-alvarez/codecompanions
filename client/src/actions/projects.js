import axios from 'axios';
import {API_URL} from '../env';

exports.getMyProjects = () => {
    return (dispatch) => {
        axios.get(`${API_URL}/projects`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
            dispatch({type: "GET_PROJECTS_SUCCESS", payload: res.data.projects})
            console.log(res);
        }).catch(err => {
            console.log(err.response);
        })
    }
}

exports.getProject = (id) => {
    return (dispatch) => {
        axios.get(`${API_URL}/projects/${id}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res =>{
            dispatch({type: "GET_PROJECT_SUCCESS", payload: res.data.project})
        }).catch(err => {
            console.log(err.response);
        });
    }
}

exports.createProject = (body) => {
    return (dispatch) => {
        dispatch({type: "CREATE_PROJECT_START"});
        axios.post(`${API_URL}/projects`, body, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
            dispatch({type: "CREATE_PROJECT_SUCCESS", payload: res.data.message});
        }).catch(err =>{
            if(err.response){
                dispatch({type: "CREATE_PROJECT_ERR", payload: err.response.data.message})
            }
            console.log(err.reponse);
        })
    }
}

exports.createProjectErr = (errMessage) => {
    return (dispatch) => {
        dispatch({type: "CREATE_PROJECT_ERR", payload: errMessage})
    }
}

exports.clearFormStatus = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_DATA"});
    }
}

/*********************
 * 
 * CHAT CHANNEL ACTIONS
 * 
*********************/
exports.createTextChannel = (projectId, channelName) => {
    return (dispatch) =>{
        axios.post(`${API_URL}/projects/${projectId}/chat`, {projectId, channelName}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        });
    }
}

exports.sendMessage = (projectId, channelName, messageBody) => {
    return (dispatch) =>{
        axios.put(`${API_URL}/projects/${projectId}/chat`, {messageBody, channelName}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            console.log(res);
            dispatch({type:"SEND_MESSAGE_SUCCESS", payload: {message: {id: res.data.message._id, body: messageBody, author: JSON.parse(localStorage.getItem("user"))}, channelName}})
        }).catch(err=>{
            console.log(err);
        });
    }
}

/**********************************
 * 
 * PROJECT TASK FUNCTIONS
 * 
**********************************/

exports.createTask = (projectId, taskName, taskDescription, taskUsers) => {
    return (dispatch) => {
        axios.post(`${API_URL}/projects/${projectId}/tasks`, {taskName, taskDescription, taskUsers}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }
}


/*********************************
 * 
 * PROJECT GIT REPO FUNCTIONS
 * 
*********************************/

exports.getRepoInfo = (gitUser, gitRepo) => {
    return (dispatch) =>{
        //genral repository info
        axios.get(`https://api.github.com/repos/${gitUser}/${gitRepo}`).then(res=>{
            console.log(res);
            dispatch({type: "GET_REPO_INFO_SUCCESS", payload: res.data})
        }).catch(err=>{
            console.log(err);
        });
        //commits
        axios.get(`https://api.github.com/repos/${gitUser}/${gitRepo}/commits`).then(res=>{
            console.log(res);
            dispatch({type: "GET_REPO_COMMITS_SUCCESS", payload: res.data});
        });
        //repository code
        axios.get(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents`).then(res=>{
            console.log(res);
            dispatch({type: "GET_REPO_CONTENTS_SUCCESS", payload: res.data});
        })
    }
}

exports.updateRepoContent = (gitUser, gitRepo, path) => {
    return (dispatch)=>{
        axios.get(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents${path}`).then(res=>{
            console.log(res);
            //if request returns object wrap object in array bc CodeExplorer component expects to render
            //an array of objects
            var pathContent = res.data;
            if(!pathContent[0]) pathContent = [pathContent];
            dispatch({type: "GET_REPO_CONTENTS_SUCCESS", payload: pathContent});
        });
    }
}