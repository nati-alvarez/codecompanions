import axios from 'axios';
import {API_URL} from '../env';

exports.login = (body) => {
    return (dispatch) => {
        dispatch({type: "LOGIN_START"})
        axios.post(`${API_URL}/auth/login`, body).then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('isLoggedIn', true);

            //delete sensitive info from user object
            delete res.data.user.password;
            delete res.data.user.verificationCode;

            localStorage.setItem('user', JSON.stringify(res.data.user));
            dispatch({type: "LOGIN_SUCCESS", payload: {user: res.data.user}});
        }).catch(err => {
            if(err.response){
                dispatch({type: "LOGIN_ERR", payload: err.response.data.message});
            }
            console.log(JSON.parse(JSON.stringify(err)))
        });
    }
}

exports.signup = (body) => {
    return (dispatch) => {
        dispatch({type: "SIGNUP_START"});
        axios.post(`${API_URL}/auth/signup`, body).then(res => {
            dispatch({type: "SIGNUP_SUCCESS", payload: res.data.message});
        }).catch(err => {
            console.log(JSON.parse(JSON.stringify(err)));
            if(err.response){
                if(err.response.data.err.code === 11000){
                    let regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i;    
                    let match =  err.response.data.err.errmsg.match(regex);
                    let dupField = match[1] || match[2]; 
                    return dispatch({type: "SIGNUP_ERR", payload: `${dupField} is taken.`});
                }
                dispatch({type: "SIGNUP_ERR", payload: err.response.data.message});
            }
        });
    }
}

exports.verifyAccount = (body) => {
    return (dispatch) => {
        dispatch({type: "VERIFY_ACCOUNT_START"});
        axios.post(`${API_URL}/auth/verify`, body).then(res => {
            dispatch({type: "VERIFY_ACCOUNT_SUCCESS", payload: res.data.message});
        }).catch(err => {
            if(err.response){
                dispatch({type: "VERIFY_ACCOUNT_ERR", payload: res.data.message});
            }
        });
    }
}

exports.sendRecoverPasswordEmail = (body) => {
    return (dispatch) => {
        dispatch({type: "RECOVER_EMAIL_START"});
        axios.post(`${API_URL}/auth/send-recover-email`, body).then(res => {
            dispatch({type:"RECOVER_EMAIL_SUCCESS", payload: res.data.message})
        }).catch(err => {
            if(err.response){
                dispatch({type: "RECOVER_EMAIL_ERR", payload: err.response.data.message});
            }
        });
    }
}

exports.resetPassword = (body) => {
    return (dispatch) => {
        dispatch({type: "RESET_PASSWORD_START"});
        axios.post(`${API_URL}/auth/reset-password`, body).then(res => {
            dispatch({type: "RESET_PASSWORD_SUCCESS", payload: res.data.message});
        }).catch(err => {
            if(err.response){
                dispatch({type: "RESET_PASSWORD_ERR", payload: err.response.data.message});
            }
        });
    }
}

//form validation error
exports.formError = (message) => {
    return (dispatch) => {
        dispatch({type: "VALIDATION_ERR", payload: message});
    }
}

//clear form data (error/success message, loding status etc.) when switching between login and signup form
exports.swapForm = () => {
    return (dispatch) => {
        dispatch({type: "SWAP_FORM"});
    }
}

exports.logout = () => {
    return (dispatch) => {
        //remove user object and jwt token from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        dispatch({type: "LOGOUT"});
    }
}