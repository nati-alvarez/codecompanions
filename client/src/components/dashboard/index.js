import React, {Component} from 'react';
import {connect} from 'react-redux';

//COMPONENTS
import Nav from '../Nav';

//STYLES
import '../../styles/pages/dash.sass';

class Dash extends Component {
    componentDidMount(){
        if(!this.props.user) this.props.history.push("/");
    }
    componentDidUpdate(){
        if(!this.props.user) this.props.history.push("/");
    }
    render(){
        return (
            <div className="dashboard">
                <Nav/>
                <main>
                    This is the dashboard
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Dash);