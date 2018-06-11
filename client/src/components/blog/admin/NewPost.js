import React, {Component} from 'react';
import {connect} from 'react-redux';

//STYLES
import '../../../styles/pages/newpost.sass';

//ACTIONS
import {createBlogPost} from '../../../actions/blog';

//COMPONENTS
import Loader from '../../animations/Loader';

//FROALA WYSIWYG EDITOR
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import 'font-awesome/css/font-awesome.css';

class NewPost extends Component {
    constructor(){
        super();
        this.state = {
            title: null,
            bannerImage: null,
            tagline: null,
            body: null,
        }
        this.updateContent = this.updateContent.bind(this);
        this.createBlogPost = this.createBlogPost.bind(this);
    }
    updateContent(body){
        this.setState({body}); 
    }
    createBlogPost(e){
        e.target.disabled = true;
        this.props.createPost(this.state);
    }
    componentDidUpdate(){
        if(this.props.loading === false)
            document.getElementById("submit").disabled = false;
    }
    componentWillUnmount(){
        this.props.clearPostData();
    }
    render(){
        return (
            <div className="new-post">
                <h2>Create A New Post</h2>
                <div className="input-field">
                    <input onChange={e=> this.setState({title: e.target.value})} type="text"/>
                    <small className="help-text">Enter a title for this post</small>
                </div>
                <div className="input-field">
                    <input onChange={e=> this.setState({tagline: e.target.value})} type="text"/>
                    <small className="help-text">Write a catchy tagline to get readers attention</small>
                </div>
                <div className="input-field">
                    <input onChange={e=> this.setState({bannerImage: e.target.value})}  type="text"/>
                    <small className="help-text">Enter a url for a featured image</small>
                </div>
                <div className="input-field">
                    <FroalaEditor onModelChange={this.updateContent} config={{placeholderText: "Start writing your post!"}} model={this.state.body} tag="textarea"/>
                    <small className="help-text">Start writing you blog post</small>
                </div>
                <button id="submit" onClick={this.createBlogPost} className="button btn-primary-bold">
                    {this.props.loading? <Loader/>: "Publish Post"}
                </button>
                {this.props.successMessage &&
                    <div className="success-message">
                        {this.props.successMessage}
                    </div>
                }
                {this.props.errorMessage &&
                    <div className="error-message">
                        <span className="exception">throw UserInputException </span> {this.props.errorMessage}
                    </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (data) => dispatch(createBlogPost(data)),
        clearPostData: () => dispatch({type: "CLEAR_POST_DATA"})
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.blog.loading,
        successMessage: state.blog.successMessage,
        errorMessage: state.blog.errorMessage
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);