import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

//Zurb Foundation
import 'foundation-sites/dist/css/foundation.min.css'

//STYLES
import '../styles/index.sass'

//COMPNENTS
import HomePage from './homePage';
import Dash from './dashboard';
import Workspace from './workspace';
import RecoverPassword from './recoverPassword';
import ResetPassword from './recoverPassword/resetForm';
import VerifyAccount from './account/Verify';
import Blog from './blog';
import PostView from './blog/PostView';
import Admin from './blog/admin'

class App extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/> 
                    <Route path="/dash" component={Dash}/>
                    <Route exact path="/blog" component={Blog}/>
                    <Route path="/blog/admin" component={Admin}/>
                    <Route path="/blog/post/:id" component={PostView}/>
                    <Route path="/workspace/:id" component={Workspace}/>
                    <Route path="/account/forgot" component={RecoverPassword}/>
                    <Route path="/account/reset" component={ResetPassword}/>
                    <Route path="/account/verify/:verificationCode" component={VerifyAccount}/>
                </Switch>
            </Router>
        )
    }
}

export default App;