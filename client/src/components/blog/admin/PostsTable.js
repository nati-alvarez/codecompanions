import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import faExternalLink from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
import Icon from '@fortawesome/react-fontawesome';

//COMPONENTS
import Paginator from '../Paginator';

class PostsTable extends Component {
    constructor(){
        super();
        this.state = {
            page: 1,
        }
        this.changePage = this.changePage.bind(this)
    }
    changePage(page){
        this.setState({page});
    }
    render(){
        var itemsPerPage = 6;
        return (
            <div className="all-posts">
                <Paginator itemsPerPage={itemsPerPage} page={this.state.page} posts={this.props.posts} changePage={this.changePage}/>
                <div className="row-header">
                    <div className="post-title">
                        Post Title
                    </div>
                    <div className="pub-date">
                        Date Published
                    </div>
                    <div className="view">
                        View Post
                    </div>
                    <div className="edit">
                        Edit Post
                    </div>
                    <div className="delete">
                        Delete Post
                    </div>
                </div>
                {this.props.posts.map((post, index)=>{
                    if(index > (itemsPerPage * this.state.page) - 1) return;
                    if(index < itemsPerPage * (this.state.page - 1)) return;
                    return (
                        <div className="row">
                            <div className="post-title">
                                {post.title}
                            </div>
                            <div className="pud-date">
                                {moment(post.createdAt).format("ddd, MMMM Do YYYY")}
                            </div>
                            <div className="view">
                                <Link to={`/blog/post/${post._id}`}>Link<Icon icon={faExternalLink}/></Link>
                            </div>
                            <div className="edit">
                                <Link to={`/blog/admin/${post._id}/edit`}>
                                    <button>Edit Post</button>
                                </Link>
                            </div>
                            <div className="delete">
                                <button onClick={e=> this.props.showDeletePrompt(post)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default PostsTable;