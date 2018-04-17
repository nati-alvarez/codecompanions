import React, {Component} from 'react';

//ACTIONS
import {searchProjectListings} from '../../../actions/projectListings';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            title: null
        };
        this.search = this.search.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }
    updateInput(e){
        this.setState({...this.state, title: e.target.value});
        
        //if searchbar is empty show reccommened projects
        if(!e.target.value){
            this.props.getRecommendations(true);
        }
    }
    search(){
        this.props.search(this.state);
        document.getElementById('search-input').value = null;
    }
    render(){
        return (
            <div>
                <h5>Search For Projects</h5>
                <form onSubmit={e=>e.preventDefault()} className="project-searchbar grid-x align-middle">
                    <input id="search-input" onChange={this.updateInput}/>
                    <button onClick={this.search} className="button">Search</button>
                </form>
            </div>
        );
    }
}

export default Search;