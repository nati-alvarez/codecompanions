import React, {Component} from 'react';

import '../../styles/pages/workspacehome.sass';

class Home extends Component {
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
                                <div className="member">
                                    <img height="45" width="45" src={member.profilePicture}/>
                                </div>
                            )
                        })}
                    </section>
                </div>
            </div>
        );
    }
}

export default Home;