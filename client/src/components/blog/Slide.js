import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Slide extends Component {
    render(){
        if(!this.props.post)
            return null
        return (
            <div style={{backgroundImage: `url(${this.props.post.bannerImage})`}}className="slide">
                <div>
                <h2>{this.props.post.title}</h2>
                </div>
                <div>
                <p>{this.props.post.tagline}</p>
                </div>
                <Link to={`/blog/post/${this.props.post._id}`}>
                    <button className="button primary-btn-bold">Read More</button>
                </Link>
            </div>
        )
    }
}

export default Slide;