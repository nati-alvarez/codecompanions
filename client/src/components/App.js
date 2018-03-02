import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Zurb Foundation
import 'foundation-sites/dist/css/foundation.min.css'

//STYLES
import '../styles/index.sass'

//COMPNENTS
import HomePage from './homePage';

class App extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/" component={HomePage}/> 
                </Switch>
            </Router>
        )
    }
}

export default App;