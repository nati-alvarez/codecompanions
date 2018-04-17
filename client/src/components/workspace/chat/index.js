import React, {Component} from 'react';
import {connect} from 'react-redux';

//COMPONENTS
import ChatChannels from './ChatChannels';
import AddChannelModal from './AddChannelModal';
import MessageInput from './MessageInput';

//ACTIONS
import {sendMessage, createTextChannel} from '../../../actions/projects';

//STYLES
import '../../../styles/pages/workspacechat.sass';

class Chat extends Component {
    constructor(){
        super();
        this.state = {
            showAddChannelModal: false,
            activeChannel: null
        }
        this.toggleAddChannelModal = this.toggleAddChannelModal.bind(this);
        this.changeChannel = this.changeChannel.bind(this);
    }
    componentDidMount(){
        //auto scroll to bottom of messages on component mount
        document.getElementsByClassName("active-chat-channel")[0].scrollTop += 10000   
    }
    componentWillMount(){
        var generalChat = this.props.project.channels.filter(channel=>{
            return channel.name === "General";
        });
        this.setState({...this.state, activeChannel: generalChat[0]});
    }
    componentDidUpdate(){
        document.getElementsByClassName("active-chat-channel")[0].scrollTop += 10000   

        var activeChannel = this.props.project.channels.filter(channel=>{
            return channel.name === this.state.activeChannel.name;
        });
        if(activeChannel[0].messages.length > this.state.activeChannel.messages.length)
            this.setState({...this.state, activeChannel: activeChannel[0]})
    }
    toggleAddChannelModal(bool){
        this.setState({showAddChannelModal: bool});
    }
    changeChannel(channelName){
        var activeChannel = this.props.project.channels.filter(channel=>{
            return channel.name === channelName;
        });
        this.setState({...this.state, activeChannel: activeChannel[0]})
    }
    render(){
        return (
            <div className="workspace-chat grid-x grid-padding-x">
                <ChatChannels changeChannel={this.changeChannel} toggleAddChannelModal={this.toggleAddChannelModal} channels={this.props.project.channels}/>
                <div className="active-chat-channel cell auto"> 
                    {this.state.showAddChannelModal && <AddChannelModal projectId={this.props.project._id} createTextChannel={this.props.createTextChannel} toggleAddChannelModal={this.toggleAddChannelModal}/>}
                    <h3 className="top-bar channel-name">
                        #{this.state.activeChannel.name} Text Channel
                    </h3>
                    <div className="text">
                        {this.state.activeChannel.messages[0] &&
                            this.state.activeChannel.messages.map(message=>{
                                return ( 
                                    <div className="message-container">
                                        <div className="message">
                                            <div className="author">
                                                <img src={message.author.profilePicture} width="25" height="25"/>
                                                {message.author.username}
                                            </div>
                                            {message.body}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <MessageInput projectId={this.props.project._id} channel={this.state.activeChannel} sendMessage={this.props.sendMessage}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.workspace.project
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (projectId, channelName, messageBody) => dispatch(sendMessage(projectId, channelName, messageBody)),
        createTextChannel: (projectId, channelName) => dispatch(createTextChannel(projectId, channelName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);