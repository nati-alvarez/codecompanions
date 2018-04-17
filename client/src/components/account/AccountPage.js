// TODO: Make this work in a less retarded way

import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {getUser} from '../../actions/user'

//STYLES
import '../../styles/pages/accountpage.sass';

class AccountInfo extends Component {
    componentDidMount(){
        this.props.dispatch(getUser(this.props.match.params.username));
    }
    render(){
        return (
            this.props.user &&
            <section className="account-page">
                <button className="button btn-primary-bold">Message {this.props.user.username}</button>
                <h2 className="">Account Details</h2>
                <div className="account-details grid-x grid-padding-x">
                    <div className="cell medium-8">
                        <p className="grid-x">
                            <div className="cell medium-6">
                                Title: 
                            </div>
                            <div className="cell medium-6">
                                {this.props.user.title || <small className="subheader">No Title.</small>}
                            </div>
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
                            </div>
                        </p>
                        <p className="grid-x">
                            <div className="cell medium-6">
                            Github Username: 
                            </div>
                            <div className="cell medium-6">
                                {this.props.user.github && this.props.user.github.username || <small className="subheader">No Github.</small>}
                            </div>
                        </p>
                        <p className="grid-x">
                            <div className="cell medium-6">
                                Github Page: 
                            </div>
                            <div className="cell medium-6">
                                {this.props.user.github && this.props.user.github.accountPage || <small className="subheader">No Github.</small>}
                            </div>
                        </p>
                        <p className="grid-x">
                            <div className="cell medium-6">
                                Portfolio: 
                            </div>
                            <div className="cell medium-6">
                                {this.props.user.portfolio || <small className="subheader">No Portfolio Link.</small>}
                            </div>
                        </p>
                    </div>
                    <div className="cell medium-4 user-object">
                        <div className="image-container">
                            <img src={this.props.user.profilePicture}/>
                        </div>
                        <h4 className="name">
                            {this.props.user.name} <span className="subheader">@{this.props.user.username}</span>
                        </h4>
                        <p className="email">
                            {this.props.user.email}
                        </p>
                        {this.props.user.bio &&
                            <p className="bio">
                                {this.props.user.bio}
                            </p>
                        }{!this.props.user.bio && 
                            <p className="bio subheader">
                                No bio.
                            </p>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, null)(AccountInfo);