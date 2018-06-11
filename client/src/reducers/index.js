import {combineReducers} from 'redux';

import authReducer from './auth';
import projectListing from './projectListings';
import myProjects from './myProjects';
import processStatus from './processStatus';
import workspace from './workspace';
import keywords from './keywords';
import notifications from './notifications';
import user from './user';
import projectInvitations from './projectInvitations';
import blog from './blog';

export default combineReducers({
    auth: authReducer,
    projectListings: projectListing,
    myProjects: myProjects,
    processStatus: processStatus,
    workspace: workspace,
    keywords: keywords,
    user: user,
    notifications: notifications,
    projectInvitations: projectInvitations,
    blog: blog
});