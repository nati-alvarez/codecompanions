export default function reducer(state={
    user: JSON.parse(localStorage.getItem("user")) || null,
}, action){
    switch(action.type){
        default:
            return state;
    }
}