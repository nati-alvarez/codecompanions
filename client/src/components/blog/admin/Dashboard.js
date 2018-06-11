import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

//STYLES
import '../../../styles/pages/admindashboard.sass';

//ACTIONS
import {getAllPosts, deletePost} from '../../../actions/blog';

//COMPONENTS
import PostsTable from './PostsTable';
import DeletePostModal from './DeletePost';

class AdminDashboard extends Component {
    constructor(){
        super();
        this.state = {
            post: null, //will hold post data on post being selected for deletion
            showDeletePrompt: false
        }
        this.showDeletePrompt = this.showDeletePrompt.bind(this);
        this.closeDeletePrompt = this.closeDeletePrompt.bind(this);
    }
    showDeletePrompt(post){
        this.setState({showDeletePrompt: true, post});
    }
    closeDeletePrompt(){
        this.setState({showDeletePrompt: false, post: null});
    }
    componentDidMount(){
        this.props.getAllPosts();
    }
    render(){
        console.log(this.props.posts);
        return (
            <div className="admin-dashboard">
                <Link to={this.props.match.path + "/new-post"}>
                    <button className="button btn-primary-bold">Create New Post</button>
                </Link>
                {this.props.posts[0] &&
                    <PostsTable showDeletePrompt={this.showDeletePrompt} posts={this.props.posts}/>
                }
                {this.state.showDeletePrompt &&
                    <DeletePostModal deletePost={this.props.deletePost} post={this.state.post} closeDeletePrompt={this.closeDeletePrompt}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.blog.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);