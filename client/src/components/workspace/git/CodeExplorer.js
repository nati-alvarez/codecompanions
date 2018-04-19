import React, {Component} from 'react';
import axios from 'axios';

//FONT-AWESOME
import FontAwesome from '@fortawesome/react-fontawesome';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';
import faFolder from '@fortawesome/fontawesome-free-solid/faFolder';

//CODE HIGHLIGHTING
import Code from 'react-highlight';

// import "react-syntax-highlight/lib/style.css";
import "highlight.js/styles/xcode.css";

class CodeExplorer extends Component {
    constructor(){
        super();
        this.state = {
            currentPath: [""],
            pathType: "dir", //dir or file,
            pathContent: null //if current path is file, populate with file content for viewing
        }
        this.changePath = this.changePath.bind(this);
        this.getFileContent = this.getFileContent.bind(this);
    }
    navigateBreadcrumbs(index){
        if(index + 1 < this.state.currentPath.length){
            var diff = this.state.currentPath.length - (index + 1); //difference in length between bread crumb level and path array length
            var maxLength = this.state.currentPath.length - diff; //the length the array should be at after going back n number of dir levels
            this.setState(
                {
                    ...this.state, 
                    currentPath: this.state.currentPath.filter((path, index)=>{
                        return index < maxLength;
                    }),
                    pathType: "dir", //if traversing back in the dir stucture, you should be going back into a folder
                    pathContent: null //important to clear content here, dir structure won't show otherwise (see render method)
                }, () =>{
                    this.props.updateRepoContent(this.props.project.owner.github.username, this.props.project.repo, this.state.currentPath.join("/"))
                }
            )
        }   
    }
    changePath(path){
        var newState = {
            ...this.state,
            currentPath: this.state.currentPath.concat(path.name)
        }
        if(path.type === "file"){
            newState.pathType = "file";
        }else {
            newState.pathType = "dir"
        }
        this.setState(newState, ()=>{
            this.props.updateRepoContent(this.props.project.owner.github.username, this.props.project.repo, this.state.currentPath.join("/"))
        });
    }
    componentDidUpdate(){
        //checks if pathContent is null bc not doing so would result in infinite loop
        //path content would be updated then this method would run then content would be updated and so on
        if(this.state.pathType === "file" && this.state.pathContent === null && this.props.contents.length === 1){
            this.getFileContent(this.props.contents[0].download_url);
        }
    }
    getFileContent(url){
        axios.get(url, {responseType: "text", transformResponse: undefined}).then(res=>{
            this.setState({pathContent: res.data})
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        return (
            <div className="code-explorer scrollbar">
                <ul className="breadcrumbs">
                    {this.state.currentPath.map((path, index)=>{
                        if(path === "") return <li onClick={()=>this.navigateBreadcrumbs(index)}><a>/</a></li>
                        return <li onClick={()=>this.navigateBreadcrumbs(index)}><a>{path}</a></li>
                    })}
                </ul>
                {!this.state.pathContent && this.props.contents.map(contents=>{
                    return (
                        <div className="path">
                            <FontAwesome icon={(contents.type === "dir")? faFolder: faFile}/>
                            {contents.type === "dir" &&
                                <a className="path-name dir" onClick={()=>this.changePath(contents)}>
                                    {contents.path}
                                </a>
                            }{contents.type === "file" &&
                                <a className="path-name file" onClick={()=>this.changePath(contents)}>
                                    {contents.path}
                                </a> 
                            }
                        </div>
                    )
                })}
                {this.state.pathContent &&
                    <Code language="javascript">
                        {this.state.pathContent}
                    </Code>
                }
            </div>
        )
    }
}

export default CodeExplorer;