import React, {Component} from 'react';
import {connect} from 'react-redux';

//COMPONENTS
import Slider from 'react-slick';
import Nav from '../Nav';
import Slide from './Slide';
import Post from './Post';
import Paginator from './Paginator';

//ACTIONS   
import {getAllPosts} from '../../actions/blog';

//STYLES
import "slick-carousel/slick/slick.css";
import "../../styles/pages/bloghome.sass";
import { returnStatement } from 'babel-types';

class BlogHome extends Component {
    constructor(){
        super();
        this.state = {
            page: 1
        }
        this.changePage = this.changePage.bind(this);
    }
    componentDidMount(){
        this.props.getAllPosts();
    }
    changePage(page){
        this.setState({page});
    }
    render(){
        var postsPerPage = 5;
        var settings = {
            arrows: false,
            autoplay: true,
            autoplaySpeed: 6000,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            customPaging: (i)=>{
                return <button className="slide-button"></button>
            }
          };
          
          //first three posts go in the slider for now
          var sliderPosts = this.props.posts.map((post, index)=> {
            if(index > 2)
                return
            return post;
          });
          return (
            <div className="blog-home">
                <Nav/>
                <main>
                    <Slider {...settings}>
                        <Slide post={sliderPosts[0]}/>
                        <Slide post={sliderPosts[1]}/>
                        <Slide post={sliderPosts[2]}/>
                    </Slider>
                    <div className="posts">
                        <h2>Newest Posts</h2>
                        {this.props.posts.map((post, index)=>{
                            if(index > (postsPerPage * this.state.page) - 1) return;
                            if(index < postsPerPage * (this.state.page - 1)) return;
                            return <Post post={post}/>
                        })}
                    </div>
                    <Paginator page={this.state.page} itemsPerPage={postsPerPage} posts={this.props.posts} changePage={this.changePage}/>
                </main>
            </div>
          );      
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.blog.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => dispatch(getAllPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogHome);