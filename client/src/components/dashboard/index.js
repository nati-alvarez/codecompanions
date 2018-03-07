import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

//COMPONENTS
import Nav from '../Nav';
import AccountInfo from '../account/index';

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
                    <Route path={this.props.match.path + "/account"} render={() => <AccountInfo user={this.props.user}/>}/>
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