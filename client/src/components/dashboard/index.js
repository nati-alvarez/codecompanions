import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

//COMPONENTS
import Nav from '../Nav';
import AccountInfo from '../account/index';
import FindProjects from './findProjects';
import MyProjects from './myProjects';
import NewProject from './newProject';
import ProjectListingPage from './projectListing';
import AccountPage from '../account/AccountPage';

//STYLES
import '../../styles/pages/dash.sass';

class Dash extends Component {
    componentDidMount(){
        if(!localStorage.getItem("isLoggedIn")) this.props.history.push("/");
    }
    componentDidUpdate(){
        if(!localStorage.getItem("isLoggedIn")) this.props.history.push("/");
    }
    render(){
        return (
            <div className="dashboard">
                <Nav/>
                <main>
                    <Route exact path={this.props.match.path} render={() => <h1>This is the dashboard</h1>}/>
                    <Route exact path={this.props.match.path + "/account"} render={() => <AccountInfo user={this.props.user}/>}/>
                    <Route path={this.props.match.path + "/users/:username"} component={AccountPage}/>    
                    <Route exact path={this.props.match.path + "/projects"} render={() => <FindProjects user={this.props.user}/>}/>
                    <Route exact path={this.props.match.path + "/projects/new"} render={() => <NewProject user={this.props.user}/>}/>
                    <Route path={this.props.match.path + "/projects/project/:id"} render={() => <ProjectListingPage history={this.props.history} user={this.props.user}/>}/>
                    <Route path={this.props.match.path + "/my-projects"} render={() => <MyProjects user={this.props.user}/>}/>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Dash);