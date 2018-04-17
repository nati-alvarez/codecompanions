import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Project extends Component {
    render(){
        return (
            <div className="project cell medium-3">
                <h4>{this.props.project.title}</h4>
                <p>
                    {this.props.project.description.length > 125 &&
                        this.props.project.description.substr(0, 125) + "..."
                    }{this.props.project.description.length <= 125 &&
                        this.props.project.description
                    }
                </p>
                <Link to={`/workspace/${this.props.project._id}`}>
                    <button className="button btn-primary-bold">Open Workspace</button>
                </Link>

                <span className="owner">
                    Created By:&nbsp;
                    <img width="25" height="25" src={this.props.project.owner.profilePicture}/>
                    &nbsp;{this.props.project.owner.username}
                </span>
            </div>
        )
    }
}

export default Project;