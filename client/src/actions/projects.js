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

/********************
 * 
 * PROJECT INVITATION ACTIONS
 * 
*********************/
exports.sendProjectInvitation = (project, recipient) => {
    return (dispatch) => {
        dispatch({type: "SEND_PROJECT_INVITATION_START"});
        axios.post(`${API_URL}/projects/project-invitation`, {project, recipient}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            console.log(res.data)
            if(res.data.success)
                return dispatch({type: 'SEND_PROJECT_INVITATION_SUCCESS', payload: res.data.message});
            dispatch({type: 'SEND_PROJECT_INVITATION_ERROR', payload: res.data.message});
        }).catch(err=>{
            console.log(err);
        });
    }
}

/*********************
 * 
 * CHAT CHANNEL ACTIONS
 * 
*********************/
exports.createTextChannel = (projectId, channelName) => {
    return (dispatch) =>{
        dispatch({type: "CREATE_TEXT_CHANNEL_START"});
        axios.post(`${API_URL}/projects/${projectId}/chat`, {projectId, channelName}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            dispatch({type: "CREATE_TEXT_CHANNEL_SUCCESS", payload: res.data.channel});
            console.log(res);
        }).catch(err=>{
            dispatch({type: "CREATE_TEXT_CHANNEL_ERROR"});
            console.log(err);
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

//function to get new channels when they are created
exports.getChannels = (id) => {
    return (dispatch) => {
        axios.get(`${API_URL}/projects/${id}/channels`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res =>{
            console.log("HERE ARE THE NEW CHANNELS");
            console.log(res.data.channels);
            dispatch({type: "WS_NEW_CHANNEL", payload: {channels: res.data.channels}});
        }).catch(err => {
            console.log(err.response);
        });
    }
}

exports.wsNewMessage = (messageBody, author, channelName) => {
    return (dispatch) => {
        dispatch({type: "WS_NEW_MESSAGE", payload: {message: {body: messageBody, author: author}, channelName}});
    }
}

exports.wsNewInactiveMessage = (messageBody, author, channelName) => {
    return (dispatch) => {
        dispatch({type: 'WS_NEW_INACTIVE_MESSAGE', payload: {message: {body: messageBody, author: author}, channelName}});
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
            dispatch({type: 'CREATE_TASK_SUCCESS', payload: res.data.task});
        }).catch(err=>{
            console.log(err);
        })
    }
}

exports.completeTask = (projectId, taskId) =>{
    return (dispatch) => {
        axios.put(`${API_URL}/projects/${projectId}/tasks`, {taskId, projectId}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            console.log('did it')
            dispatch({type: 'COMPLETE_TASK_SUCCESS', payload: res.data.task});
        }).catch(err=>{
            console.log(err);
        });
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