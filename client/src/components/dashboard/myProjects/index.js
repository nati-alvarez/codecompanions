import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//ACTIONS
import {getMyProjects} from '../../../actions/projects';

//COMPONENTS
import Project from './Project';

//STYLES
import '../../../styles/pages/myprojects.sass';

class MyProjects extends Component {
    componentDidMount(){
        this.props.getMyProjects();
    }
    render(){
        console.log(this.props);
        return (
            <section className="my-projects-page">
                <Link to="/dash/projects/new">
                    <button className="button btn-primary-bold"> + New Project</button>
                </Link>
                <h3>My Projects</h3>
                {!this.props.projects[0] &&
                    <div className="my-projects">
                        <p>No projects found. Why not <Link to="/dash/projects/new">create one</Link> or <Link to="/dash/projects">find one to join?</Link></p>
                    </div>
                }
                {this.props.projects[0] &&
                    <div className="projects grid-x grid-margin-x">
                        {this.props.projects.map(project => {
                            return <Project project={project}/>;
                        })}
                    </div>
                }
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.myProjects.projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyProjects: () => dispatch(getMyProjects()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects);