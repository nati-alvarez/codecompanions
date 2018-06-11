export default function reducer(state = {
    loading: false,
    successMessage: null,
    errorMessage: null,
    project: null,
    gitRepo: null,
    gitCommits: null,
    gitContents: null
}, action){
    switch(action.type){
        case "GET_PROJECT_START":
            return {...state, loading: true, errorMessage: null, project: null};
        case "GET_PROJECT_SUCCESS":
            return {...state, loading: false, errorMessage: null, project: action.payload};
        case "SEND_MESSAGE_SUCCESS":
        case "WS_NEW_MESSAGE":
            console.log(action.payload);
            return {
                ...state,
                project: {
                    ...state.project,
                    channels: state.project.channels.map(channel=>{
                        if(channel.name === action.payload.channelName){
                            return {
                                ...channel,
                                messages: channel.messages.concat(action.payload.message)
                            }
                        }else {
                            return channel;
                        }
                    })
                }
            }
        case 'CREATE_TEXT_CHANNEL_START':
            return {
                ...state,
                loading: true,
                errorMessage: null,
                successMessage: null
            }
        case 'CREATE_TEXT_CHANNEL_SUCCESS':
            return {
                ...state,
                loading: false,
                successMessage: "Text channel created",
                project: {
                    ...state.project,
                    channels: state.project.channels.concat(action.payload)
                }
            }
        case 'CREATE_TEXT_CHANNEL_ERROR':
            return {
                ...state,
                loading: false,
                errorMessage: "Error creating text channel"
            }
        case "GET_REPO_INFO_SUCCESS":
            return {
                ...state,
                gitRepo: action.payload
            }
        case "GET_REPO_COMMITS_SUCCESS":
            return {
                ...state,
                gitCommits: action.payload
            }
        case "GET_REPO_CONTENTS_SUCCESS":
            return {
                ...state,
                gitContents: action.payload
            }
        case "CREATE_TASK_START":
            return {
                ...state, 
                loading: true,
                errorMessage: null,
                successMessage: null
            }
        case "CREATE_TASK_ERROR":
            return {
                ...state, 
                loading: false,
                errorMessage: action.payload,
            }
        case "CREATE_TASK_SUCCESS":
            return {
                ...state,
                project: {
                    ...state.project,
                    tasks: state.project.tasks.concat(action.payload)
                },
                loading: false, 
                successMessage: "Task Created",
                errorMessage: null
            }
        case "COMPLETE_TASK_SUCCESS":
            return {
                ...state,
                project: {
                    ...state.project,
                    tasks: state.project.tasks.map(task=>{
                        if(task._id === action.payload._id)
                            return action.payload;
                        return task;
                    })
                }
            }  
        case "CLEAR_STATUS_DATA": //clears loading, success/error message status data
            return {
                ...state,
                loading: false, 
                successMessage: null,
                errorMessage: null
            }
        default: 
            return state;
    }
}