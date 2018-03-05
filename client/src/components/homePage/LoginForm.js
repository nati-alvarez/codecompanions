import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//COMPONENTS
import Loader from '../animations/Loader'

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            input: {
                username: null,
                password: null
            }
        }
        this.submit = this.submit.bind(this);
    }
    submit(e){
        e.target.disabled = true;
        for(let prop in this.state.input){
            if(!this.state.input[prop]){
                return this.props.formError("All fields are required");
            }
            if(/\s/g.test(this.state.input[prop])){
                return this.props.formError(`${prop} cannot contain whitespace.`);
            }
        }
        this.props.login(this.state.input)
    }
    render(){
        return (
            <div className="formBody text-left">
                <h4>Login To Your Account</h4>
                <div className="grid-container">
                    <div className="grid-x grid-padding-x">
                        <div className="cell">
                            <label>
                                Username:
                                <input onChange={(e) => this.setState({...this.state, input: {...this.state.input, username: e.target.value}})} type="text"/>
                            </label>
                        </div>
                        <div className="cell">
                            <label>
                                Password:
                                <input onChange={(e) => this.setState({...this.state, input: {...this.state.input, password: e.target.value}})} type="password"/>
                            </label>
                        </div>
                    </div>

                    <div className="formStatus">
                        {this.props.formStatus.errorMessage &&
                            <div className="error-message">
                                <span className="exception">throw UserInputError </span>
                                {this.props.formStatus.errorMessage}
                            </div>
                        }
                    </div> 

                    <button id="submit-button" onClick={e => this.submit(e)} className="button btn-primary-bold">
                        {!this.props.formStatus.loading &&
                            "Submit"
                        }
                        {this.props.formStatus.loading &&
                            <Loader/>
                        }
                    </button>
                    
                    <small className="form-switch" onClick={() => this.props.swapForm("signup")}>Don't have an account? Sign Up!</small>
                    <Link to="/account/forgot">
                        <small className="forgot-password subheader">I forgot my password</small>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LoginForm;