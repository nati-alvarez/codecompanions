import React, {Component} from 'react';
import {connect} from 'react-redux';

//SOCKET IO
import io from 'socket.io-client';

//COMPONENTS
import UsersList from './UsersList';
import Loader from '../../animations/Loader';

//ACTIONS
import {sendProjectInvitation} from '../../../actions/projects';

//var to store timeout for users suggestion auto-complete
var suggestionTimeout;

class InvitationModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            id: null,
            socket: null

        }
        this.autoComplete = this.autoComplete.bind(this);
        this.setUser = this.setUser.bind(this);
        this.sendProjectInvitation = this.sendProjectInvitation.bind(this);
    }
    setUser(username, id){
        document.getElementById("search-user-input").value = username;
        this.setState({...this.state, username: username, id: id});
        //remove suggestions after
    }
    autoComplete(keyword, clear){
        //clear arg is to tell function whether we just want to clear the suggesstions
        //or update the suggestions and the value of the user on the component state

        clearTimeout(suggestionTimeout);
        //must use arrow function in create timeout
        //using function keyword will create a new execution context
        //that does not have props attached to the 'this' keyword
        //could just do var self = this but nah fuck that
        suggestionTimeout = setTimeout(()=>{
            this.props.getUsers(keyword);
        }, 400);

        if(clear) return;
        this.setUser(keyword);
    }
    sendProjectInvitation(){
        document.getElementById('submit-button').disabled = true;
        this.props.sendProjectInvitation(this.props.project, this.state.username);

        document.getElementById('search-user-input').value = "";
        this.setState({...this.state, username: null});
        this.autoComplete(null, true)
    }
    componentDidMount(){
        this.setState({...this.state, socket: io(`http://localhost:8000/ws-notifications?user=${this.props.user._id}`)})
    }
    componentDidUpdate(prevProps, prevState){
        if(!this.props.loading)
            document.getElementById('submit-button').disabled = false;

        //invitation was sent successfully created, clear form data
        //and send the signal to the intvitee via socket io
        if(!this.props.loading && this.props.successMessage){
            console.log(this.state.id);
            if(this.state.id)
                this.state.socket.emit("send-notification", this.state.id)
            setTimeout(this.props.clearProcessData, 3000);
        }  
    }      
    componentWillUnmount(){
        this.state.socket.disconnect();
    }
    render(){
        return (
            <div className="modal invitation-modal">
                <button onClick={this.props.closeInvitationModal} className="close-btn">X</button>
                <h3>Send A Project Intvitation</h3>
                <input id="search-user-input" onKeyUp={e=> this.autoComplete(e.target.value, false)} type="text" placeholder="Enter the pesrson's username"/>
                <UsersList setUser={this.setUser} usersSearchResults={this.props.usersSearchResults}/>
                <button id="submit-button" onClick={this.sendProjectInvitation} className="button btn-primary-bold">
                    {!this.props.loading &&
                        "Send Invitation"
                    }{this.props.loading &&
                        <Loader/>
                    }
                </button>
                {this.props.successMessage &&
                    <div className="success-message">
                        {this.props.successMessage}
                    </div>
                }
                {this.props.errorMessage &&
                    <div className="error-message">
                        <span className="exception">throw UserInputError</span> {this.props.errorMessage}
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendProjectInvitation: (project, recipient) => dispatch(sendProjectInvitation(project, recipient))
    }
}

export default connect(null, mapDispatchToProps)(InvitationModal);