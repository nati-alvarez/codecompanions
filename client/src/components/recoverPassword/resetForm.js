import React, {Component} from 'react';
import {connect} from 'react-redux';
import qs from 'query-string';  //to extract query values from url

//ACTIONS
import {resetPassword, swapForm, formError} from '../../actions/auth';

//COMPONENTS
import Loader from '../animations/Loader';

//STYLES
import '../../styles/pages/resetpassword.sass';

class ResetForm extends Component {
    constructor(){
        super();
        this.state = {
            input: {
                password: null,
                confirm: null
            }
        }
        this.submit = this.submit.bind(this);
    }
    submit(e){
        e.target.disabled = true;
        for (let prop in this.state.input){
            if(!this.state.input[prop]) return this.props.formError("All fields are requried.");
            if(/\s/g.test(this.state.input[prop])) return this.props.formError("Passwords cannot contain whitespace.");
        }
        if(this.state.input.password !== this.state.input.confirm) return this.props.formError("Passwords do not match.");
        
        let body = {}
        body.password = this.state.input.password;
        body.id = qs.parse(this.props.location.search).id;
        this.props.resetPassword(body);
    }
    componentWillUnmount(){
        this.props.swapForm();
    }
    render(){
        return (
            <div className="reset-password-page">
                <form onSubmit={e=> e.preventDefault()}>
                    <div className="grid-container">
                        <div className="grid-x grid-padding-x">
                            <h4>Reset Your Password</h4>
                            <div className="cell">
                                <label>New Password:
                                    <input onChange={e => this.setState({...this.state, input: {...this.state.input, password: e.target.value}})} type="password"/>
                                </label>
                            </div>
                            <div className="cell">
                                <label>Confirm New Password:
                                    <input onChange={e => this.setState({...this.state, input: {...this.state.input, confirm: e.target.value}})} type="password"/>
                                </label>
                            </div>
                            <div className="cell">
                                <div className="form-status">
                                    {this.props.formStatus.errorMessage &&
                                        <div className="error-message">
                                            <span className="exception">throw UserInputError </span>
                                            {this.props.formStatus.errorMessage}
                                        </div>
                                    }
                                    {this.props.formStatus.successMessage &&
                                        <div className="success-message">
                                            {this.props.formStatus.successMessage}
                                        </div>
                                    }
                                </div>

                                <button onClick={e => this.submit(e)} id="submit-button" className="button btn-primary-bold">
                                    {!this.props.formStatus.loading &&
                                        "Reset Password"
                                    }{this.props.formStatus.loading &&
                                        <Loader/>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
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
        swapForm: () => dispatch(swapForm()),
        formError: (message) => dispatch(formError(message)),
        resetPassword: (body) => dispatch(resetPassword(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetForm);