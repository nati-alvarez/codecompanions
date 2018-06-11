import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Post extends Component {
    render(){
        return (
            <div className="post">
                <img src={this.props.post.bannerImage}/>
                <div className="details">
                    <h4>{this.props.post.title}</h4>
                    <div className="author">
                        Authored By:
                        <img className="profile-picture" src={this.props.post.author.profilePicture} width="35" height="35"/>
                        {this.props.post.author.name}
                    </div>
                    <p>{this.props.post.tagline}</p>
                    <Link to={`/blog/post/${this.props.post._id}`}>
                        <button className="button btn-primary-bold">Read More</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Post;