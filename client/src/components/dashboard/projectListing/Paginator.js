/***************************************************
 * TODO
 * find a better place to put this component, may use it in multiple places
 ***************************************************/

import React, {Component} from 'react';

class Paginator extends Component {
    render(){
        /***************************************************************
         *  TODO:
         *  fix shitty pagination logic
         ***************************************************************/

        //array of page numbers for pagination of applications
        var itemsPerPage = 5;
        var pagesInArray = 0;
        var pages = [];
        
        //will show buttons for the next five pages of applications
        while(pagesInArray < 5){
            //if the number of pages needed for pagination is less than 5, or there
            //are less than four pages that come after the page the user is currently on
            //start from last page and add the previous 4 pages
            if((this.props.project.applications.length / itemsPerPage) - this.props.page < 4){
                //exludes negative values and 0 if the number of pages needed is less than 5
                if(Math.ceil(this.props.project.applications.length / itemsPerPage - pagesInArray) <= 0){
                    pagesInArray++;
                    continue;
                }
                pages.push(Math.ceil(this.props.project.applications.length / itemsPerPage - pagesInArray));
                pages.sort();
                ++pagesInArray;
                continue;
            }
            //add pages to array starting from the page the user is currently on
            pages.push(this.props.page + pagesInArray);
            ++pagesInArray;
        }
        
        return (    
            this.props.project.applications.length > itemsPerPage &&
            <div className="pagination-buttons">
                {this.props.page > 1 &&
                    <button onClick={()=>this.props.changePage(this.props.page - 1)} className="button btn-transparent">Prev Page</button>
                }
                {pages.map((page, index) => {
                    if(index > 5) return;
                    return <span onClick={()=>this.props.changePage(page)}className={page === this.props.page? "btn-primary-bold page-button": "page-button"}>{page}</span>  
                })}
                {!(itemsPerPage * this.props.page >= this.props.project.applications.length) &&
                    <button onClick={()=>this.props.changePage(this.props.page + 1)}className="button btn-transparent">Next Page</button>
                }
            </div>
        )
    }
}

export default Paginator;
