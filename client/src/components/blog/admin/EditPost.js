import React, {Component} from 'react';
import {connect} from 'react-redux';
import FroalaEditor from 'react-froala-wysiwyg';

//STYLES
import '../../../styles/pages/editpost.sass'

//ACTIONS
import {getPost, updatePost} from '../../../actions/blog';

//COMPONENTS
import Loader from '../../animations/Loader';

class EditPost extends Component {
    constructor(){
        super();
        this.state = {
            title: null,
            body: null,
            bannerImage: null,
            tagline: null
        }
        this.updateContent = this.updateContent.bind(this);
        this.updatePost = this.updatePost.bind(this);
    }
    componentDidMount(){
        this.props.getPost(this.props.match.params.post);
    }
    componentWillReceiveProps(props){
        if(!props.loading)
            document.getElementById('submit').disabled = false;
        if(props.post)
            this.setState({body: props.post.body, title: props.post.title, tagline: props.post.tagline, bannerImage: props.post.bannerImage})
    }
    updateContent(body){
        this.setState({body});
    }
    updatePost(){
        document.getElementById("submit").disabled = true;
        this.props.updatePost(this.state, this.props.post._id);
    }
    componentWillUnmount(){
        this.props.clearPostData();
    }
    render(){
        return (
            <div className="edit-post">
                <h2>Edit Post</h2>
                <div className="input-field">
                    <input value={this.state.title} onChange={e=> this.setState({title: e.target.value})} type="text"/>
                    <small className="help-text">Enter a title for this post</small>
                </div>
                <div className="input-field">
                    <input value={this.state.tagline} onChange={e=> this.setState({tagline: e.target.value})} type="text"/>
                    <small className="help-text">Write a catchy tagline to get readers attention</small>
                </div>
                <div className="input-field">
                    <input value={this.state.bannerImage} onChange={e=> this.setState({bannerImage: e.target.value})}  type="text"/>
                    <small className="help-text">Enter a url for a featured image</small>
                </div>
                <div className="input-field">
                    <FroalaEditor onModelChange={this.updateContent} model={this.state.body} tag="textarea"/>
                    <small className="help-text">Start writing you blog post</small>
                </div>
                <button id="submit" onClick={this.updatePost}className="button btn-primary-bold">
                    {this.props.loading? <Loader/>: "Edit Post"}
                </button>
                {this.props.successMessage &&
                    <div className="success-message">
                        {this.props.successMessage}
                    </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (id) => dispatch(getPost(id)),
        updatePost: (data, id) => dispatch(updatePost(data, id)),
        clearPostData: () => dispatch({type: "CLEAR_POST_DATA"})
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.blog.post,
        loading: state.blog.loading,
        errorMessage: state.blog.errorMessage,
        successMessage: state.blog.successMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);