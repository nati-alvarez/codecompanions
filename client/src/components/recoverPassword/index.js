import React, {Component} from 'react';
import {connect} from 'react-redux';


//COMPONENTS
import Nav from '../Nav';
import Loader from '../animations/Loader';

//STYLES
import '../../styles/pages/recoveraccount.sass';

//ACTIONS
import {sendRecoverPasswordEmail, swapForm, formError} from '../../actions/auth';

class RecoverPassword extends Component {
    constructor(){
        super();
        this.state = {
            input: {
                email: null
            }
        }
        this.submit = this.submit.bind(this);
    }
    componentWillUnmount(){
        this.props.swapForm()
    }
    submit(e){
        e.target.disabled = true;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.state.input.email || !emailRegex.test(this.state.input.email)) return this.props.formError("Enter a valid email address.")
        this.props.sendRecoverPasswordEmail(this.state.input);
    }
    render(){
        return (
            <div className="recover-account-page">
                <Nav/>
                <main>
                    <form onSubmit={e=> e.preventDefault()}>
                        <h4>Recover your password</h4>
                        <div className="grid-container">
                            <div className="grid-x grid-padding-x">
                                <div className="cell">
                                    <label>Email:
                                        <input onChange={e => this.setState({...this.state, input: {...this.state.input, email: e.target.value}})} type="text"/>
                                    </label>
                                    <p className="help-text">Enter your email address so we can
                                    contact you with further instructions on how to recover your account.
                                    </p>
                                </div>
                                <div className="form-status cell">
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
                                <div className="cell">
                                    <button id="submit-button" onClick={e => this.submit(e)}className="button btn-primary-bold">
                                        {this.props.formStatus.loading &&
                                            <Loader/>
                                        }
                                        {!this.props.formStatus.loading &&
                                            "Send Email"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        formStatus: state.auth.form
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendRecoverPasswordEmail: (body) => dispatch(sendRecoverPasswordEmail(body)),
        swapForm: () => dispatch(swapForm()),
        formError: (message) => dispatch(formError(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);