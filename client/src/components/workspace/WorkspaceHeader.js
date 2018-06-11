import React, {Component} from 'react';

//FONT AWESOME
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';

class WorkspaceHeader extends Component {
    render(){
        console.log(this.props)
        return (
            <header className="workspace-header menu">
                <a href={"#/dash"}>
                    <h4><FontAwesomeIcon icon={faHome}/> Back to Dash</h4>
                </a>
                <ul className="menu">
                        <a href={`#/workspace/${this.props.project._id}`}>Home</a>
                        <a href={`#/workspace/${this.props.project._id}/chat`}>Chat</a>
                        <a href={`#/workspace/${this.props.project._id}/tasks`}>Tasks</a>
                        <a href={`#/workspace/${this.props.project._id}/git`}>Git</a>
                    </ul>
                {/* TODO: show or remove this when i figure out what the fuck i wanna do  with it */}
                <div className="settings">
                    {/* <FontAwesomeIcon icon={faCogs}/> */}
                </div>
            </header>
        );
    }
}

export default WorkspaceHeader;