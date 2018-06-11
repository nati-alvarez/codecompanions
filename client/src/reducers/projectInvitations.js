export default function reducer(state={
    invitation: null,
    loading: false,
    successMessage: null
}, action){
    switch(action.type){
        case "GET_INVITATION_SUCCESS":
            return {
                ...state,
                invitation: action.payload
            }
        case "ACCEPT_INVITATION_START":
            return {
                ...state,
                loading: true,
                successMessage: null
            }
        case "ACCEPT_INVITATION_SUCCESS":
            return {
                ...state,
                loading: false,
                successMessage: action.payload
            }
        case "CLEAR_INVITATION_DATA":
            return {
                loading: false,
                successMessage: null,
                invitation: null
            }
        default: 
            return state;
    }
}