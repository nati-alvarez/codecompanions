import React, {Component} from 'react';
import {connect} from 'react-redux';

//STYLES
import '../../../styles/pages/findprojects.sass';

//ACTIONS
import {getProjectListings, searchProjectListings} from '../../../actions/projectListings';

//COMPONENTS
import ProjectListing from './ProjectListing';
import Search from './Search';
import Loader from '../../animations/Loader';
import Paginator from './Paginator';

class FindProjects extends Component {
    constructor(){
        super();
        this.state = {
            queryMade: false, //whether the user has made a search query or not, will change title above project listing results
            query: null,
            title: "Projects Recommended For You",
            activeLink: 2, //the navbar below the search bar for filtering projects,
            page: 1 //pagination counter
        }
        this.getRecommendations = this.getRecommendations.bind(this);
        this.searchProjectListings = this.searchProjectListings.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    componentDidMount(){
        this.props.getProjectListings(true);
    }
    getRecommendations(){
        this.props.getProjectListings(true);
        this.setState({...this.state, title: "Projects Recommended For You", activeLink: 2, page: 1});
    }
    searchProjectListings(query){
        this.props.searchProjectListings(query);
        this.setState({...this.state, title: `Search Results For "${query.title}"`, page: 1});
    }
    getAllProjects(){
        this.props.getProjectListings();
        this.setState({...this.state, title: "All Projects", activeLink: 1, page: 1});
    }
    changePage(page){
        this.setState({...this.state, page});
    }
    render(){
        var projectsPerPage = 5;
        return (
            <section className="find-projects">
                <Search getRecommendations={this.getRecommendations} search={this.searchProjectListings}/>
                <nav className="find-projects-nav">
                    <a className={(this.state.activeLink === 1)? "active": ""} onClick={this.getAllProjects}>All Projects</a>
                    <a className={(this.state.activeLink === 2)? "active": ""} onClick={e=>this.getRecommendations(true)}>Projects For Me</a>
                </nav>
                <h3>
                    {this.state.title}
                </h3>
                {
                    this.props.errorMessage
                }
                {this.props.loading &&
                    <div className="text-center">
                        <p>Loading projects...</p>
                        <Loader/>
                    </div>
                }
                <div className="project-listings-container">
                    {this.props.projects && this.props.projects[0] &&
                        this.props.projects.map((project, index) => {
                            if(index >= projectsPerPage * this.state.page) return;
                            if(index < projectsPerPage * (this.state.page - 1)) return;
                            return (
                                <ProjectListing key={project._id} project={project}/>
                            )
                        })
                    }
                </div>
                {this.props.projects.length > projectsPerPage &&
                    <Paginator changePage={this.changePage} projects={this.props.projects} page={this.state.page}/>
                }
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectListings: (recommended) => dispatch(getProjectListings(recommended)),
        searchProjectListings: (query) => dispatch(searchProjectListings(query))
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projectListings.projects,
        loading: state.projectListings.loading,
        errorMessage: state.projectListings.errorMessage,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindProjects);