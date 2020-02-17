import React, {Component} from 'react';

class MessageInput extends Component {
    constructor(){
        super();
        this.state = {
            message: ""
        }
        this.updateInput = this.updateInput.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }
    updateInput(e){
        //checks if enter key was hit, if so clear input box
        //doing this on keyup as well bc doing it on submit will cause a newline to be
        //added after message is submitted
        if(this.state.message === "" && e.target.value != "" && e.which === 13) document.getElementById("input").value = "";

        this.setState({...this.state, message: e.target.value});
    }
    keyPress(e){
        //Newline on shift key + enter. Else submit message on enter
        if(e.which === 13){
            if(e.shiftKey) {
                this.setState({...this.state, message: this.state.message+ "/r"})
                return;
            }
            return this.submitMessage();
        }
    }
    submitMessage(e){
        var message = this.state.message.trim();
        if(message == "") return;
        this.props.sendMessage(this.props.projectId, this.props.channel.name, message);

        this.setState({...this.state, message: ""});
        document.getElementById("input").value = "";
        this.props.socket.emit('send-message', message, JSON.parse(localStorage.getItem("user")), this.props.channel.name,this.props.projectId);

    }
    render(){
        return (
            <form onSubmit={e=> e.preventDefault()} className="message-input">
                <textarea id="input" onKeyUp={this.updateInput} onKeyPress={this.keyPress} type="text" placeholder="Enter your message"></textarea>
                <button onClick={this.submitMessage} className="button btn-primary-bold">Send Message</button>
            </form>
        );
    }
}

export default MessageInput;