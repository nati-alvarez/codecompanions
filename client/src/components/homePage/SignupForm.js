import React, {Component} from 'react';

class SignupForm extends Component {
    constructor(){
        super();
        this.state = {
            showPassword: false,
            input: {
                name: null, 
                email: null,
                username: null,
                password: null
            }
        }
        this.showPassword = this.showPassword.bind(this);
    }
    showPassword(){
        (this.state.showPassword === false)? this.setState({showPassword: true}): this.setState({showPassword: false});
    }
    render(){
        console.log(this.state)
        return (
            <div className="formBody text-left">
                <h4>Signup For An Account</h4>
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
                <button className="button btn-primary-bold">Submit</button>
                <p className="form-switch" onClick={()=> this.props.swapForm("login")}>Have an account? Log in!</p>
            </div>
        );
    }
}

export default SignupForm;