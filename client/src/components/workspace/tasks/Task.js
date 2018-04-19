import React, {Component} from 'react';

class Task extends Component {
    render(){
        const currentUser = JSON.parse(localStorage.getItem('user'));
        var status;
        var statusClass;
        switch(this.props.task.status){
            case 0:
                status = "Not Completed";
                statusClass = "not-completed";
                break;
            case 1:
                status = "Pending Review";
                statusClass = "pending";
                break;
            case 2:
                status = "Completed";
                statusClass = "completed";
                break;
        }
        return (
            <div className="task cell small-3">
                <h4>{this.props.task.name}</h4>
                <p>{this.props.task.description}</p>
                <small className={statusClass}> Status: {status}</small>
                <div className="assigned-to">
                    Assigned To:
                    {this.props.task.users.map(user=>{
                        return <img width="35" height="35" src={user.profilePicture}/>
                    })}
                </div>
                <br/>
                {this.props.task.users.map(user=>{
                    if(user._id == currentUser._id && this.props.task.status === 0){
                        return <button onClick={()=> this.props.completeTask(this.props.task.project, this.props.task._id)}className="button btn-primary-bold">Mark As Complete</button>
                    }
                })}
            </div>
        )
    }
}

export default Task;