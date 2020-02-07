import React, {Component} from 'react';
import {connect} from 'react-redux';

//COMPONENTS
import ChatChannels from './ChatChannels';
import AddChannelModal from './AddChannelModal';
import MessageInput from './MessageInput';

//SOCKET.IO
import io from 'socket.io-client';

//ACTIONS
import {sendMessage, createTextChannel, getProject, getChannels, wsNewChannel, wsNewMessage} from '../../../actions/projects';

//STYLES
import '../../../styles/pages/workspacechat.sass';

class Chat extends Component {
    constructor(){
        super();
        this.state = {
            showAddChannelModal: false,
            activeChannel: null,
            socket: io('http://localhost:8000/ws-chat')
        }
        this.toggleAddChannelModal = this.toggleAddChannelModal.bind(this);
        this.changeChannel = this.changeChannel.bind(this);
    }
    componentDidMount(){
        //connects to socket
        this.state.socket.emit("get-messages", this.props.project._id, this.state.activeChannel.name);

        //listens for new messages submitted from other users in the chatroom
        this.state.socket.on('new-messages', (message, author, channelName)=>{
            if(this.state.activeChannel.name == channelName)
                this.props.wsNewMessage(message, author, this.state.activeChannel.name);
        });

        //listens for new channels being created and adds then to the sidebar
        this.state.socket.on('new-channel', ()=>{
            console.log('A NEW CHANNEL WAS CREATED')
            this.props.getChannels(this.props.project._id);
        });

        //auto scroll to bottom of messages on component mount
        document.getElementsByClassName("active-chat-channel")[0].scrollTop += 10000;
    }
    componentWillMount(){
        //set active channel to general channel on start
        var generalChat = this.props.project.channels.filter(channel=>{
            return channel.name === "General";
        });
        this.setState({...this.state, activeChannel: generalChat[0]});
    }
    componentWillUnmount(){
        //disconnect from websocket on unmount
        this.state.socket.disconnect();
    }
    componentDidUpdate(prevProps, prevState){
        //if a new channels was successfully created, send signal to 
        //all other users in the workspace
        if(this.props.project.channels.length > prevProps.project.channels.length){
            this.state.socket.emit('create-channel', this.props.project._id);
        }
        //auto scroll to bottom of messages when a new message is posted
        document.getElementsByClassName("active-chat-channel")[0].scrollTop += 10000   

        //gets the active channels from the database
        var activeChannel = this.props.project.channels.filter(channel=>{
            return channel.name === this.state.activeChannel.name;
        });

        //if the number of messages gotten from the channel in the database is
        //different from the number of messages from the channel the state, update messages
        //In other words, updates messages if there are new messages 
        if(activeChannel[0].messages.length > this.state.activeChannel.messages.length)
            this.setState({...this.state, activeChannel: activeChannel[0]});

        //checks if new channel was created. if so hide create channel modal and sets the active channel to the new channel
        //we only set the new channel to the active one for the user who created it
        if(this.props.project.channels.length > prevProps.project.channels.length && prevState.showAddChannelModal === true){
            this.setState({...this.state, showAddChannelModal: false, activeChannel: this.props.project.channels[this.props.project.channels.length - 1]});
        }
    }
    toggleAddChannelModal(bool){
        //opens and closes modal for creating new channels
        this.setState({showAddChannelModal: bool});
    }
    changeChannel(channelName){
        //changes the chat channel
        var activeChannel = this.props.project.channels.filter(channel=>{
            return channel.name === channelName;
        });
        this.setState({...this.state, activeChannel: activeChannel[0]});

        //connects to socket, listens for new messages on the active chat channel
        this.state.socket.emit("get-messages", this.props.project._id, channelName, this.state.activeChannel.messages);
    
        //reloads project data to get all new messages when the channel changes
        this.props.getProject(this.props.project._id);
    }
    render(){
        return (
            <div className="workspace-chat grid-x grid-padding-x">
                <ChatChannels activeChannel={this.state.activeChannel} changeChannel={this.changeChannel} toggleAddChannelModal={this.toggleAddChannelModal} channels={this.props.project.channels}/>
                <div className="active-chat-channel cell auto"> 
                    {this.state.showAddChannelModal && <AddChannelModal socket={this.state.socket} projectId={this.props.project._id} createTextChannel={this.props.createTextChannel} toggleAddChannelModal={this.toggleAddChannelModal}/>}
                    <h3 className="top-bar channel-name">
                        #{this.state.activeChannel.name}
                    </h3>
                    <div className="text">
                        {this.state.activeChannel.messages[0] &&
                            this.state.activeChannel.messages.map(message=>{
                                return ( 
                                    <div key={message._id} className="message-container">
                                        <div className="message">
                                            <div className="author">
                                                <img src={message.author.profilePicture} width="25" height="25"/>
                                                {message.author.username}
                                            </div>
                                            <div className="message-body">{message.body}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <MessageInput socket={this.state.socket} projectId={this.props.project._id} channel={this.state.activeChannel} sendMessage={this.props.sendMessage}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.workspace.project,
        loading: state.workspace.loading,
        successMessage: state.workspace.successMessage,
        errorMessage: state.workspace.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        wsNewMessage: (messageBody, author, channelName) => dispatch(wsNewMessage(messageBody, author, channelName)),
        wsNewChannel: () => dispatch(wsNewChannel()),
        sendMessage: (projectId, channelName, messageBody) => dispatch(sendMessage(projectId, channelName, messageBody)),
        createTextChannel: (projectId, channelName) => dispatch(createTextChannel(projectId, channelName)),
        getProject: (projectId) => dispatch(getProject(projectId)),
        getChannels: (projectId) => dispatch(getChannels(projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);