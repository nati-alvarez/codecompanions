export default function reducer(state = {
    projects: []
}, action){
    switch(action.type){
        case "GET_PROJECTS_SUCCESS":
            return {projects: action.payload}
        default:
            return state;
    }
}