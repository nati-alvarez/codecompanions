import React, {Component} from 'react';

//FONT AWESOME ICONS
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'

class EditBtn extends Component {
    render(){
        return (
            <button onClick={() => this.props.showEditModal(this.props.propToEdit)} className="button btn-primary-bold edit-btn">
                <FontAwesomeIcon icon={faPencilAlt}/>
            </button>
        );
    }
}

export default EditBtn;