import React, {Component} from 'react';

class Commit extends Component {
    render(){
        var commit = this.props.commit.commit;
        var commitDate = new Date(this.props.commit.commit.author.date);
        var commitDateTime = commitDate.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"});
        return (
            <div className="commit">
                <p className="commit-author">
                    {/* tries to replace github name with codecompanions username
                    if github account email and codecompanions email match, else just display
                    github name */}
                    {this.props.project.members.map((member, index)=>{
                        if(member.email == commit.author.email)
                            return member.username
                        if(index >= this.props.project.members.length -1)
                            return commit.author.name
                    })}
                </p>
                <small className="help-text">{commitDate.toLocaleDateString()} {commitDateTime}</small>
                <p>{commit.message}</p>
                <a href={`https://github.com/${this.props.gitUser}/${this.props.gitRepo}/commit/${commit.url.substr(-40, 40)}`}>View on Github</a>
            </div>
        )
    }
}

export default Commit;