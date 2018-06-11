export default function reducer(state={
    post: null,
    posts: [],
    loading: false,
    successMessage: null,
    errorMessage: null,
}, action){
    switch(action.type){
        case "CREATE_POST_START":
        case "UPDATE_POST_START":
            return {...state, loading: true, successMessage: null, errorMessage: null};
        case "CREATE_POST_SUCCESS":
            return {...state, loading: false, successMessage: "Blog post created"}
        case "CREATE_POST_ERROR":
            return {...state, loading: false, errorMessage: "An error occurred"}
        case "GET_ALL_POSTS_SUCCESS":
            return {...state, loading: false, posts: action.payload}
        case "GET_POST_SUCCESS":
            return {...state, post: action.payload}
        case "UPDATE_POST_SUCCESS":
            return {...state, loading: false, successMessage: "Blog post updated", post: action.payload}
        case "UPDATE_POST_ERROR":
            return {...state, loading: false, errorMessage: action.payload}
        case "CLEAR_POST_DATA":
            return {...state, loading: false, errorMessage: null, successMessage: null, post: null}
        case "DELETE_POST_SUCCESS":
            return {...state, posts: state.posts.filter(post=>{
                return post._id !== action.payload
            })}
        default:
            return state;
    }
}