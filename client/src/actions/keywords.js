import {API_URL} from '../env';
import axios from 'axios'

exports.getSkillsList = (keyword) => {
    return (dispatch) => {
        axios.get(`${API_URL}/trendyskills?keyword=${keyword}`).then(function(res){
            if(!keyword) return dispatch({type: 'GET_SKILLS_SUCCESS', payload: []});
            dispatch({type: 'GET_SKILLS_SUCCESS', payload: res.data.skills});
            console.log(res)
        }).catch(err=>{
            dispatch({type: 'GET_SKILLS_ERROR', message: "Error getting suggesstions."})
            console.log(err.response)
        });
    }
}