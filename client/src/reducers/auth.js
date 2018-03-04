export default function reducer(state={
    user: JSON.parse(localStorage.getItem("user")) || null,
    form: {
        loading: false,
        errorMessage: null,
        successMessage: null
    }
}, action){
    switch(action.type){
        case "LOGIN_START":
        case "SIGNUP_START":
        case "RECOVER_EMAIL_START":
            return {...state, form: {...state.form, loading: true, errorMessage: null, successMessage: null}}
        case "LOGIN_SUCCESS":
            document.getElementById("submit-button").disabled = false;
            return {...state, user: action.payload.user, form: {...state.form, loading: false}}
        case "SIGNUP_SUCCESS":
        case "RECOVER_EMAIL_SUCCESS":
            document.getElementById("submit-button").disabled = false;
            return {...state, form: {...state.form, loading: false, errorMessage: null, successMessage: action.payload}}        
        case "LOGIN_ERR":
        case "SIGNUP_ERR":
        case "RECOVER_EMAIL_ERR":
        case "VALIDATION_ERR":
            document.getElementById("submit-button").disabled = false;
            return {...state, form: {...state.form, loading: false, errorMessage: action.payload}}
        case "SWAP_FORM":
            return {...state, form: {...state.form, loading: false, errorMessage: null, successMessage: null}}
        default:
            return state;
    }
}