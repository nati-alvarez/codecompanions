import React, {Component} from 'react';

class EditModal extends Component {
    constructor(){
        super();
        this.state = {
            name: null,
            username: null,
            email: null,
            profilePicture: null,
            skills: null,
            title: null,
            bio: null,
            portfolio: null,
            github: {
                username: null,
                accountPage: null
            }
        }
        this.submit = this.submit.bind(this);
    }
    updateInput(prop, value){
        switch(prop){
            case "username":
                return this.setState({...this.state, username: value});
            case "name":
                return this.setState({...this.state, name: value});
            case "email":
                return this.setState({...this.state, email: value});
            case "title":
                return this.setState({...this.state, title: value});
            case "profilePicture":
                return this.setState({...this.state, profilePicture: value})
            case "skills":
                return this.setState({...this.state, skills: value.split("|")});
            case "bio":
                return this.setState({...this.state, bio: value});
            case "githubpage":
                return this.setState({...this.state, github: {...this.state.github, accountPage: value}});
            case "githubuser":
                return this.setState({...this.state, github: {...this.state.github, username: value}});
            case "portfolio":
                return this.setState({...this.state, portfolio: value});
        }
    }
    submit(){
        this.props.updateUser(this.props.user.username, this.state)
        this.props.closeEditModal();
    }
    render(){
        return (
            <div className="edit-modal-background grid-x align-center-middle">
                <div className="edit-modal">
                    <div onClick={this.props.closeEditModal} className="close">X</div>
                    {this.props.propToEdit === "githubuser" &&
                        <div>
                            <h4>Github Username</h4>
                            <input onChange={e=>this.updateInput("githubuser", e.target.value)} type="text" defaultValue={this.props.user.github && this.props.user.github.username}/>
                        </div>
                    }
                    {this.props.propToEdit === "githubpage" &&
                        <div>
                            <h4>Github Account Url</h4>
                            <input onChange={e=>this.updateInput("githubpage", e.target.value)} type="text" defaultValue={this.props.user.github && this.props.user.github.accountPage}/>
                        </div>
                    }
                    {this.props.propToEdit === "name" &&
                        <div>
                            <h4>Name</h4>
                            <input onChange={e=>this.updateInput("name", e.target.value)} type="text" defaultValue={this.props.user.name}/>
                            <h4>Username</h4>
                            <input onChange={e=>this.updateInput("username", e.target.value)} type="text" defaultValue={this.props.user.username}/>
                        </div>
                    }{ typeof this.props.user[this.props.propToEdit] == "object" &&
                        <div>
                            <h4>{this.props.propToEdit}</h4>
                            <input onChange={e=>this.updateInput(this.props.propToEdit, e.target.value)} type="text" defaultValue={this.props.user[this.props.propToEdit].join("|")}/>
                        </div>
                    }
                    {this.props.propToEdit === "bio" &&
                        <div>
                            <h4>{this.props.propToEdit}</h4>
                            <textarea onChange={e=>this.updateInput("bio", e.target.value)} defaultValue={this.props.user[this.props.propToEdit]}></textarea>
                        </div>
                    }{this.props.propToEdit !== "bio" && this.props.propToEdit !== "skills" && this.props.propToEdit !== "name" && this.props.propToEdit !== "githubpage" && this.props.propToEdit !== "githubuser" &&
                        <div>
                            <h4>{this.props.propToEdit}</h4>
                            <input onChange={e=>this.updateInput(this.props.propToEdit, e.target.value)} type="text" defaultValue={this.props.user[this.props.propToEdit]}/>
                        </div>
                    }
                    <button onClick={this.submit} className="button btn-primary-bold">Save Changes</button>
                </div>
            </div>
        )
    }
}

export default EditModal;