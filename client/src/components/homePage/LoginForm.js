import React, {Component} from 'react';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            input: {
                username: null,
                password: null
            }
        }
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
                                <input onChange={(e) =>this.setState({...this.state, input: {...this.state.input, username: e.target.value}})} type="text"/>
                            </label>
                        </div>
                        <div className="cell">
                            <label>
                                Password:
                                <input onChange={(e) =>this.setState({...this.state, input: {...this.state.input, password: e.target.value}})} type="password"/>
                            </label>
                        </div>
                    </div>
                    <button className="button btn-primary-bold">Submit</button>
                    <p className="form-switch" onClick={() => this.props.swapForm("signup")}>Don't have an account? Sign Up!</p>
                </div>
            </div>
        );
    }
}

export default LoginForm;