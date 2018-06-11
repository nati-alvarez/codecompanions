import React, {Component} from 'react';

class UsersList extends Component {
    constructor(){
        super();
    }
    render(){
        console.log(this.props.usersSearchResults);
        if(!this.props.usersSearchResults)
            return null;
        if(this.props.usersSearchResults && !this.props.usersSearchResults[0])
            return null;
        return (
            <div className="user-suggestions">
                {this.props.usersSearchResults.map(user=>{
                    return (
                        <div onClick={()=>this.props.setUser(user.username)}className="suggestion">
                            <img width="35" height="35" className="profile-picture" src={user.profilePicture}/>   {user.username}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default UsersList;