////TODO: rename form to something more generic like processStatus so that it can be used by forms and verificaton page
//// or put processStatus into it's own reducer

export default function reducer(state={
    user: JSON.parse(localStorage.getItem("user")) || {},
    form: {
        loading: false,
        errorMessage: null,
        successMessage: null
    }
}, action){
    switch(action.type){
        case "LOGIN_START":
        case "SIGNUP_START":
        case "VERIFY_ACCOUNT_START":
        case "RECOVER_EMAIL_START":
        case "RESET_PASSWORD_START":
            return {...state, form: {...state.form, loading: true, errorMessage: null, successMessage: null}}
        case "LOGIN_SUCCESS":
            if(document.getElementById("submit-button")) document.getElementById("submit-button").disabled = false
            return {...state, user: action.payload.user, form: {...state.form, loading: false}}
        case "SIGNUP_SUCCESS":
        case "VERIFY_ACCOUNT_SUCCESS":
        case "RECOVER_EMAIL_SUCCESS":
        case "RESET_PASSWORD_SUCCESS":
            if(document.getElementById("submit-button")) document.getElementById("submit-button").disabled = false
            return {...state, form: {...state.form, loading: false, errorMessage: null, successMessage: action.payload}}        
        case "LOGIN_ERR":
        case "SIGNUP_ERR":
        case "VERIFY_ACCOUNT_ERR":  
        case "RECOVER_EMAIL_ERR":
        case "RESET_PASSWORD_ERR":
        case "VALIDATION_ERR":
            if(document.getElementById("submit-button")) document.getElementById("submit-button").disabled = false;
            return {...state, form: {...state.form, loading: false, successMessage: null, errorMessage: action.payload}}
        case "SWAP_FORM":
            return {...state, form: {...state.form, loading: false, errorMessage: null, successMessage: null}}
        case "UPDATE_USER_SUCCESS":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: {}}
        default:
            return state;
    }
}