import React, {Component} from 'react';
import {connect} from 'react-redux';

//FONT-AWESOME
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

class ChatChannels extends Component {
    render(){
        return (
            <div className="chat-channels cell medium-2">
                <div className="channels-list">
                    <h4>Channels</h4>
                    {this.props.channels.map(channel =>{
                        return <div onClick={()=> this.props.changeChannel(channel.name)}className="channel">#{channel.name}</div>;
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