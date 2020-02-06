import React, {Component} from 'react';

class AddChannelModal extends Component {
    constructor(){
        super();
        this.createTextChannel = this.createTextChannel.bind(this);
    }
    createTextChannel(){
        this.props.createTextChannel(this.props.projectId, document.getElementById('channel-name').value)
        this.props.socket.emit('create-channel', this.props.projectId);
    }
    render(){
        return(
            <div className="add-channel-modal modal">
                <span onClick={()=> this.props.toggleAddChannelModal(false)} className="close-btn">X</span>
                <h3>Add a Text Channel</h3>
                <input id="channel-name" type="text" placeholder="channel name"/>
                <button onClick={this.createTextChannel} className="button btn-primary-bold">Add Channel</button>
            </div>
        )
    }
}

export default AddChannelModal;