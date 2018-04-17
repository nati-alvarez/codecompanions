import React, {Component} from 'react';

class Sidebar extends Component {
    render(){
        return (
            <aside className="cell medium-2 workspace-nav">
                <nav className="vertical menu">
                    <li>Home</li>
                    <li>Chat</li>
                    <li>Tasks</li>
                    <li>Git</li>
                </nav>
            </aside>
        )
    }
}

export default Sidebar;