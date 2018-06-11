//THIS COMPONENT IS FOR VIEWING AN INDIVIDUAL POST
//POST.JS IS FOR LISING EACH POST
import React, {Component} from 'react';
import {connect} from 'react-redux';

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

//ACTIONS
import {getPost} from '../../actions/blog';

//COMPONENTS
import Nav from '../Nav';

//STYLES
import '../../styles/pages/postview.sass'

class PostView extends Component {
    componentDidMount(){
        this.props.dispatch(getPost(this.props.match.params.id))
    }
    componentWillUnmount(){
        this.props.dispatch({type: "CLEAR_POST_DATA"});
    }
    render(){
        return (
            <main>
                <Nav/>
                <div className="post-view">
                    {this.props.post &&
                        <div className="post">
                            <div className="banner-image">
                                <img src={this.props.post.bannerImage}/>
                            </div>
                            <h1>{this.props.post.title}</h1>
                            <div className="post-body">
                                <FroalaEditorView
                                    model={this.props.post.body}
                                />
                            </div>
                        </div>
                    }
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.blog.post
    }
}

export default connect(mapStateToProps)(PostView);