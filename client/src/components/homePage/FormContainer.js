import React, {Component} from 'react';
import {connect} from 'react-redux';

//COMPONENTS
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

//ACTIONS
import {login, signup, formError, swapForm} from '../../actions/auth';

class FormContainer extends Component {
    constructor(){
        super();
        this.state = {
            form: "login"
        }
        this.swapForm = this.swapForm.bind(this);
    }
    swapForm(form){
        this.setState({form});
        this.props.swapForm();
    }
    render(){
        var Form = (this.state.form === "login")? LoginForm: SignupForm;
        return (
            <form onSubmit={(e) => e.preventDefault()}>
                <Form
                    formStatus={this.props.formStatus}
                    swapForm={this.swapForm}
                    formError={this.props.formError}
                    login={this.props.login}
                    signup={this.props.signup}
                />
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (body) => dispatch(login(body)),
        signup: (body) => dispatch(signup(body)),
        formError: (message) => dispatch(formError(message)),
        swapForm: () => dispatch(swapForm())
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        formStatus: state.auth.form
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);