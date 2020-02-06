import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//SOCKET.IO
import io from 'socket.io-client';

//ACTIONS
import {logout} from '../../actions/auth';
import {getNotifications} from '../../actions/notifications';

//IMAGES
import bell from '../../img/bell.svg';

class Nav extends Component {
    constructor(){
        super();
        this.state = {
            socket: null
        }
    }
    componentDidMount(){
        this.props.getNotifications();

        this.setState({
            ...this.state,
            socket: io(`http://localhost:8000/ws-notifications?user=${this.props.user._id}`)
        });
       
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.socket && !prevState.socket){  
            //listens for new notifications
            this.state.socket.on("new-notification", ()=>{
                this.props.getNotifications();
            });
        }
    }
    componentWillUnmount(){
        this.state.socket.disconnect()
    }
    render(){
        console.log(this);
        return (
            <nav className="top-bar">
                {localStorage.getItem("isLoggedIn") &&
                    <ul className="top-bar-left menu">
                        <li><Link to="/" className="logo">_Code Companions</Link></li>
                        <li><Link to="/dash/my-projects">My Projects</Link></li>
                        <li><Link to="/dash/projects">Find Projects</Link></li>
                        <li className="dropdown-parent">
                            <Link to="/blog">Blog</Link>
                            <ul className="menu dropdown">
                                <Link to="/blog/admin">Admin</Link>
                            </ul>
                        </li>
                    </ul>
                }
                {!localStorage.getItem("isLoggedIn") &&
                    <ul className="top-bar-left menu">
                        <li><Link to="/" className="logo">_Code Companions</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                }
                <ul className="top-bar-right menu">
                    <li className="dropdown-parent notifications">
                        <img width="25" height="25" src={bell}/>
                        {this.props.notifications.filter(notification=> notification.status === 0).length > 0 &&
                            <div className="new-notifications"></div>
                        }
                        <ul className="menu dropdown">
                            {this.props.notifications.length < 1 &&
                                <div className="notification">
                                    No new notifications.
                                </div>
                            }
                            {this.props.notifications.map(notification=>{
                                if(notification.status !== 0)
                                    return;
                                return (
                                    <div className="notification">
                                        {notification.project.owner.username}&nbsp; 
                                        Invited You To A Project
                                        <div className="actions">
                                            <a className="details" href={"#/dash/project-invitation/"+notification._id}>See Details</a>
                                            <button className="mark-as-read">Mark As Read</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    </li>
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
        user: state.auth.user,
        notifications: state.notifications.notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        getNotifications: () => dispatch(getNotifications())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);