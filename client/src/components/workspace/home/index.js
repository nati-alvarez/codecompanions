import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../../../styles/pages/workspacehome.sass';

//COMPONENTS
import InvitationModal from './InvitationModal';

//ACTIONS
import {getUsers} from '../../../actions/user';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            showInvitationModal: false
        }
        this.closeInvitationModal = this.closeInvitationModal.bind(this);
    }
    componentWillUnmount(){
        this.props.clearProcessData();
    }
    closeInvitationModal(){
        this.setState({...this.state, showInvitationModal: false});
        this.props.clearProcessData();
    }
    render(){
        return (
            <div className="workspace-home">
                <div className="content">
                    <h2>{this.props.project.title}</h2>
                    <p>{this.props.project.description}</p>

                    <section className="owner">
                        <h4>Project Owner</h4>
                        <p>
                            <img width="45" height="45" src={this.props.project.owner.profilePicture}/>
                            <span className="username">@{this.props.project.owner.username} </span>
                            <span className="name subheader">{this.props.project.owner.name}</span>
                        </p>
                    </section>

                    <section className="team">
                        <h4>Team Members</h4>
                        {this.props.project.members.map(member => {
                            return (
                                <div key={member._id} className="member">
                                    <img height="45" width="45" src={member.profilePicture}/>
                                </div>
                            )
                        })}
                        <div>
                            <span onClick={()=>this.setState({...this.state, showInvitationModal: true})} className="open-invitation-modal">+ Send Project Invitation</span>
                        </div>
                        {this.state.showInvitationModal &&
                            <InvitationModal
                            user={this.props.user}
                            clearProcessData={this.props.clearProcessData}
                            successMessage={this.props.successMessage}
                            errorMessage={this.props.errorMessage}
                            loading={this.props.loading}
                            project={this.props.project._id}
                            usersSearchResults={this.props.usersSearchResults}
                            getUsers={this.props.getUsers}
                            closeInvitationModal={this.closeInvitationModal}/>
                        }
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usersSearchResults: state.user.users,
        loading: state.processStatus.loading,
        successMessage: state.processStatus.successMessage,
        errorMessage: state.processStatus.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearProcessData: () => dispatch({type: 'CLEAR_DATA'}),
        getUsers: (username) => dispatch(getUsers(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);