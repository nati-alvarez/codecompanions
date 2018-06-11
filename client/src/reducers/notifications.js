export default function reducer(state = {
    notifications: []
}, action){
    switch(action.type){
        case "GET_NOTIFICATIONS_SUCCESS":
            console.log("from reducer", action.payload)
            return {
                ...state,
                notifications: action.payload
            }
        default:
            return state;
    }
}