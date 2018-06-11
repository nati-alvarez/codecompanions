import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

//COMPONENTS
import Nav from '../../Nav';
import Dashboard from './Dashboard';
import NewPost from './NewPost';
import EditPost from './EditPost';

class Admin extends Component {
    render(){
        if(!this.props.user.admin){
            return <Redirect to={"/dash"}/>
        }
        return (
            <div className="blog-admin">
                <Nav/>
                <Router>
                    <Switch>
                        <Route exact path={this.props.match.path} component={Dashboard}/>
                        <Route exact path={this.props.match.path + "/new-post"} component={NewPost}/>
                        <Route path={this.props.match.path + "/:post/edit"} component={EditPost}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Admin);