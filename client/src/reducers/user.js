//for now just for holding info of the user
//in the user account page (like when you are viewing another users profile)

export default function reducer(state={
    user: null,
    userSearchResults: [], //for the search results for users autocompleting on project invitation
}, action){
    switch(action.type){
        case "GET_USER_SUCCESS":
            return {...state, user: action.payload}
        case "GET_USERS_SUCCESS":
            return {...state, users: action.payload}
        default: 
            return state;
    }
}