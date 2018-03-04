import axios from 'axios';
import {API_URL} from '../env';

exports.login = (body) => {
    return (dispatch) => {
        dispatch({type: "LOGIN_START"})
        axios.post(`${API_URL}/auth/login`, body).then(res => {
            localStorage.setItem('token', res.data.token);

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