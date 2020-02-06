import {API_URL} from '../env';
import axios from 'axios';

exports.getNotifications = () => {
    return (dispatch) => {
        dispatch({type: "GET_NOTIFICATIONS_START"});
        axios.get(`${API_URL}/notifications`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res=>{
            console.log(res.data.payload);
            //Or operator sets notifications to an empty array if the user has none
            dispatch({type: "GET_NOTIFICATIONS_SUCCESS", payload: res.data.notifications || []});
        }).catch(err=>{
            console.log(err);
        });
    }
}

