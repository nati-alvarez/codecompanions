import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {createTask, completeTask} from '../../../actions/projects';

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
    componentDidUpdate(){
        //closes modal on successful task creationc
        if (this.props.successMessage && this.state.showCreateTaskModal) this.closeCreateTaskModal();
        console.log(this.props.successMessage);
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
                            <Task completeTask={this.props.completeTask} task={task}/>
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

const mapStateToProps = (state) => {
    return {
        loading: state.workspace.loading,
        successMessage: state.workspace.successMessage,
        errorMessage: state.workspace.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (projectId, taskName, taskDescription, taskUsers) => dispatch(createTask(projectId, taskName, taskDescription, taskUsers)),
        completeTask: (projectId, taskId) => dispatch(completeTask(projectId, taskId))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);