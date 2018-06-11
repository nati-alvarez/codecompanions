import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {createProject, clearFormStatus, createProjectErr} from '../../../actions/projects';
import {getSkillsList} from '../../../actions/keywords';

//COMPONENTS
import Loader from '../../animations/Loader';

//STYLES
import '../../../styles/pages/newproject.sass';

class NewProject extends Component {
    constructor(){
        super();
        this.state = {
            input: {
                projectTitle: null,
                projectDescription: null,
                projectLogo: null,
                githubRepo: null,
                public: 1,
                projectListingTitle: null,
                projectListingDescription: null,
                skills: []
            }
        }
        this.updateInput = this.updateInput.bind(this);
        this.submit = this.submit.bind(this);
    }
    updateInput(e, field){
        switch(field){
            case "projectTitle":
                return this.setState({input: {...this.state.input, projectTitle: e.target.value}});
            case "projectDescription":
                return this.setState({input: {...this.state.input, projectDescription: e.target.value}});
            case "projectLogo":
                return this.setState({input: {...this.state.input, projectLogo: e.target.value}})
            case "githubRepo":
                return this.setState({input: {...this.state.input, githubRepo: e.target.value}});
            case "public":
                return this.setState({input: {...this.state.input, public: e.target.value}});
            case "projectListingTitle":
                return this.setState({input: {...this.state.input, projectListingTitle: e.target.value}});
            case "projectListingDescription":
                return this.setState({input: {...this.state.input, projectListingDescription: e.target.value}});
            case "skills":
                this.props.getSkillsList(e.target.value);
                console.log(e);
                if(e.key === "Enter"){
                    console.log("you hit the enter key")
                    return this.addSkill(e.target.value);
                }
                return;
        }
    }
    addSkill(skill){
        //do not add if already in skills array
        if(this.state.input.skills.indexOf(skill) >= 0) {
            document.getElementById('skill-input').value = null;
            this.props.getSkillsList(null);
            return;
        };

        this.setState({
            ...this.state,
            input: {
                ...this.state.input,
                 skills: this.state.input.skills.concat(skill)
            }
        }, ()=>{
            document.getElementById('skill-input').value = null;
            this.props.getSkillsList(null);
        });
    }
    removeSkill(skillToRemove){
        this.setState({
            ...this.state,
            input: {
                ...this.state.input,
                skills: this.state.input.skills.filter(skill=>{ return skill !== skillToRemove })
            }
        });
    }
    submit(e){
        e.target.disabled = true;
        for (let prop in this.state.input){
            if (!this.state.input[prop] && (prop !== 'githubRepo' && prop !== 'projectLogo' && prop !== 'skills')){
                return this.props.createProjectErr("Fill out all requried fields");
            }
        }
        this.props.createProject(this.state.input);
    }
    componentWillUnmount(){
        this.props.clearFormStatus()
    }
    render(){
        return (
            <section className="new-project-page">
                <h3>Create a New Project</h3>
                <div className="new-project-form">
                    <div className="form-field">
                        <label> <span className="required">*</span>Project Name:
                            <input onChange={e => this.updateInput(e, 'projectTitle')} type="text"/>
                        </label>
                        <small className="help-text">The name of the product, project, website, game or whatever
                        it is your working on.</small>
                    </div>
                    <div className="form-field">
                        <label> <span className="required">*</span>Project Description:
                            <textarea onChange={e => this.updateInput(e, 'projectDescription')}></textarea>
                        </label>
                        <small className="help-text">This is a brief description of what you project is.
                        this will be displayed in the project workspace and from your My Projects page.</small>
                    </div>
                    <div className="form-field">
                        <label> Project Logo:
                            <input onChange={e => this.updateInput(e, 'projectLogo')} type="text"/>
                        </label>
                    </div>
                    <div className="form-field">
                        <label> Github Repo Name:
                            <input onChange={e => this.updateInput(e, 'githubRepo')} type="text"/>
                            <small className="help-text">The name of the repository, not the repository link</small>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            <small className="required">*</small>Public?:
                            <fieldset onClick={ e => this.updateInput(e, 'public')}>
                                <input name="public" id="public-yes" type="radio" defaultChecked value="1"/><label htmlFor="public-yes">Yes</label>
                                <input name="public" id="public-no" type="radio" value="0"/><label htmlFor="public-no">No</label>
                            </fieldset>
                            <small className="help-text">Choosing yes will make a public a project listing that people
                            can view and apply to. Selecting no means you have to manually invite users to your project.</small>
                        </label>
                    </div>
                    <div className="form-field">
                        <label><small className="required">*</small>Project Listing Title:
                            <input onChange={e => this.updateInput(e, 'projectListingTitle')} type="text"/>
                        </label>
                        <small className="help-text">This is the title that people will see when
                        searching for projects to join.</small>
                    </div>
                    <div className="form-field">
                        <label> <small className="required">*</small>Project Listing Description:
                            <textarea onChange={e => this.updateInput(e, 'projectListingDescription')}></textarea>
                        </label>
                        <small className="help-text">Here is where you should list all the specifics
                        for your project and what kind of people you are looking for to work on your project.
                        Be very thorough and specific.</small>
                    </div>
                    <div className="form-field">
                        <label>Skills Required:
                                <div className="skill-tags">
                                    {!this.state.input.skills[0] &&
                                        <em>No skills added</em>
                                    }
                                    {this.state.input.skills.map(skill=>{
                                        return <span onClick={e=>this.removeSkill(skill)} className="skill-tag">{skill}</span>
                                    })}
                                </div>
                                <div className="grid-x align-middle-center grid-margin-x">
                                    <div className="small-5 cell input">
                                        <input id="skill-input" onFocus={e => this.props.getSkillsList(e.target.value)} onBlur={e => this.props.getSkillsList(null)} onKeyPress={e => this.updateInput(e, 'skills')} onChange={e => this.updateInput(e, 'skills')} type="text"/>
                                        {this.props.skills[0] &&
                                            <div className="suggestions">
                                                {this.props.skills.map(skill=>{
                                                    return <p onClick={e=> this.addSkill(skill.keyName)}>{skill.keyName}</p>;
                                                })}
                                            </div>
                                        }
                                    </div>
                                    <button onClick={e=> this.addSkill(document.getElementById('skill-input').value)} className="button btn-primary-bold add-skill-btn">+ Add Skill</button>
                                </div>
                        </label>
                    </div>
                    <div className="form-status">
                        {this.props.processStatus.errorMessage &&
                            <div className="error-message">
                                <span className="exception">throw UserInputError </span>
                                {this.props.processStatus.errorMessage}
                            </div>
                        }
                        {this.props.processStatus.successMessage &&
                            <div className="success-message">
                                {this.props.processStatus.successMessage}
                            </div>
                        }
                    </div>
                    <button id="submit-button"  onClick={this.submit} className="button btn-primary-bold">
                        {this.props.processStatus.loading &&
                            <Loader/>
                        }{!this.props.processStatus.loading &&
                            "Create Project"
                        }
                    </button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        processStatus: state.processStatus,
        skills: state.keywords.skills
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (body) => dispatch(createProject(body)),
        createProjectErr: (errMessage) => dispatch(createProjectErr(errMessage)),
        clearFormStatus: () => dispatch(clearFormStatus()),
        getSkillsList: (keyword) => dispatch(getSkillsList(keyword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
