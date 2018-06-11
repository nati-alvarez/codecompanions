import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

//ACTIONS
import {getAllPosts} from '../../../actions/blog';

//COMPONENTS
import Footer from './Footer';

class DashHome extends Component {
    componentDidMount(){
        this.props.getPosts();
    }
    render(){
        return (
            <div className="dash-home">
                <div className="news">
                    <h1>CODE COMPANIONS GRAND OPENING!</h1>
                    <p>Welcome to the grand opening of Code Companions! We're excited to have
                    you here. Be sure to fill out your account info so you can start getting to work
                    on awesome projects!
                    </p>
                </div>
                <div className="blog">
                    <h3>Our Blog</h3>
                    {this.props.posts &&
                        <div className="posts">
                        {this.props.posts.map((post, index)=>{
                            if(index > 3) return;
                            return (
                                <div className="post">
                                    <h4>{post.title}</h4>
                                    <div className="author">
                                        Authored By: 
                                        <img className="profile-picture" width="35" height="35" src={post.author.profilePicture}/>
                                        {post.author.name}
                                    </div>
                                    <p>{post.tagline}...<Link to={`/blog/post/${post._id}`}>Read full post</Link></p>
                                </div>
                            );
                        })}
                        </div>
                    }
                    <Link to="/blog"><button className="button btn-primary-bold">See All New Posts</button></Link>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => dispatch(getAllPosts())
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.blog.posts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashHome);