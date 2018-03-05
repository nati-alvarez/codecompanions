import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {verifyAccount} from '../../actions/auth';

//COMPONENTS
import Loader from '../animations/Loader';

class VerifyAccount extends Component {
    componentDidMount(){
        this.props.verifyAccount({verificationCode: this.props.match.params.verificationCode});
    }
    componentDidUpdate(){
        if(this.props.verificationStatus.successMessage){
            setTimeout(()=>{
                this.props.history.push("/");
            }, 3000);
        }
    }
    render(){
        return (
            <div className="grid-container">
                <div className="grid-y grid-frame align-center-middle">
                    <div className="grid-y align-center-middle">
                        <Loader/>
                        {this.props.verificationStatus.loading &&
                            <p>Verifying your account please wait...</p>
                        }
                        {!this.props.verificationStatus.loading && this.props.verificationStatus.successMessage &&
                            <p>{this.props.verificationStatus.successMessage} Redirecting...</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        verificationStatus: state.auth.form
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyAccount: (body) => dispatch(verifyAccount(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);