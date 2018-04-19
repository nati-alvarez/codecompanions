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
        case "CREATE_TASK_SUCCESS":
            return {
                ...state,
                project: {
                    ...state.project,
                    tasks: state.project.tasks.concat(action.payload)
                }
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
        default: 
            return state;
    }
}