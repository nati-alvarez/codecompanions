import React, {Component} from 'react';

//STYLES

export default class Loader extends Component {
    render(){
        return(
            // stop propagation to prevent events running on disabled buttons
            <div onClick={(e) => e.stopPropagation()} className="loader"></div>
        );
    }
}