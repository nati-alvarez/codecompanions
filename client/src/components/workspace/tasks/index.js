import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {createTask} from '../../../actions/projects';

//COMPONENTS
import NewTaskModal from './NewTaskModal';
import Task from './Task';

//STYLES
import '../../../styles/pages/workspacetasks.sass'

class Tasks extends Component {
    constructor(){
        super();
        this.state = {
            showCreateTaskModal: false,
        }
        this.closeCreateTaskModal = this.closeCreateTaskModal.bind(this);
    }
    closeCreateTaskModal(){
        this.setState({...this.state, showCreateTaskModal: false});
    }
    render(){
        return (
            <div className="workspace-tasks content">
                <button onClick={()=>this.setState({...this.state, showCreateTaskModal: true})} className="button btn-primary-bold">
                    + Create A Task
                </button>
                <div className="tasks grid-x grid-margin-x">
                    {this.props.project.tasks.map(task => {
                        return(
                            <Task task={task}/>
                        )
                    })}
                </div>
                {this.state.showCreateTaskModal &&
                    <NewTaskModal closeCreateTaskModal={this.closeCreateTaskModal} projectId={this.props.project._id} createTask={this.props.createTask} members={this.props.project.members}/>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (projectId, taskName, taskDescription, taskUsers) => dispatch(createTask(projectId, taskName, taskDescription, taskUsers))
    }
}
 
export default connect(null, mapDispatchToProps)(Tasks);