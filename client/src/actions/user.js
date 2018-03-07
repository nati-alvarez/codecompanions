import axios from 'axios';
import {API_URL} from '../env';

exports.updateUser = (user, body) => {
    return (dispatch) => {
        console.log(body)
        axios.put(`${API_URL}/users/${user}`, body, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            let user = res.data.user
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({type: "UPDATE_USER_SUCCESS", payload: user});
            console.log(res);
        }).catch(err => {
            console.log(err)
        }); 
    }
}