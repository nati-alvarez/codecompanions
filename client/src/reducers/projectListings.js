export default function reducer(state = {
    projectViewing: null,
    projects: [],
    loading: false,
    successMessage: null,
    errorMessage: null
}, action){
    switch(action.type){
        case "GET_PROJECT_LISTINGS_SUCCESS":
            return {...state, projects: action.payload, errorMessage: null};
        case "SEARCH_PROJECT_LISTINGS_START":
            return {...state, projects: [], loading: true, errorMessage: null, successMessage: null};
        case "SEARCH_PROJECT_LISTINGS_SUCCESS":
            return {...state, projects: action.payload, loading: false, errorMessage: null};
        case "SEARCH_PROJECT_LISTINGS_ERR":
            return {...state, loading: false, projects: [], errorMessage: action.payload}
        case "GET_PROJECT_LISTING_START":
            return {...state, loading: true};
        case "GET_PROJECT_LISTING_SUCCESS":
            return {...state, projectViewing: action.payload, loading: false};
        case "APPLY_PROJECT_START":
            return {...state, loading: true};
        case "APPLY_PROJECT_ERR":
            return {...state, loading: false, errorMessage: action.payload}
        case "APPLY_PROJECT_SUCCESS":
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                projectViewing: {
                    ...state.projectViewing,
                    applications: state.projectViewing.applications.concat(action.payload.application)
                }
            };
        case "APPLY_PROJECT_SUCCESS_CLEAR":
            return {...state, successMessage: null};
        case "APPLY_PROJECT_CLEAR":
            //clears loading status and success/error message for application form
            return {...state, loading: false, successMessage: null, errorMessage: null};
        case "ACCEPT_APPLICATION_SUCCESS":
            return {
                ...state, 
                projectViewing: {
                    ...state.projectViewing,
                    applications: state.projectViewing.applications.map(app =>{
                        if(app._id === action.payload){
                           return {...app, status: 1}
                        }
                        return app
                    })
                }
            }
        case "DECLINE_APPLICATION_SUCCESS":
            return {
                ...state,
                projectViewing: {
                    ...state.projectViewing,
                    applications: state.projectViewing.applications.filter(app=>{return app._id !== action.payload})
                }
            }
        default:
            return state;
    }
}