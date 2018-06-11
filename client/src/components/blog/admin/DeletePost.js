import React, {Component} from 'react';

class DeletePost extends Component {
    constructor(){
         super();
         this.state = {
             title: null,
         }
    }
    componentDidMount(){
        document.getElementById("delete-btn").disabled = true;
    }
    componentDidUpdate(){
        if(this.state.title === this.props.post.title)
            document.getElementById("delete-btn").disabled = false;
        else
            document.getElementById("delete-btn").disabled = true;
    }
    render(){
        return (
            <div className="delete-post">
                <div className="modal delete-post-modal">
                    <span onClick={this.props.closeDeletePrompt} className="close-btn">X</span>
                    <h3>Are You Sure?</h3>
                    <p>Once you delete this post, it's gone forever</p>
                    <div className="input-field">
                        <input onChange={e=>this.setState({title: e.target.value})} type="text" placeholder={this.props.post.title}/>
                        <small className="help-text">re-type this post's title to confirm</small>
                    </div>
                    <button onClick={e=> this.props.deletePost(this.props.post._id)}id="delete-btn" className="button btn-primary-bold">Yes, Delete Post</button>
                </div>
            </div>
        )
    }
}

export default DeletePost;