import React, {Component} from 'react';
import {connect} from 'react-redux';

//COMPONENTS
import Nav from '../Nav';
import FormContainer from './FormContainer';

//STYLES
import '../../styles/pages/homepage.sass'

class HomePage extends Component {
    componentDidMount(){
        if(localStorage.getItem("isLoggedIn")) this.props.history.push("/dash")
    }
    componentDidUpdate(){
        if(localStorage.getItem("isLoggedIn")) this.props.history.push("/dash");
    }
    render(){
        return (
            <div className="homepage">
                <Nav/>
                <header className="grid-y align-center-middle text-center">
                    <h1>_CODE COMPANIONS</h1>
                    <p className="lead">
                        <span className="htmltag">&lt;info&gt;&nbsp;</span>
                        A platform for developers to find other devs to collaborate with on awesome projects!
                        <span className="htmltag">&nbsp;&lt;/info&gt;</span>
                    </p>
                    <FormContainer/> {/*this will contain render either login or signup form depending on state */}
                </header>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(HomePage);