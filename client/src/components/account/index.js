// TODO: Make this work in a less retarded way

import React, {Component} from 'react';
import {connect} from 'react-redux';

//STYLES
import '../../styles/pages/accountpage.sass';

//COMPONENTS
import EditBtn from '../animations/EditBtn';
import EditModal from './EditModal';

//ACTIONS
import {updateUser} from '../../actions/user';
import {getSkillsList} from '../../actions/keywords';

class AccountInfo extends Component {
    constructor(){
        super();
        this.state = {
            showEditModal: false,
            propToEdit: null //defines whats is being edited (e.g. username, portfolio link.)
        }
        this.showEditModal = this.showEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
    }
    showEditModal(propToEdit){
        this.setState({showEditModal: true, propToEdit});
    }
    closeEditModal(){
        this.setState({showEditModal: false, propToEdit: null});
    }
    render(){
        return (
            <section className="account-page">
                <h2 className="">Account Details</h2>
                <div className="account-details grid-x grid-padding-x">
                    <div className="cell medium-8">
                        <p className="grid-x">
                            <div className="cell medium-6">
                                Title: 
                            </div>
                            <div className="cell medium-6">
                                {this.props.user.title || <small className="subheader">No Title.</small>}
                                <EditBtn showEditModal={this.showEditModal} propToEdit="title"/>  
                            </div>
                            <br/>
                            <br/>
                            <small className="help-text">This is your professional title. It basically sums up your expertise</small>
                        </p>
                        <p className="grid-x">
                            <div className="cell medium-6">
                                Skills:
                            </div>
                            <div className="cell medium-6">
                                {this.props.user.skills && this.props.user.skills[0] &&
                                    this.props.user.skills.map(skill=>{
                                        return <span className="skill-tag">{skill}</span>
                                    })
                                }
                                {!this.props.user.skills || !this.props.user.skills[0] &&
                                    <small className='subheader'> No Skills Listed.</small>
                                }
                                <EditBtn showEditModal={this.showEditModal} propToEdit="skills"/>
                            </div>
                        </p>
                        <p className="grid-x">
                            <div className="cell medium-6">
                            Github Username: 
                            </div>
                            <div className="cell medium-6">
                            {this.props.user.github && this.props.user.github.username || <small className="subheader">No Github.</small>}
                                <EditBtn showEditModal={this.showEditModal} propToEdit="githubuser"/>
                            </div>
                        </p>
                        <p className="grid-x">
                            <div className="cell medium-6">
                                Github Page: 
                            </div>
                            <div className="cell medium-6">
                                {this.props.user.github && this.props.user.github.accountPage || <small className="subheader">No Github.</small>}
                                <EditBtn showEditModal={this.showEditModal} propToEdit="githubpage"/>
                            </div>
                        </p>
                        <p className="grid-x">
                            <div className="cell medium-6">
                                Portfolio: 
                            </div>
                            <div className="cell medium-6">
                                {this.props.user.portfolio || <small className="subheader">No Portfolio Link.</small>}
                                <EditBtn showEditModal={this.showEditModal} propToEdit="portfolio"/>
                            </div>
                        </p>
                    </div>
                    <div className="cell medium-4 user-object">
                        <div className="image-container">
                            <EditBtn showEditModal={this.showEditModal} propToEdit="profilePicture"/>
                            <img src={this.props.user.profilePicture}/>
                        </div>
                        <h4 className="name">
                            {this.props.user.name} <span className="subheader">@{this.props.user.username}</span>
                            <EditBtn showEditModal={this.showEditModal} propToEdit="name"/>
                        </h4>
                        <p className="email">
                            {this.props.user.email}
                            <EditBtn showEditModal={this.showEditModal} propToEdit="email"/>
                        </p>
                        {this.props.user.bio &&
                            <p className="bio">
                                {this.props.user.bio}
                                <EditBtn showEditModal={this.showEditModal} propToEdit="bio"/>
                            </p>
                        }{!this.props.user.bio && 
                            <p className="bio subheader">
                                No bio.
                                <EditBtn showEditModal={this.showEditModal} propToEdit="bio"/>
                            </p>
                        }
                    </div>
                </div>

                {/* modal that will appear when editing account details */}
                {this.state.showEditModal &&
                    <EditModal 
                    getSkillsList={this.props.getSkillsList}
                    skills={this.props.skills}
                    updateUser={this.props.updateUser}
                    closeEditModal={this.closeEditModal} 
                    propToEdit={this.state.propToEdit} 
                    user={this.props.user}
                    />
                }
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user, body) => dispatch(updateUser(user, body)),
        getSkillsList: (keyword) => dispatch(getSkillsList(keyword))
    }
}

const mapStateToProps = (state) => {
    return {
        skills: state.keywords.skills
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);