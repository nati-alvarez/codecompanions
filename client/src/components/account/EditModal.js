//TODO: fix this god awful mess


import React, {Component} from 'react';

class EditModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            username: null,
            email: null,
            profilePicture: null,
            skills: this.props.user.skills,
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
    updateInput(e, prop, value){
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
                this.props.getSkillsList(value);
                if(e.key === "Enter"){
                    return this.addSkill(value);
                }
                return;
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
    addSkill(skill){
        this.setState({...this.state, skills: this.state.skills.concat(skill)},
        ()=>{
            this.props.updateUser(this.props.user.username, this.state);
            document.getElementById("skill-input").value = null;
            this.props.getSkillsList(null);
        });
    }
    removeSkill(skillToRemove){
        this.setState({...this.state, skills: this.state.skills.filter(skill=>{
            return skill !== skillToRemove;
        })}, ()=> {
            this.props.updateUser(this.props.user.username, this.state)
        });
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
                            <input onChange={e=>this.updateInput(e, "githubuser", e.target.value)} type="text" defaultValue={this.props.user.github && this.props.user.github.username}/>
                        </div>
                    }
                    {this.props.propToEdit === "githubpage" &&
                        <div>
                            <h4>Github Account Url</h4>
                            <input onChange={e=>this.updateInput(e, "githubpage", e.target.value)} type="text" defaultValue={this.props.user.github && this.props.user.github.accountPage}/>
                        </div>
                    }
                    {this.props.propToEdit === "name" &&
                        <div>
                            <h4>Name</h4>
                            <input onChange={e=>this.updateInput(e, "name", e.target.value)} type="text" defaultValue={this.props.user.name}/>
                            <h4>Username</h4>
                            <input onChange={e=>this.updateInput(e, "username", e.target.value)} type="text" defaultValue={this.props.user.username}/>
                        </div>
                    }{ typeof this.props.user[this.props.propToEdit] == "object" &&
                        <div>
                            <h4>{this.props.propToEdit}</h4>
                            <div className="skill-tags">
                                {this.props.user.skills.map(skill=>{
                                    return (
                                        <span onClick={e=> this.removeSkill(skill)} className="skill-tag">
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className="input">
                                <input id="skill-input" onBlur={e=>this.updateInput(e, this.props.propToEdit, null)} onKeyPress={e=>this.updateInput(e, this.props.propToEdit, e.target.value)} type="text" />
                                {this.props.skills[0] &&
                                    <div className="suggesstions">
                                        {this.props.skills &&

                                            this.props.skills.map(skill=>{
                                                return <p onClick={e=>this.addSkill(skill.keyName)}>{skill.keyName}</p>
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {this.props.propToEdit === "bio" &&
                        <div>
                            <h4>{this.props.propToEdit}</h4>
                            <textarea onChange={e=>this.updateInput(e, "bio", e.target.value)} defaultValue={this.props.user[this.props.propToEdit]}></textarea>
                        </div>
                    }{this.props.propToEdit !== "bio" && this.props.propToEdit !== "skills" && this.props.propToEdit !== "name" && this.props.propToEdit !== "githubpage" && this.props.propToEdit !== "githubuser" &&
                        <div>
                            <h4>{this.props.propToEdit}</h4>
                            <input onChange={e=>this.updateInput(e, this.props.propToEdit, e.target.value)} type="text" defaultValue={this.props.user[this.props.propToEdit]}/>
                        </div>
                    }
                    <button onClick={this.submit} className="button btn-primary-bold">Save Changes</button>
                </div>
            </div>
        )
    }
}

export default EditModal;