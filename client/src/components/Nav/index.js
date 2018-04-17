import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//ACTIONS
import {logout} from '../../actions/auth';

class Nav extends Component {
    render(){
        return (
            <nav className="top-bar">
                {localStorage.getItem("isLoggedIn") &&
                    <ul className="top-bar-left menu">
                        <Link to="/" className="logo">_Code Companions</Link>
                        <Link to="/dash/my-projects">My Projects</Link>
                        <Link to="/dash/projects">Find Projects</Link>
                    </ul>
                }
                {!localStorage.getItem("isLoggedIn") &&
                    <ul className="top-bar-left menu">
                        <Link to="/" className="logo">_Code Companions</Link>
                    </ul>
                }
                <ul className="top-bar-right menu">
                    {localStorage.getItem("isLoggedIn") &&
                        <li className="dropdown-parent">
                            <img className="profile-pic" width="35" height="35" src={this.props.user.profilePicture}/>
                            {this.props.user.username}
                            <ul className="menu dropdown">
                                <Link to='/dash/account'>My Account</Link>
                                <a onClick={this.props.logout}>Logout</a>
                            </ul>
                        </li>
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

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);