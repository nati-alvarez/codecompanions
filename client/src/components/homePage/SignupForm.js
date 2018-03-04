import React, {Component} from 'react';

//COMPONENTS
import Loader from '../animations/Loader';

class SignupForm extends Component {
    constructor(){
        super();
        this.state = {
            showPassword: false,
            input: {
                name: null, 
                username: null,
                email: null,
                password: null
            }
        }
        this.showPassword = this.showPassword.bind(this);
        this.submit = this.submit.bind(this);
    }
    showPassword(){
        (this.state.showPassword === false)? this.setState({showPassword: true}): this.setState({showPassword: false});
    }
    submit(e){
        e.target.disabled = true;
        
        //form validation
        var body = {};
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        for(let prop in this.state.input){
            if(!this.state.input[prop]) return this.props.formError("All fields are required");
            if(prop === "email" && !emailRegex.test(this.state.input[prop])) return this.props.formError("Email address not valid.")
            if(prop !== "name" && /\s/.test(this.state.input[prop])) return this.props.formError(`${prop} cannot contain whitespace.`);
            body[prop] = this.state.input[prop].trim();
        }

        this.props.signup(body);
    }
    render(){
        return (
            <div className="formBody text-left">
                <h4>Signup For An Account</h4>
                <div className="grid-container">
                    <div className="grid-x grid-padding-x">
                        <div className="cell">
                            <label>
                                Name:
                                <input onChange={(e)=> this.setState({...this.state, input: {...this.state.input, name: e.target.value}})} type="text"/>
                            </label>
                        </div>
                        <div className="cell">
                            <label>
                                Username:
                                <input onChange={(e)=> this.setState({...this.state, input: {...this.state.input, username: e.target.value}})} type="text"/>
                            </label>
                        </div>
                        <div className="cell">
                            <label>
                                Email:
                                <input onChange={(e)=> this.setState({...this.state, input: {...this.state.input, email: e.target.value}})} type="text"/>
                            </label>
                        </div>
                        <div className="cell">
                            <label>
                                Password:
                                <input onChange={(e)=> this.setState({...this.state, input: {...this.state.input, password: e.target.value}})} type={(this.state.showPassword === true)? "text": "password"}/>
                                <small onClick={this.showPassword}className="show-password">
                                    {this.state.showPassword === false &&
                                        "SHOW"
                                    }{this.state.showPassword === true &&
                                        "HIDE"
                                    }
                                </small>
                            </label>
                        </div>
                    </div>
                    <div className="form-status">
                        {this.props.formStatus.errorMessage &&
                            <div className="error-message">
                                <span className="exception">throw UserInputException </span>
                                {this.props.formStatus.errorMessage}
                            </div>
                        }
                        {this.props.formStatus.successMessage &&
                            <div className="success-message">
                                {this.props.formStatus.successMessage}
                            </div>
                        }
                    </div>

                    <button id="submit-button" onClick={e => this.submit(e)}className="button btn-primary-bold">
                        {!this.props.formStatus.loading &&
                            "Submit"
                        }
                        {this.props.formStatus.loading &&
                            <Loader/>
                        }
                    </button>

                    <small className="form-switch" onClick={()=> this.props.swapForm("login")}>Have an account? Log in!</small>
                </div>
            </div>
        );
    }
}

export default SignupForm;