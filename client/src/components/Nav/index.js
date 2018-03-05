import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render(){
        return (
            <nav className="top-bar">
                <ul className="top-bar-left menu">
                    <Link to="/" className="logo">_CODE COMPANIONS</Link>
                </ul>
                <ul className="top-bar-right menu">
                    {this.props.user &&
                        <li>{this.props.user.username}</li>
                    }
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Nav);