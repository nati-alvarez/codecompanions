//This reducer is will be used to decide when to show loading animations with the loading prop
//and also store success messages and error messages whenever a user performs an action such
//as submitting a form or loading data from the server


export default function reducer(state={
    loading: false,
    errorMessage: null,
    successMessage: null
}, action){
    var submitButton = document.getElementById('submit-button');
    switch(action.type){
        case "CREATE_PROJECT_START":
            return {loading: true, errorMessage: null, successMessage: null};
        case "CREATE_PROJECT_SUCCESS":
            if(submitButton) submitButton.disabled = false;
            return {loading: false, errorMessage: null, successMessage: action.payload};
        case "CREATE_PROJECT_ERR":
        case "PROCCESS_ERR":
            if(submitButton) submitButton.disabled = false;
            return {loading: false, successMessage: null, errorMessage: action.payload};
        case "CLEAR_DATA":
            return {loading: false, successMessage: null, errorMessage: null};
        default:
            return state;
    }
}