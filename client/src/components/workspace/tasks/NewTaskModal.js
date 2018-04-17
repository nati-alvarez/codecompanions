import React, {Component} from 'react';

class NewTaskModal extends Component {
    constructor(){
        super();
        this.state = {
            taskName: null,
            taskDescription: null,
            taskUsers: []
        }
        this.toggleAssignUser = this.toggleAssignUser.bind(this);
    }
    toggleAssignUser(user){
        if(this.state.taskUsers.indexOf(user._id) >= 0)
            this.setState({...this.state, taskUsers: this.state.taskUsers.filter(taskUser=> {return user._id != taskUser})})
        else
            this.setState({...this.state, taskUsers: this.state.taskUsers.concat(user._id)})
    }
    render(){
        return (
            <div className="new-task-modal modal">
                <div onClick={this.props.closeCreateTaskModal} className="close-btn">X</div>
                <h3>Create A New Task</h3>
                <label>
                    Task Name:
                    <input onKeyUp={(e)=>this.setState({...this.state, taskName: e.target.value.trim()})}type="text" placeholder="Enter a name for the task"/>
                </label>
                <label>
                    Task Description:
                    <textarea onKeyUp={(e)=>this.setState({...this.state, taskDescription: e.target.value.trim()})}placeholder="Enter a description of what needs to be done.">
                    </textarea>
                </label>
                <label>
                    Assign To:
                    <div className="user-select">
                        {this.props.members.map(user=>{
                            return (
                                <div onClick={()=> this.toggleAssignUser(user)} className={(this.state.taskUsers.indexOf(user._id) >= 0)? "user-option active": "user-option"}>
                                    <img src={user.profilePicture} width="35" height="35"/>
                                    <span className="username">{user.username}</span>
                                </div>     
                            )
                        })}
                    </div>
                </label>
                <button onClick={()=> this.props.createTask(this.props.projectId, this.state.taskName, this.state.taskDescription, this.state.taskUsers)} className="button btn-primary-bold">
                    Create Task
                </button>
            </div>
        )
    }
}

export default NewTaskModal;