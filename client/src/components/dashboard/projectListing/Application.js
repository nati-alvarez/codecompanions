import React, {Component} from 'react';

class Application extends Component {
    constructor(){
        super();
        this.state = {
            showAll: false,
        }
    }
    render(){
        console.log(this.props.app)
        return (
            <div className="application">
                <a href={`#/dash/users/${this.props.app.applicant.username}`} className="applicant">
                    <span className="username">@{this.props.app.applicant.username}</span>
                    <span className="subheader"> {this.props.app.applicant.name}</span>
                    <img className="profile-picture" width="35" height="35" src={this.props.app.applicant.profilePicture}/>
                </a>
                <div className="message">
                    <br/>
                    {/* Depending on length of application message, will have a show more/less
                        toggle button after 175 characters. If under 175 chars, just show full 
                        message
                    */}
                    {this.props.app.body.length > 175 &&
                        <div>
                            {this.state.showAll &&
                                <p>
                                    {this.props.app.body}
                                    <div onClick={() => this.setState({showAll: false})} className="show-less">Show Less</div>
                                </p>
                            }
                            {!this.state.showAll &&
                                <p>
                                    {this.props.app.body.substr(0, 175)}
                                    <span onClick={()=> this.setState({showAll: true})} className="show-more">...Show More</span>
                                </p>
                            }
                        </div>
                    }{this.props.app.body.length <= 175 &&
                        <div>
                            <p>{this.props.app.body}</p>
                        </div>
                    }
                </div>
                <div className="applicant-skills">
                    Applicant's skills: 
                    {this.props.app.applicant.skills.map(skill => {
                        return <span className="skill-tag">{skill}</span>
                    })}
                </div>
                <div className="application-actions">
                    {/* show disabled accpeted button if application is already accpeted
                        else show normal accept action button */}
                    {this.props.app.status === 1 &&
                        <button className="button">Accepted</button>
                    }{this.props.app.status === 0 &&
                        <div>
                        <button onClick={()=>this.props.acceptApplication(this.props.app._id)} className="button btn-secondary-bold">Accept</button>
                        <button onClick={()=>this.props.declineApplication(this.props.app._id)} className="button btn-primary-bold">Decline</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Application;