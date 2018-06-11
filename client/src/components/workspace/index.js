import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

//ACTIONS
import {getProject} from '../../actions/projects';

//COMPONENTS
import Sidebar from './Sidebar';
import WorkspaceHeader from './WorkspaceHeader';
import Home from './home';
import Chat from './chat';
import Tasks from './tasks';
import Git from './git';

//STYLES
import '../../styles/pages/workspace.sass';


class Workspace extends Component {
    componentDidMount(){
        console.log(this.props)
        this.props.dispatch(getProject(this.props.match.params.id));
    }
    render(){
        return (
            <div className="workspace-page">
                {this.props.errorMessage &&
                    this.props.errorMessage
                }{!this.props.errorMessage && this.props.project &&
                    <div className="workspace-container">
                        <main>
                            <WorkspaceHeader project={this.props.project}/>
                            <Route exact path={this.props.match.url} render={()=> <Home project={this.props.project}/>}/>
                            <Route path={this.props.match.url + "/chat"} component={Chat}/>
                            <Route path={this.props.match.url + "/git"} render={() => <Git project={this.props.project}/>}/>
                            <Route path={this.props.match.url + "/tasks"} render={() => <Tasks project={this.props.project}/>}/>
                        </main>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.workspace.project,
        loading: state.workspace.loading,
        errorMessage: state.workspace.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProject: (id) => dispatch()
    }
}

export default connect(mapStateToProps)(Workspace);