import React, {Component} from 'react';

//COMPONENTS
import Nav from '../Nav';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

//STYLES
import '../../styles/pages/homepage.sass'

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            form: "login"
        }
        this.swapForm = this.swapForm.bind(this);
    }
    swapForm(form){
        this.setState({form});
    }
    render(){
        var Form = (this.state.form === "login")? LoginForm: SignupForm;
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
                    <form onSubmit={(e) => e.preventDefault()}>
                        {<Form swapForm={this.swapForm}/>}
                    </form>
                </header>
            </div>
        );
    }
}

export default HomePage;