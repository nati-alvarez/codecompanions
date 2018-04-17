import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {
    getProjectListing,
    applyToProject,
    clearSuccessMessage,
    clearApplicationForm,
    replyToApplication
} from '../../../actions/projectListings';

//STYLES
import '../../../styles/pages/projectlisting.sass';

//COMPONENTS
import Loader from '../../animations/Loader';
import ApplicationForm from './ApplicationForm';
import Application from './Application';
import Paginator from './Paginator';

class ProjectListingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            //gets project listing id from pathname because match not working on nested routes
            listingId: this.props.history.location.pathname.substr(23),
            showApplicationForm: false,
            page: 1 //pagination counter
        }
        this.showApplicationForm = this.showApplicationForm.bind(this);
        this.closeApplicationForm = this.closeApplicationForm.bind(this);
        this.changePage = this.changePage.bind(this);
        this.acceptApplication = this.acceptApplication.bind(this);
        this.declineApplication = this.declineApplication.bind(this);
    }
    showApplicationForm(){
        this.setState({showApplicationForm: true});
    }
    closeApplicationForm(){
        this.setState({showApplicationForm: false});
    }
    acceptApplication(id){
        this.props.replyToApplication(id, true);
    }
    declineApplication(id){
        this.props.replyToApplication(id, false);
    }
    changePage(page){
        this.setState({...this.state, page: page});
        //scroll back up to top of application list
        document.getElementById('applications').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});    
    }
    componentDidMount(){
        this.props.getProjectListing(this.state.listingId);
    }
    componentWillUnmount(){
        this.props.clearApplicationForm()
    }
    render(){
        //determine if user has already applied
        var hasApplied = false;
        if(this.props.project){
            this.props.project.applications.map(app=>{
                if(app.applicant._id == this.props.user._id) hasApplied = true;
            })
        }

        //determines how many applications to show per page
        //TODO: decide whether or not to add to state
        const itemsPerPage = 5;

        return (
            <div className="project-listing-page">
                {this.props.loading &&
                    <div className="text-center">
                        <Loader/>
                        Loading project listing...
                    </div>
                }
                {!this.props.loading && !this.props.project &&
                    <div className="text-center">
                        Project not found.
                    </div>
                }
                {this.props.project &&
                    <div className="project-listing">
                        <h3>{this.props.project.title}</h3>
                        <p className="project-description">{this.props.project.description}</p>
                        <div className="skills">Skills Required: 
                            {this.props.project.skills.map(skill => {
                                return <div className="skill-tag">{skill}</div>;
                            })}
                        </div>
                        <div className="owner subheader">
                            Created By:
                            <a className="profile-link" href={"#/dash/users/" + this.props.project.owner.username}>
                                <img src={this.props.project.owner.profilePicture} width="35" height="35"/> {this.props.project.owner.username}
                            </a>
                        </div>
                        <p className="application-count">
                            {this.props.project.applications.length} people applied to this project
                            
                            {/* shows profile picture of first 5 people who applied */}
                            {this.props.project.applications.map((app, index) => {
                                if(index === 5) return "...";
                                if (index > 5) return;
                                return <img className="profile-picture" width="35" height="35" src={app.applicant.profilePicture}/>
                            })}
                        </p>
                        {/* Show apply button if the user is not the project owner and the user has not yet applied to 
                        the project. If the user has applied, show an 'application submitted' button */}
                        {this.props.project.owner.username !== this.props.user.username && !hasApplied &&
                            <button onClick={this.showApplicationForm} className="button btn-primary-bold">Apply</button>
                        }
                        {hasApplied &&
                            <button className="button">Application Submitted!</button>
                        }
                    </div>
                }
                {this.props.successMessage &&
                    <div className="success-message">
                        {this.props.successMessage}
                    </div>
                }
                {this.props.errorMessage &&
                    <div className="error-message">
                        <span className="exception">throw UserInputError </span>
                        {this.props.errorMessage}
                    </div>
                }
                {this.state.showApplicationForm &&
                    <ApplicationForm 
                    listingId={this.state.listingId} 
                    apply={this.props.applyToProject} 
                    loading={this.props.loading}
                    successMessage={this.props.successMessage}
                    clearSuccessMessage={this.props.clearSuccessMessage}
                    errorMessage={this.props.errorMessage}
                    close={this.closeApplicationForm}/>
                }
                { this.props.project && this.props.project.owner.username === this.props.user.username &&
                    <div id="applications" className="applications">
                        <h4>Applications</h4>
                        {!this.props.project.applications[0] &&
                            "No applications yet."
                        }
                        <Paginator page={this.state.page} project={this.props.project} changePage={this.changePage}/>
                        {this.props.project.applications.map((app, index) => {
                                if(index > (itemsPerPage * this.state.page) - 1) return;
                                if(index < itemsPerPage * (this.state.page - 1)) return;
                                return <Application  acceptApplication={this.acceptApplication} declineApplication={this.declineApplication} app={app}/>;
                        })}
                        <Paginator page={this.state.page} project={this.props.project} changePage={this.changePage}/>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.projectListings.loading,
        successMessage: state.projectListings.successMessage,
        errorMessage: state.projectListings.errorMessage,
        project: state.projectListings.projectViewing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectListing: (id) => dispatch(getProjectListing(id)),
        applyToProject: (id, message) => dispatch(applyToProject(id, message)),
        replyToApplication: (id, accept) => dispatch(replyToApplication(id, accept)),
        clearSuccessMessage: () => dispatch(clearSuccessMessage()),
        clearApplicationForm: () => dispatch({type: "APPLY_PROJECT_CLEAR"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListingPage);