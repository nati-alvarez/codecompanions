export default function reducer(state = {
    skills: []
}, action){
    switch(action.type){
        case "GET_SKILLS_SUCCESS":
            return {...state, skills: action.payload};
        default:
            return state;
    }
}