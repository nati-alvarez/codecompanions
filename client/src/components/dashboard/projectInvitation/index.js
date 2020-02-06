import React, {Component} from 'react';
import {connect} from 'react-redux';

//STYLES
import '../../../styles/pages/projectInvitation.sass';

//ACTIONS
import {getInvitation, acceptInvitation, declineInvitation} from '../../../actions/projectInvitations';

//COMPONENTS
import Loader from '../../animations/Loader';

var invitationId;

class ProjectInvitation extends Component {
    componentDidMount(){
        invitationId = this.props.history.location.pathname.substr(this.props.history.location.pathname.length -24);
        console.log(invitationId);
        this.props.getInvitation(invitationId);
    }
    componentWillUnmount(){
        this.props.clearInvitationData();
    }
    render(){
        var invitation = this.props.invitation;
        console.log(invitation)
        if(!this.props.invitation)
            return "Invitation not found"
        if(this.props.invitation){
            if(this.props.invitation.status !== 0)
                return "Invitation not found"
        }
        return (
            <div>
                {invitation &&
                    <div className="invitation">
                        <h4>
                            <img className="profile-picture" width="45" height="45" src={invitation.project.owner.profilePicture}/> {invitation.project.owner.username} Invited you To a Project
                        </h4>
                        <h2 className="title">{invitation.project.title}</h2>
                        <small className="help-text creation-date">Created on {new Date(invitation.project.createdAt).toLocaleDateString()}</small>
                        <p className="description">{invitation.project.description}</p>
                        <div className="members">
                            <h4>Project Members</h4>
                            {invitation.project.members.map(member=>{
                                return <img className="profile-picture" width="35" height="35" src={member.profilePicture}/>
                            })}
                        </div>
                        {!this.props.loading && !this.props.successMessage &&
                            <div className="actions">
                                <button onClick={() => this.props.acceptInvitation(invitationId)} className="button btn-secondary-bold">Accept</button>
                                <button onClick={() => this.props.declineInvitation(invitationId)}className="button btn-primary-bold">Decline</button>
                            </div>
                        }
                        {this.props.loading && 
                            <div className="invitation-status">
                                <Loader/>
                                "Accepting invitation..."
                            </div>
                        }
                        {this.props.successMessage &&
                            <div className="success-message">
                                {this.props.successMessage}
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptInvitation: (id) => dispatch(acceptInvitation(id)),
        getInvitation: (id) => dispatch(getInvitation(id)),
        declineInvitation: (id) => dispatch(declineInvitation(id)),
        clearInvitationData: () => dispatch({type: "CLEAR_INVITATION_DATA"})
    }
}

const mapStateToProps = (state) => {
    return {
        invitation: state.projectInvitations.invitation,
        loading: state.projectInvitations.loading,
        successMessage: state.projectInvitations.successMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInvitation);