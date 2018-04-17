import React, {Component} from 'react';

//COMPONENTS
import Loader from '../../animations/Loader';

class ApplicationForm extends Component {
    constructor(){
        super();
        this.state = {
            message: null
        };
        this.submit = this.submit.bind(this);
    }
    submit(e){
        e.target.disabled = true;
        this.props.apply(this.props.listingId, this.state.message);

        //clear success message after submit
        this.props.clearSuccessMessage();
    }
    componentDidUpdate(){
        if(this.props.loading === false)
            document.getElementById('submit-button').disabled = false;
        if(this.props.loading === false && (this.props.successMessage || this.props.errorMessage))
            this.props.close();
    }
    render(){
        return (
            <div className="application-form grid-x align-center-middle">
                <form>
                    <div onClick={this.props.close} className="close">X</div>
                    <textarea onChange={(e) => this.setState({message: e.target.value})} rows="6"></textarea>
                    <p className="help-text">Write a brief summary of why you want to work on this project or
                    how you could help out with this project.</p>
                    <button id="submit-button" onClick={this.submit} className="button btn-primary-bold">
                        {!this.props.loading &&
                            "Submit"
                        }{this.props.loading &&
                            <Loader/>
                        }
                    </button>
                </form>
            </div>
        );
    }
}

export default ApplicationForm;