import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProjectListing extends Component {
    render(){
        return (
            <div className="project-listing">
                <h4>{this.props.project.title}</h4>
                <p className="description">
                    {this.props.project.description.length > 175 &&
                        this.props.project.description.substr(0, 175) + "..."
                    }{this.props.project.description.length <= 175 &&
                        this.props.project.description
                    }
                </p>
                <Link to={`/dash/projects/project/${this.props.project._id}`}>
                    <button className="button btn-primary-bold">View Project</button>
                </Link>
                <div className="skills">
                    <em>Skills Required:</em>
                    {this.props.project.skills.map(skill => {
                        return <p className="skill-tag">{skill}</p>
                    })}
                </div>
                <a href={`#/dash/users/${this.props.project.owner.username}`}className="user subheader align-middle grid-x grid-padding-x">
                    <img src={this.props.project.owner.profilePicture}/>
                    <p>{this.props.project.owner.username}</p>
                </a>
            </div>
        )
    }
}

export default ProjectListing;