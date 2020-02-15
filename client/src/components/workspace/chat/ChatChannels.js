import React, {Component} from 'react';
import {connect} from 'react-redux';

//FONT-AWESOME
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

class ChatChannels extends Component {
    render(){
        console.log(this.props.newInactiveMessages, this.props.channels)
        return (
            <div className="chat-channels cell medium-2">
                <div className="scrollbar channels-list">
                    <h4>Channels</h4>
                    {this.props.channels.map(channel =>{
                        return <div 
                        key={channel._id} 
                        onClick={()=> this.props.changeChannel(channel.name)}
                        className={(this.props.activeChannel.name == channel.name ? "active": "") + " channel"}>
                        #{channel.name}
                        {
                        this.props.newInactiveMessages[0] &&
                        this.props.newInactiveMessages.map(item=>{
                            if(item.channelName == channel.name && item.newMessages)
                                return (<div className="message-counter">{item.newMessages}</div>)
                            else
                                return
                        })
                        }
                        </div>;
                    })}
                </div>
                <button onClick={()=>this.props.toggleAddChannelModal(true)} className="button btn-primary-bold add-channel-btn circle-btn">
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>

        )
    }
}

export default ChatChannels;