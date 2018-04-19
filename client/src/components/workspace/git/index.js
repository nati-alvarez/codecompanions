import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {getRepoInfo, updateRepoContent} from '../../../actions/projects';

//STYLES
import '../../../styles/pages/workspacegit.sass';

//COMPONENTS
import Commit from './Commit';
import CodeExplorer from './CodeExplorer';

//Documentation for github api: https://developer.github.com/v3
//api is used to retrieve info about project repo (commit history, code, links, error reports, etc...)

class Git extends Component {
    componentDidMount(){
        if(!this.props.project.repo || !this.props.project.owner.github) return;
        this.props.getRepoInfo(this.props.project.owner.github.username, this.props.project.repo)
    }
    render(){
        console.log(this.props.gitRepo)
        if(!this.props.project.repo || !this.props.project.owner.github)
            return <div className="workspace-git content">No repository added to project</div>
        return (
            <div className="workspace-git content">
                <div className="repo-commits grid-x grid-padding-x">
                    <div className="repo-info cell medium-6 small-12">
                        <h3>Repository Info</h3>
                        <p>{this.props.gitRepo && this.props.gitRepo.description}</p>
                        <div className="link">
                            <strong>HTML Link:</strong><br/> <a href={this.props.gitRepo && this.props.gitRepo.html_url}>
                                {this.props.gitRepo && this.props.gitRepo.html_url}
                            </a>
                        </div>
                        <div className="link">
                            <strong>Git Link:</strong><br/> <a href={this.props.gitRepo && this.props.gitRepo.git_url}>
                                {this.props.gitRepo && this.props.gitRepo.git_url}
                            </a>
                        </div>
                        <div className="link">
                            <strong>SSH Link:</strong><br/><a href={this.props.gitRepo && this.props.gitRepo.ssh_url}>
                                {this.props.gitRepo && this.props.gitRepo.ssh_url}
                            </a>
                        </div>
                    </div>
                    <div className="commit-history cell medium-6 small-12 scrollbar">
                        <h3>Commit History</h3>
                        <div className="commits">
                            {this.props.gitCommits &&
                                this.props.gitCommits.map(commit=>{
                                    return <Commit gitUser={this.props.project.owner.github.username} gitRepo={this.props.project.repo} project={this.props.project} commit={commit}/>  
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="code">
                    <h3>Code Explorer</h3>
                    {this.props.gitContents &&
                        <CodeExplorer project={this.props.project} updateRepoContent={this.props.updateRepoContent} contents={this.props.gitContents}/>
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRepoInfo: (gitUser, gitRepo) => dispatch(getRepoInfo(gitUser, gitRepo)),
        updateRepoContent: (gitUser, gitRepo, path) => dispatch(updateRepoContent(gitUser, gitRepo, path))
    }
}

const mapStateToProps = (state) => {
    return {
        gitRepo: state.workspace.gitRepo,
        gitCommits: state.workspace.gitCommits,
        gitContents: state.workspace.gitContents
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Git);